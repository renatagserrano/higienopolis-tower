<?php
/* Funções compartilhadas por frete.php e checkout.php */
declare(strict_types=1);

const CFG_FILE = __DIR__ . '/config.php';
$CFG = require CFG_FILE;

function responde(array $dados, int $status = 200): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-Control: no-store');
  echo json_encode($dados, JSON_UNESCAPED_UNICODE);
  exit;
}

function erro(string $msg, int $status = 400): void { responde(['erro' => $msg], $status); }

function entrada(): array {
  if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') erro('Use POST.', 405);
  $raw = file_get_contents('php://input') ?: '';
  if (strlen($raw) > 50000) erro('Pedido grande demais.');
  $d = json_decode($raw, true);
  if (!is_array($d)) erro('Dados inválidos.');
  return $d;
}

function catalogo(): array {
  static $cat = null;
  if ($cat === null) {
    $cat = json_decode((string) file_get_contents(__DIR__ . '/../produtos.json'), true);
    if (!is_array($cat)) erro('Catálogo indisponível.', 500);
  }
  return $cat;
}

function so_digitos(string $s): string { return preg_replace('/\D+/', '', $s) ?? ''; }

/* Confere cada item do carrinho contra o catálogo. Preço SEMPRE vem do servidor. */
function itens_validos($itens): array {
  if (!is_array($itens) || !$itens) erro('Carrinho vazio.');
  if (count($itens) > 60) erro('Itens demais no carrinho.');
  $cat = catalogo();
  $porId = [];
  foreach ($cat['produtos'] as $p) $porId[$p['id']] = $p;
  $out = [];
  foreach ($itens as $i) {
    $id = (string) ($i['id'] ?? '');
    $op = (string) ($i['op'] ?? '');
    $qtd = (int) ($i['qtd'] ?? 0);
    if (!isset($porId[$id])) erro('Produto não encontrado: ' . $id);
    if ($qtd < 1 || $qtd > 1000) erro('Quantidade inválida.');
    $p = $porId[$id];
    $preco = $p['preco'] ?? null; $peso = $p['peso'] ?? null; $dim = $p['dim'] ?? null; $min = 0;
    if (!empty($p['opcoes'])) {
      $achou = false;
      foreach ($p['opcoes'] as $o) {
        $nome = is_array($o) ? $o['nome'] : $o;
        if ($nome !== $op) continue;
        $achou = true;
        if (is_array($o)) {
          if (array_key_exists('preco', $o)) $preco = $o['preco'];
          $peso = $o['peso'] ?? $peso; $dim = $o['dim'] ?? $dim; $min = (int) ($o['min'] ?? 0);
        }
      }
      if (!$achou) erro('Opção inválida para ' . $p['nome'] . '.');
    }
    if ($preco === null) erro($p['nome'] . ' é sob consulta: finalize pelo WhatsApp.');
    if ($min && $qtd < $min) erro('Mínimo de ' . $min . ' para ' . $p['nome'] . ' (' . $op . ').');
    if ($peso === null) {
      $pad = $cat['fretePadrao'][$p['categoria']] ?? null;
      if (!$pad) erro($p['nome'] . ' não tem envio pelo site: finalize pelo WhatsApp.');
      $peso = $pad['peso']; $dim = $pad['dim'];
    }
    $out[] = [
      'id' => $id, 'titulo' => $p['nome'] . ($op !== '' ? ' (' . $op . ')' : ''),
      'qtd' => $qtd, 'preco' => round((float) $preco, 2),
      'peso' => (float) $peso, 'dim' => array_map('floatval', $dim),
    ];
  }
  return $out;
}

function subtotal(array $itens): float {
  $s = 0.0; foreach ($itens as $i) $s += $i['preco'] * $i['qtd']; return round($s, 2);
}

function http_json(string $url, array $headers, ?array $corpo): array {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 20, CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_HTTPHEADER => array_merge(['Accept: application/json', 'Content-Type: application/json'], $headers),
  ]);
  if ($corpo !== null) { curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($corpo)); }
  $resp = curl_exec($ch);
  $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err = curl_error($ch);
  curl_close($ch);
  if ($resp === false) return ['_status' => 0, '_erro' => $err];
  $d = json_decode((string) $resp, true);
  return ['_status' => $code] + (is_array($d) ? $d : ['_bruto' => substr((string) $resp, 0, 300)]);
}

/* Cotação de frete no Melhor Envio. Retorna [{id, nome, empresa, preco, prazo}] */
function cotar_frete(string $cep, array $itens): array {
  global $CFG;
  $cep = so_digitos($cep);
  if (strlen($cep) !== 8) erro('CEP inválido.');
  if ($CFG['modo_teste']) {
    $kg = 0.0; foreach ($itens as $i) $kg += $i['peso'] * $i['qtd'];
    $base = 18 + 4.5 * $kg + (int) substr($cep, 0, 1) * 1.7;
    return [
      ['id' => 1, 'nome' => 'PAC', 'empresa' => 'Correios', 'preco' => round($base, 2), 'prazo' => 7, 'teste' => true],
      ['id' => 2, 'nome' => 'SEDEX', 'empresa' => 'Correios', 'preco' => round($base * 1.8, 2), 'prazo' => 3, 'teste' => true],
      ['id' => 3, 'nome' => '.Package', 'empresa' => 'Jadlog', 'preco' => round($base * 0.9, 2), 'prazo' => 6, 'teste' => true],
    ];
  }
  $me = $CFG['melhorenvio'];
  if ($me['token'] === '' || so_digitos($me['cep_origem']) === '') erro('Frete ainda não configurado. Finalize pelo WhatsApp.', 503);
  $base = $me['sandbox'] ? 'https://sandbox.melhorenvio.com.br' : 'https://melhorenvio.com.br';
  $produtos = [];
  foreach ($itens as $n => $i) {
    $produtos[] = [
      'id' => (string) $n, 'height' => max(1, $i['dim'][0]), 'width' => max(1, $i['dim'][1]), 'length' => max(1, $i['dim'][2]),
      'weight' => max(0.01, $i['peso']), 'insurance_value' => $i['preco'], 'quantity' => $i['qtd'],
    ];
  }
  $corpo = ['from' => ['postal_code' => so_digitos($me['cep_origem'])], 'to' => ['postal_code' => $cep],
            'products' => $produtos, 'options' => ['receipt' => false, 'own_hand' => false]];
  if ($me['servicos'] !== '') $corpo['services'] = $me['servicos'];
  $r = http_json($base . '/api/v2/me/shipment/calculate',
    ['Authorization: Bearer ' . $me['token'], 'User-Agent: Phenix Teccel (' . $me['contato'] . ')'], $corpo);
  if ($r['_status'] !== 200) erro('Não foi possível calcular o frete agora. Tente de novo ou finalize pelo WhatsApp.', 502);
  unset($r['_status']);
  $op = [];
  foreach ($r as $s) {
    if (!is_array($s) || !empty($s['error']) || !isset($s['id'])) continue;
    $preco = (float) ($s['custom_price'] ?? $s['price'] ?? 0);
    if ($preco <= 0) continue;
    $op[] = ['id' => (int) $s['id'], 'nome' => (string) $s['name'], 'empresa' => (string) ($s['company']['name'] ?? ''),
             'preco' => round($preco, 2), 'prazo' => (int) ($s['custom_delivery_time'] ?? $s['delivery_time'] ?? 0)];
  }
  usort($op, fn($a, $b) => $a['preco'] <=> $b['preco']);
  if (!$op) erro('Nenhuma transportadora atende esse CEP com esses itens. Finalize pelo WhatsApp.', 422);
  return $op;
}

function brl(float $v): string { return 'R$ ' . number_format($v, 2, ',', '.'); }

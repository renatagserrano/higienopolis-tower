<?php
/* POST {itens, entrega:'retirar'|'envio', servico, cliente:{nome,telefone,email,cep,rua,numero,complemento,bairro,cidade,uf}, obs}
   -> {url, ref}  (url = página de pagamento do Mercado Pago) */
require __DIR__ . '/lib.php';
$d = entrada();
$itens = itens_validos($d['itens'] ?? null);
$c = is_array($d['cliente'] ?? null) ? $d['cliente'] : [];
$txt = fn($k, $max = 120) => trim(mb_substr(strip_tags((string) ($c[$k] ?? '')), 0, $max));
$cli = [];
foreach (['nome', 'telefone', 'email', 'cep', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'uf'] as $k) $cli[$k] = $txt($k);
$obs = trim(mb_substr(strip_tags((string) ($d['obs'] ?? '')), 0, 600));
if ($cli['nome'] === '') erro('Informe seu nome.');
if (strlen(so_digitos($cli['telefone'])) < 10) erro('Informe um telefone com DDD.');
if ($cli['email'] !== '' && !filter_var($cli['email'], FILTER_VALIDATE_EMAIL)) erro('E-mail inválido.');

$entrega = ($d['entrega'] ?? '') === 'envio' ? 'envio' : 'retirar';
$frete = null;
if ($entrega === 'envio') {
  foreach (['cep', 'rua', 'numero', 'bairro', 'cidade', 'uf'] as $k) if ($cli[$k] === '') erro('Preencha o endereço de entrega completo.');
  $servico = (int) ($d['servico'] ?? 0);
  foreach (cotar_frete($cli['cep'], $itens) as $o) if ($o['id'] === $servico) $frete = $o;   // preço do frete refeito no servidor
  if (!$frete) erro('Escolha o frete de novo: a cotação mudou.', 409);
}

$ref = 'PHX-' . date('ymd-His') . '-' . strtoupper(bin2hex(random_bytes(2)));
$sub = subtotal($itens);
$total = round($sub + ($frete['preco'] ?? 0), 2);

/* E-mail do pedido para a loja (antes do pagamento: o status final aparece no Mercado Pago) */
$linhas = array_map(fn($i) => sprintf('%dx %s — %s', $i['qtd'], $i['titulo'], brl($i['preco'] * $i['qtd'])), $itens);
$corpo = "Novo pedido no site — {$ref}\n\n" . implode("\n", $linhas) . "\n\nProdutos: " . brl($sub)
  . ($frete ? "\nFrete: {$frete['empresa']} {$frete['nome']} ({$frete['prazo']} dias úteis) — " . brl($frete['preco']) : "\nEntrega: retirar na loja")
  . "\nTOTAL: " . brl($total)
  . "\n\nCliente: {$cli['nome']}\nTelefone: {$cli['telefone']}\nE-mail: {$cli['email']}"
  . ($entrega === 'envio' ? "\nEndereço: {$cli['rua']}, {$cli['numero']} {$cli['complemento']} — {$cli['bairro']} — {$cli['cidade']}/{$cli['uf']} — CEP {$cli['cep']}" : '')
  . ($obs !== '' ? "\nObs.: {$obs}" : '')
  . "\n\nConfira o pagamento no Mercado Pago (referência {$ref}) antes de separar o pedido.";

if ($CFG['modo_teste']) {
  @file_put_contents(__DIR__ . '/pedidos-teste.log', date('c') . "\n" . $corpo . "\n-----\n", FILE_APPEND);
  responde(['url' => $CFG['site_url'] . '/obrigado.html?status=teste&ref=' . $ref, 'ref' => $ref, 'teste' => true, 'total' => $total]);
}

$mp = $CFG['mercadopago'];
if ($mp['access_token'] === '') erro('Pagamento online ainda não configurado. Finalize pelo WhatsApp.', 503);
$mpItens = array_map(fn($i) => ['id' => $i['id'], 'title' => mb_substr($i['titulo'], 0, 250), 'quantity' => $i['qtd'],
  'unit_price' => $i['preco'], 'currency_id' => 'BRL'], $itens);
if ($frete) $mpItens[] = ['id' => 'frete', 'title' => 'Frete ' . $frete['empresa'] . ' ' . $frete['nome'], 'quantity' => 1,
  'unit_price' => $frete['preco'], 'currency_id' => 'BRL'];
$nome = explode(' ', $cli['nome'], 2);
$tel = so_digitos($cli['telefone']);
$pref = [
  'items' => $mpItens,
  'external_reference' => $ref,
  'statement_descriptor' => mb_substr($mp['descricao_fatura'], 0, 13),
  'payer' => array_filter([
    'name' => $nome[0], 'surname' => $nome[1] ?? '', 'email' => $cli['email'] ?: null,
    'phone' => ['area_code' => substr($tel, 0, 2), 'number' => substr($tel, 2)],
  ]),
  'payment_methods' => ['installments' => (int) $mp['parcelas_max']],
  'back_urls' => [
    'success' => $CFG['site_url'] . '/obrigado.html?status=aprovado&ref=' . $ref,
    'pending' => $CFG['site_url'] . '/obrigado.html?status=pendente&ref=' . $ref,
    'failure' => $CFG['site_url'] . '/obrigado.html?status=recusado&ref=' . $ref,
  ],
  'auto_return' => 'approved',
  'metadata' => ['entrega' => $entrega, 'endereco' => $entrega === 'envio' ? $cli : null, 'obs' => $obs],
];
$r = http_json('https://api.mercadopago.com/checkout/preferences', ['Authorization: Bearer ' . $mp['access_token']], $pref);
if (!in_array($r['_status'], [200, 201], true) || empty($r['init_point'])) erro('Não foi possível abrir o pagamento agora. Tente de novo ou finalize pelo WhatsApp.', 502);

@mail($CFG['email_pedidos'], "Pedido {$ref} — " . brl($total), $corpo,
  "From: Site Phenix <{$CFG['email_pedidos']}>\r\nContent-Type: text/plain; charset=UTF-8");

responde(['url' => $r['init_point'], 'ref' => $ref, 'total' => $total]);

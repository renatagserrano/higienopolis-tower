<?php
/* POST {cep, itens:[{id,op,qtd}]} -> {opcoes:[...]} */
require __DIR__ . '/lib.php';
$d = entrada();
$itens = itens_validos($d['itens'] ?? null);
responde(['opcoes' => cotar_frete((string) ($d['cep'] ?? ''), $itens), 'teste' => (bool) $CFG['modo_teste']]);

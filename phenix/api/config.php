<?php
/* ============================================================
   PHENIX · CONFIGURAÇÃO DO SERVIDOR (frete e pagamento)
   Este arquivo guarda chaves secretas. Não mande por WhatsApp/e-mail.
   ============================================================ */
return [
  // true = simula frete e pagamento (para testar o site sem as contas).
  // Troque para false depois de preencher os tokens abaixo.
  'modo_teste' => true,

  // Endereço do site publicado, sem barra no final.
  'site_url' => 'https://phenixteccel.com.br',

  // E-mail que recebe cada pedido feito no site.
  'email_pedidos' => 'contato@phenixteccel.com.br',

  'melhorenvio' => [
    // Painel Melhor Envio > Integrações > Permissões de acesso > Gerar token
    // (marcar: shipping-calculate). Cole o token inteiro entre as aspas.
    'token'      => '',
    'sandbox'    => false,        // true só se o token for do ambiente de testes
    'cep_origem' => '',           // CEP da loja, só números. Ex.: '01234000'
    'contato'    => 'contato@phenixteccel.com.br', // vai no cabeçalho exigido pela API
    'servicos'   => '',           // vazio = todas as transportadoras. Ex.: '1,2,3,4,17'
  ],

  'mercadopago' => [
    // Mercado Pago > Seu negócio > Configurações > Credenciais de produção > Access Token
    'access_token'     => '',
    'descricao_fatura' => 'PHENIX',  // aparece na fatura do cartão (até 13 letras)
    'parcelas_max'     => 12,
  ],
];

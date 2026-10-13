/* ============================================================
   PHENIX TECCEL · CONFIGURAÇÃO DO SITE
   Produtos e preços ficam em produtos.json.
   Chaves de frete e pagamento ficam em api/config.php.
   ============================================================ */

const CONFIG = {
  // Número do WhatsApp com DDI + DDD, só dígitos. Ex.: 5511999998888
  whatsapp: '5511999405627', // (11) 99940-5627
  endereco: 'Rua Paulo de Morais, 97 · São Paulo',
  horario: 'Seg a qui 8h–18h · Sex 8h–17h',
  email: 'contato@phenixteccel.com.br',
  instagram: 'https://instagram.com/phenixteccel',
  // Vídeo de fundo da abertura (ID do YouTube). Deixe '' para só o logo.
  videoAbertura: 'vnHKiPKlzZk',
  // Frete pelo Melhor Envio e pagamento pelo Mercado Pago (precisa da pasta api/ no servidor).
  // false = carrinho só finaliza pelo WhatsApp.
  pagamentoOnline: true,
};

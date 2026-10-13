/* ============================================================
   PHENIX TECCEL · CONFIGURAÇÃO E CATÁLOGO
   Edite só este arquivo para trocar número, produtos e preços.
   ============================================================ */

const CONFIG = {
  // Número do WhatsApp com DDI + DDD, só dígitos. Ex.: 5511999998888
  whatsapp: '5511999405627', // (11) 99940-5627
  endereco: 'Rua Paulo de Morais, 97 · São Paulo',
  horario: 'Seg a qui 8h–18h · Sex 8h–17h',
  instagram: 'https://instagram.com/phenixteccel',
  // Vídeo de fundo da abertura (ID do YouTube). Deixe '' para só o logo.
  videoAbertura: 'vnHKiPKlzZk',
};

/* Categorias = mesmas do catálogo do WhatsApp (guia, p. 13) */
const CATEGORIAS = ['Blocos PU', 'Blocos EPS', 'Resinas', 'Tecidos', 'Acessórios'];

/* Cada produto:
   id        único, sem espaço
   nome      nome do produto
   categoria uma das CATEGORIAS
   destaque  texto grande do card (medida, gramatura...)
   desc      uma frase, tom de oficina
   opcoes    lista de variações (tamanho, volume). Opcional.
   preco     número em reais (ex.: 489.9) ou null = "sob consulta"
   tag       etiqueta opcional: 'PRONTA ENTREGA', 'CHEGOU', 'TÉCNICA'
   img       caminho da foto (opcional). Sem foto, o card usa a medida grande.

   ATENÇÃO: lista abaixo é EXEMPLO. Substituir pelos produtos e preços reais. */
const PRODUTOS = [
  { id: 'pu-short', nome: 'Bloco PU Shortboard', categoria: 'Blocos PU', destaque: "6'4",
    desc: 'Bloco Teccel de poliuretano para pranchinha. Aceita resina poliéster.',
    opcoes: ["5'10", "6'0", "6'2", "6'4", "6'6", "6'8"], preco: null, tag: 'PRONTA ENTREGA' },
  { id: 'pu-fun', nome: 'Bloco PU Funboard', categoria: 'Blocos PU', destaque: "7'2",
    desc: 'Bloco Teccel para fun e evolutiva.',
    opcoes: ["7'0", "7'2", "7'6", "8'0"], preco: null },
  { id: 'pu-long', nome: 'Bloco PU Longboard', categoria: 'Blocos PU', destaque: "9'1",
    desc: 'Bloco Teccel para longboard clássico.',
    opcoes: ["9'1", "9'4", "9'6"], preco: null, tag: 'CHEGOU' },
  { id: 'eps-short', nome: 'Bloco EPS', categoria: 'Blocos EPS', destaque: 'EPS',
    desc: 'Bloco de poliestireno expandido, mais leve. Pede resina epóxi.',
    opcoes: ["6'0", "6'4", "7'0"], preco: null },
  { id: 'res-poli', nome: 'Resina Poliéster', categoria: 'Resinas', destaque: 'POLI',
    desc: 'Para laminação de bloco PU. Acompanha catalisador.',
    opcoes: ['1 kg', '5 kg', '20 kg'], preco: null },
  { id: 'res-epoxi', nome: 'Resina Epóxi', categoria: 'Resinas', destaque: 'EPÓXI',
    desc: 'Para bloco EPS. Kit resina + endurecedor.',
    opcoes: ['1 kg', '5 kg'], preco: null, tag: 'TÉCNICA' },
  { id: 'tec-4oz', nome: 'Tecido de Fibra de Vidro', categoria: 'Tecidos', destaque: '4 OZ',
    desc: 'Tecido para laminação. Vendido por metro.',
    opcoes: ['4 oz', '6 oz'], preco: null },
  { id: 'quilhas', nome: 'Caixas de Quilha', categoria: 'Acessórios', destaque: 'FCS',
    desc: 'Plugs e caixas para instalação de quilhas.',
    opcoes: ['Jogo triquilha', 'Jogo quadriquilha'], preco: null },
  { id: 'lixas', nome: 'Kit de Lixas', categoria: 'Acessórios', destaque: '80–400',
    desc: 'Grãos para shape, lixamento e acabamento.',
    opcoes: null, preco: null },
];

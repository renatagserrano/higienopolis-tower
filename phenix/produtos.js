/* ============================================================
   PHENIX TECCEL · CONFIGURAÇÃO E CATÁLOGO
   Edite só este arquivo para trocar número, produtos e preços.
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
};

const CATEGORIAS = ['Blocos', 'Tecidos', 'Fitas de carbono', 'Resinas', 'Quilhas e caixas', 'Lixas e pads', 'Ferramentas'];

/* Cada produto:
   id        único, sem espaço (também é o nome da foto em img/produtos/<id>.jpg)
   nome      nome do produto
   categoria uma das CATEGORIAS
   preco     número em reais (ex.: 148) ou null = "sob consulta"
   un        unidade do preço: 'm' (metro), 'jd' (jarda), 'kit'... Opcional.
   opcoes    variações. Texto simples ['A','B'] ou com preço próprio [{nome:'A', preco:10, min:100}]
             (min = quantidade mínima daquela opção)
   desc      uma frase. Opcional.
   tag       etiqueta: 'PRONTA ENTREGA', 'CHEGOU', 'TÉCNICA'. Opcional.
   destaque  texto grande do card quando não há foto. Opcional.
   img       true = usa img/produtos/<id>.jpg

   Fonte: catálogos Phenix de acessórios, laminação e fitas de carbono (out/2026). */
const PRODUTOS = [
  /* ---------- BLOCOS ---------- */
  { id: 'blocos-teccel', nome: 'Blocos Teccel PU e EPS', categoria: 'Blocos', destaque: 'TECCEL', preco: null,
    desc: 'Revenda autorizada Teccel em São Paulo. Chama no WhatsApp com o modelo e a medida para ver estoque e valor.',
    tag: 'PRONTA ENTREGA' },

  /* ---------- TECIDOS DE FIBRA DE VIDRO ---------- */
  { id: 'surftexx-4oz', nome: 'Tecido SurfTexx 4oz', categoria: 'Tecidos', destaque: '4 OZ', un: 'm',
    desc: 'Fibra de vidro importada para laminação de pranchas.',
    opcoes: [{ nome: 'Por metro', preco: 16.5 }, { nome: 'Caixa, a partir de 100 m', preco: 13.5, min: 100 }] },
  { id: 'surftexx-6oz', nome: 'Tecido SurfTexx 6oz', categoria: 'Tecidos', destaque: '6 OZ', un: 'm',
    desc: 'Fibra de vidro importada para laminação de pranchas.',
    opcoes: [{ nome: 'Por metro', preco: 19.5 }, { nome: 'Caixa, a partir de 100 m', preco: 15.5, min: 100 }] },

  /* ---------- FITAS DE CARBONO (internacionais por jarda = 92 cm; nacionais por metro) ---------- */
  { id: 'ribz-web21', nome: 'Tecido Ribz Web21', categoria: 'Fitas de carbono', preco: 52, un: 'jd', img: true, desc: 'Internacional, vendido por jarda (92 cm).' },
  { id: 'honeycomb-6', nome: 'Tecido Honeycomb Style 6"', categoria: 'Fitas de carbono', preco: 50, un: 'jd', img: true, desc: 'Internacional, vendido por jarda (92 cm).' },
  { id: 'ribz-2', nome: 'Tecido Ribz 2"', categoria: 'Fitas de carbono', preco: 40, un: 'jd', img: true, desc: 'Internacional, vendido por jarda (92 cm).' },
  { id: 'carbono-22255', nome: 'Tecido Fibra Carbono 22255', categoria: 'Fitas de carbono', preco: 30, un: 'jd', img: true, desc: 'Internacional, vendido por jarda (92 cm).' },
  { id: 'sb-carbono-80', nome: 'Tecido SB Fita Carbono 80 mm', categoria: 'Fitas de carbono', preco: 32, un: 'jd', img: true, desc: 'Internacional, vendido por jarda (92 cm).' },
  { id: 'ribz-edge', nome: 'Tecido Ribz Edge Fita Blue/Green', categoria: 'Fitas de carbono', preco: 20, un: 'jd', img: true, desc: 'Internacional, vendido por jarda (92 cm).' },
  { id: 'wfh-6s-hibrida', nome: 'Tecido WFH 6S Fita Híbrida Col', categoria: 'Fitas de carbono', preco: 20, un: 'jd', img: true, desc: 'Internacional, vendido por jarda (92 cm).' },
  { id: 'xpic-202', nome: 'Tecido XPIC 202 18" Inegra', categoria: 'Fitas de carbono', preco: 60, un: 'jd', img: true, desc: 'Internacional, vendido por jarda (92 cm).' },
  { id: 'fibertex-8-vermelha', nome: 'Fibertex Fita Carbono 8 cm (listra vermelha)', categoria: 'Fitas de carbono', preco: 18, un: 'm', img: true, desc: 'Nacional, vendida por metro.' },
  { id: 'fibertex-8-laranja', nome: 'Fibertex Fita Carbono 8 cm (listra laranja)', categoria: 'Fitas de carbono', preco: 18, un: 'm', img: true, desc: 'Nacional, vendida por metro.' },
  { id: 'texiglass-10-preta', nome: 'Texiglass Fita Carbono 10 cm Preta', categoria: 'Fitas de carbono', preco: 28, un: 'm', img: true, desc: 'Nacional, vendida por metro.' },

  /* ---------- RESINAS E PIGMENTOS ---------- */
  { id: 'surfcell-poliester', nome: 'Resina Poliéster Surfcell', categoria: 'Resinas', destaque: 'POLI', tag: 'TÉCNICA',
    desc: 'Resina PU roxa, já pré-aditivada: precisa de menos catalisador. Ideal para pranchas de PU.',
    opcoes: [{ nome: 'Galão 5 kg', preco: 235 }, { nome: 'Galão 20 kg', preco: 765 }] },
  { id: 'surfcell-epoxi', nome: 'Resina Epóxi Surfcell', categoria: 'Resinas', destaque: 'EPÓXI', tag: 'TÉCNICA', preco: 980, un: 'kit',
    desc: 'Kit 10 kg de resina + 5 kg de endurecedor. Para pranchas de PU e EPS.' },
  { id: 'pigmentos', nome: 'Pigmentos em pó', categoria: 'Resinas', preco: 16, img: true, desc: 'Para colorir a laminação.' },

  /* ---------- QUILHAS, CAIXAS E LEASH ---------- */
  { id: 'caixa-surfblanks-8', nome: 'SurfBlanks Caixa de Quilha 8"', categoria: 'Quilhas e caixas', preco: 62, img: true },
  { id: 'caixa-surfblanks-10', nome: 'SurfBlanks Caixa de Quilha 10"', categoria: 'Quilhas e caixas', preco: 67, img: true },
  { id: 'caixa-surfblanks-12', nome: 'SurfBlanks Caixa de Quilha 12"', categoria: 'Quilhas e caixas', preco: 70, img: true },
  { id: 'caixa-surfblanks-14', nome: 'SurfBlanks Caixa de Quilha 14"', categoria: 'Quilhas e caixas', preco: 75, img: true },
  { id: 'expans-caixa-9-branca', nome: 'Expans Caixa de Quilha 9" Branca', categoria: 'Quilhas e caixas', preco: 36, img: true },
  { id: 'expans-caixa-9-preta', nome: 'Expans Caixa de Quilha 9" Preta', categoria: 'Quilhas e caixas', preco: 36, img: true },
  { id: 'fcs2-tri-9-preto', nome: 'Jogo FCS II Triquilha 9° Preto', categoria: 'Quilhas e caixas', preco: 278, img: true },
  { id: 'fcs2-lateral-5-preto', nome: 'Jogo FCS II Lateral 5° Preto', categoria: 'Quilhas e caixas', preco: 174, img: true },
  { id: 'fcs2-tri-9-economy', nome: 'Jogo FCS II Triquilha 9° Economy Branco/Preto', categoria: 'Quilhas e caixas', preco: 236, img: true },
  { id: 'fcs2-lateral-5-economy', nome: 'Jogo FCS II Lateral 5° Economy Branco/Preto', categoria: 'Quilhas e caixas', preco: 168, img: true },
  { id: 'future-tri-branco', nome: 'Jogo Future Triquilha Branco', categoria: 'Quilhas e caixas', preco: 189, img: true },
  { id: 'expans-sunny-cinza', nome: 'Expans Jogo de Quilha Sunny Cinza', categoria: 'Quilhas e caixas', preco: 95, img: true },
  { id: 'expans-sunny-branco', nome: 'Expans Jogo de Quilha Sunny Branco', categoria: 'Quilhas e caixas', preco: 95, img: true },
  { id: 'expans-star-preta', nome: 'Expans Jogo de Quilha Star Preta', categoria: 'Quilhas e caixas', preco: 95, img: true },
  { id: 'quilha-long-hammer', nome: 'Quilha Encaixe Long Hammer', categoria: 'Quilhas e caixas', preco: 174, img: true },
  { id: 'fcs2-gabarito', nome: 'FCS II Gabarito', categoria: 'Quilhas e caixas', preco: 410, img: true },
  { id: 'dafinz-gabarito-infinity', nome: 'Dafinz Gabarito Infinity', categoria: 'Quilhas e caixas', preco: 225, img: true },
  { id: 'expans-gabarito-instalacao', nome: 'Expans Gabarito de Instalação', categoria: 'Quilhas e caixas', preco: 35, img: true },
  { id: 'regua-quilhas', nome: 'Régua para Quilhas Transparente', categoria: 'Quilhas e caixas', preco: 120, img: true },
  { id: 'fresa-fcs', nome: 'Fresa FCS Original', categoria: 'Quilhas e caixas', preco: 210, img: true },
  { id: 'expans-copinho-leash', nome: 'Expans Copinho de Leash Submerso Long', categoria: 'Quilhas e caixas', preco: 3.5, img: true },
  { id: 'dafinz-copinho-leash', nome: 'Dafinz Copinho de Leash', categoria: 'Quilhas e caixas', preco: 3.5, img: true },
  { id: 'fita-extensora-diamond', nome: 'Jogo de Fita Extensora Diamond', categoria: 'Quilhas e caixas', preco: 150, img: true },

  /* ---------- LIXAS E PADS ---------- */
  { id: 'pad-surfblanks-medio', nome: 'Pad Manual Surfblanks Médio', categoria: 'Lixas e pads', preco: 210, img: true },
  { id: 'pad-flexpad-duro', nome: 'Pad Manual FlexPad Duro Branco', categoria: 'Lixas e pads', preco: 210, img: true },
  { id: 'pad-flexpad-macio', nome: 'Pad Manual FlexPad Macio Amarelo', categoria: 'Lixas e pads', preco: 210, img: true },
  { id: 'softpad-entrequilhas', nome: 'SoftPad Entrequilhas', categoria: 'Lixas e pads', preco: 139, img: true },
  { id: 'softpad-macio', nome: 'SoftPad Macio', categoria: 'Lixas e pads', preco: 129, img: true },
  { id: 'softpad-medio', nome: 'SoftPad Médio', categoria: 'Lixas e pads', preco: 129, img: true },
  { id: 'softpad-duro', nome: 'SoftPad Duro', categoria: 'Lixas e pads', preco: 129, img: true },
  { id: 'lixa-buffalo-150', nome: 'Lixa Pad Manual Buffalo 150', categoria: 'Lixas e pads', preco: 35, img: true },
  { id: 'lixa-buffalo-240', nome: 'Lixa Pad Manual Buffalo 240', categoria: 'Lixas e pads', preco: 35, img: true },
  { id: 'lixa-buffalo-320-400', nome: 'Lixa Pad Manual Buffalo 320/400', categoria: 'Lixas e pads', preco: 35, img: true },
  { id: 'lixa-mirka', nome: 'Lixa Pad Manual Mirka', categoria: 'Lixas e pads', preco: 35, img: true, opcoes: ['80', '120', '240'] },
  { id: 'lixa-sandscreen', nome: 'Lixa Tela Sandscreen', categoria: 'Lixas e pads', preco: 40, img: true, opcoes: ['80', '120', '180', '240'] },
  { id: 'lixa-rhynalox', nome: 'Lixa Seca Rhynalox', categoria: 'Lixas e pads', preco: 5, img: true },

  /* ---------- FERRAMENTAS DE SHAPE ---------- */
  { id: 'stanley-surform-reto-10', nome: 'Stanley Surform Reto 10"', categoria: 'Ferramentas', preco: 148, img: true },
  { id: 'stanley-surform-6', nome: 'Stanley Surform 6"', categoria: 'Ferramentas', preco: 98, img: true },
  { id: 'stanley-lamina-surform-6', nome: 'Stanley Lâmina Surform 6"', categoria: 'Ferramentas', preco: 42, img: true },
  { id: 'stanley-borboleta', nome: 'Stanley Borboleta', categoria: 'Ferramentas', preco: 198, img: true },
  { id: 'ratinho-david', nome: 'Ratinho David', categoria: 'Ferramentas', preco: 340, img: true },
  { id: 'lamina-david-10', nome: 'Lâmina David (pacote com 10)', categoria: 'Ferramentas', preco: 220, img: true },
  { id: 'paquimetro', nome: 'Paquímetro / Espessômetro', categoria: 'Ferramentas', preco: 150, img: true },
  { id: 'regua-shape-t', nome: 'Régua para Shape Branca em T', categoria: 'Ferramentas', preco: 120, img: true },
  { id: 'espatula-surfblanks', nome: 'Espátula de Laminação Surfblanks', categoria: 'Ferramentas', preco: 110, img: true },
];

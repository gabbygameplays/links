# link-bio - gabby GTA

Página de links em **React + Vite + Motion**. Tema terminal em rosa, mobile-first:
cabeçalho, texto de abertura e 8 recomendações num grid - GTA VI e os consoles
PlayStation no topo, o resto da série GTA e os Red Dead embaixo.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # serve o dist/
```

## Publicar no GitHub Pages

GitHub Actions já configurado, mas o workflow só dispara em push na `main`
(`.github/workflows/deploy.yml`). Se essa branch (`gabby-gta`) for virar o site
publicado, ou faça o merge na `main`, ou inclua a branch no `on.push.branches`.

Depois: **Settings → Pages → Source: GitHub Actions**. `vite.config.js` usa
`base: './'`, então funciona tanto em `usuario.github.io/link-bio/` quanto na raiz.

## Editar

**Tudo em `src/data.js`.** Nenhum componente precisa ser tocado pra mudar conteúdo.

```js
// produto - o grid é de 1/2/3 colunas conforme a largura
{ id: 'x', name: 'Nome', rating: '4,8', reviews: '127 avaliações',
  price: 'R$ 99', was: 'R$ 149', store: 'Mercado Livre',
  why: 'Por que vale a pena.', url: 'https://...' }
```

`rating`, `reviews`, `was` e a foto são opcionais - o card se ajusta sozinho
quando faltam.

## Decisões de design

Vice City / GTA VI: noite roxa de Miami com o pôr do sol rosa-laranja do logo
do VI e o magenta de letreiro de neon.

- **Paleta própria em OKLCH.** Fundo é roxo profundo
  (`oklch(0.145 0.055 305)`), **não preto** - o preto mata o neon.
- **O gradiente do pôr do sol é caro, então é dosado.** Só aparece em quatro
  lugares: o nome, o preço, o sol do topo e a borda do card no hover. O resto
  se sustenta em roxo e ciano.
- **Anton** nos displays (nome, títulos, preço) e **Archivo Variable** no
  corpo, ambas servidas junto do site. Anton é o parente livre mais próximo do
  lettering pesado da série.
- **Cantos arredondados** (`--r: 14px`), que é a linguagem do VI - o oposto do
  tema anterior.
- **O sol do topo é um arco simétrico** ancorado na borda de cima. As primeiras
  versões usavam manchas descentralizadas e liam como borrão solto, não como
  horizonte.
- **CTA é pílula de neon**: só contorno em repouso, preenche no hover. O
  magenta (`--neon`, matiz 335) é deliberadamente mais frio que o rosa do pôr
  do sol (355) pra não virar repetição do gradiente do preço, que fica logo
  acima do botão. O subtítulo usa `--violet`, que mantém dois tons no
  cabeçalho.
- Capa do produto sobre painel claro com `object-fit: contain` - com `cover` as
  capas de jogo perdiam as laterais e o console ficava decapitado.
- **Avatar** é `public/perfil.webp`, recortado em volta do rosto e não no
  enquadramento original - a 74px o enquadramento inteiro vira mancha. O anel
  de gradiente é o `padding` do wrapper `.portrait-ring`, não do próprio
  `<img>`: `border-radius` corta na border-box, então com padding no `<img>`
  os cantos da imagem furariam o anel.
- **O favicon é o sol listrado de Vice City em SVG** (`public/avatar.svg`). As
  listras são grossas de propósito: em 16px listra fina vira cinza chapado.

## Grid

Responsivo: **1 coluna** até 30rem (480px), **2** de 30rem a 52rem, **3** acima
de 52rem (832px) - onde a página também alarga de 44rem pra 66rem.

## Adicionar um produto

1. adicione o objeto em `products` no `src/data.js` com um `id` novo;
2. salve a capa em `src/produtos/<id>.webp` - ela se liga sozinha pelo nome do
   arquivo (`src/fotos.js` faz um glob). Aceita `.png`, `.jpg` e `.webp`;
3. preencha `price` (e `was`, se tiver preço cheio) e `why`.

```bash
npm run fotos    # lista quem está sem foto e o nome de arquivo esperado
```

As capas atuais vieram do `og:image` da própria página do produto no ML
(`http2.mlstatic.com/...-F.webp`).

## Antes de divulgar

- **Confirme a redação exigida do aviso de afiliado.** O texto em `disclosure`
  (`src/data.js`) identifica o programa e os links patrocinados, que é o que a
  obrigação pede. Cheque no painel de afiliados se há uma redação literal exigida.
- Não remova o aviso: os links `meli.la` são de afiliado, e CONAR e CDC esperam
  a divulgação.
- A página não tem redes sociais de propósito: o rodapé é só a assinatura.
  Os únicos links que saem daqui são os de produto.
- **Preços são um retrato de 30/08/2026** e mudam sozinhos no ML, inclusive as
  promoções. Reveja de vez em quando ou tire o campo `price`.
- Nenhum produto tem `rating`/`reviews` preenchidos ainda - a linha da nota
  simplesmente não aparece. Preencha na mão se quiser mostrar.
- Atualize as tags `og:` no `index.html` com a URL real depois do primeiro deploy.

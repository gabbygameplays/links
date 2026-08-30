const arquivos = import.meta.glob('./produtos/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const porId = {}
for (const [caminho, url] of Object.entries(arquivos)) {
  const id = caminho.split('/').pop().replace(/\.(png|jpe?g|webp)$/i, '')
  porId[id] = url
}

export const fotoDe = (id) => porId[id] ?? null

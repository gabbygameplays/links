// Lista quais produtos ainda estão sem foto e com que nome salvar o arquivo.
//   npm run fotos

import { readdirSync, existsSync } from 'node:fs'
import { products } from '../src/data.js'

const dir = new URL('../src/produtos/', import.meta.url)

const existentes = existsSync(dir)
  ? new Set(readdirSync(dir).map((f) => f.replace(/\.\w+$/, '')))
  : new Set()

let faltando = 0

for (const p of products) {
  const tem = existentes.has(p.id)
  if (!tem) faltando++
  const marca = tem ? '  ok  ' : 'FALTA '
  console.log(`${marca} src/produtos/${(p.id + '.webp').padEnd(24)} ${p.name}`)
}

console.log(
  `\n${products.length - faltando}/${products.length} com foto.` +
    (faltando ? ` Faltam ${faltando}.` : ' Tudo pronto.'),
)

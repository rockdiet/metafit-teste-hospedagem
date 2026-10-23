// Depois do build: o Astro inclui nas páginas, além do CSS gerado no servidor, o CSS que o build do navegador emite para as ilhas Vue.
// Como todas essas regras já estão no CSS do servidor, o bloco repetido é removido do HTML (<style> embutido ou <link>), para o visitante não baixar duas vezes.
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('./dist/', import.meta.url).pathname
const regras = (css) => new Set(css.match(/[^{}]+\{[^{}]*\}/g) || [])
const paginas = readdirSync(dist).filter((f) => f.endsWith('.html'))
const removidos = new Set()

for (const pagina of paginas) {
  const caminho = join(dist, pagina)
  let html = readFileSync(caminho, 'utf8')
  // Blocos de CSS da página: <style> embutidos (sem o is:inline das fontes, que não tem regras de componente) e <link rel="stylesheet">
  const blocos = []
  for (const m of html.matchAll(/<style>([\s\S]*?)<\/style>/g)) blocos.push({ tag: m[0], css: m[1] })
  for (const m of html.matchAll(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)">/g)) blocos.push({ tag: m[0], css: readFileSync(join(dist, m[1]), 'utf8'), arquivo: m[1] })
  const vivos = new Set(blocos)
  for (const b of blocos) {
    const minhas = regras(b.css)
    const outras = new Set([...vivos].filter((o) => o !== b).flatMap((o) => [...regras(o.css)]))
    if (minhas.size && [...minhas].every((r) => outras.has(r))) {
      html = html.replace(b.tag, '')
      vivos.delete(b)
      if (b.arquivo) removidos.add(b.arquivo)
      console.log(pagina + ': removido ' + (b.arquivo || '<style> embutido') + ' (' + minhas.size + ' regras repetidas)')
    }
  }
  // O CSS que sobrou é embutido no HTML: o navegador não precisa de outra ida e volta antes de desenhar a página
  for (const b of vivos) {
    if (b.arquivo) {
      html = html.replace(b.tag, '<style>' + b.css.trim() + '</style>')
      removidos.add(b.arquivo)
    }
  }
  writeFileSync(caminho, html)
}
for (const l of removidos) {
  const usado = paginas.some((p) => readFileSync(join(dist, p), 'utf8').includes(l))
  if (!usado && existsSync(join(dist, l))) unlinkSync(join(dist, l))
}

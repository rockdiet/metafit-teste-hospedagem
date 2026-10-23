// Medição de cliques: todo botão e link da página avisa o GTM (dataLayer) e o Pixel da Meta quando é clicado,
// com um nome automático no formato "seção | texto do botão" (ex.: "topo | Teste grátis", "planos | Pro | Começar grátis por 10 dias").
// Também repassa as UTMs da visita para a página de teste grátis e para o checkout, para a origem não se perder no caminho.
const w = window as any

const limpar = (texto: string) => texto.replace(/\s+/g, ' ').trim().slice(0, 80)

const nomeDo = (el: HTMLElement) => {
  const secao = el.closest('section, header, footer, main')
  const lugar = secao?.id || (secao?.tagName === 'HEADER' ? 'menu' : secao?.tagName === 'FOOTER' ? 'rodape' : location.pathname)
  const plano = el.closest('article')?.querySelector('h3')?.textContent
  const texto = limpar(el.textContent || el.getAttribute('aria-label') || '')
  return [lugar, plano ? limpar(plano) : '', texto].filter(Boolean).join(' | ')
}

document.addEventListener('click', (evento) => {
  const el = (evento.target as HTMLElement)?.closest?.('a, button') as HTMLElement | null
  if (!el) return
  const nome = nomeDo(el)
  const destino = el.getAttribute('href') || ''
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: 'clique_botao', botao_nome: nome, botao_destino: destino, pagina: location.pathname })
  if (typeof w.fbq === 'function') w.fbq('trackCustom', 'CliqueBotao', { botao: nome, destino })
}, true)

// Seção vista: avisa uma vez por visita quando cada seção aparece (pelo menos 35% na tela)
const vistas = new Set<string>()
const observar = () => {
  if (!('IntersectionObserver' in window)) return
  const olho = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      const id = (entrada.target as HTMLElement).id
      if (!entrada.isIntersecting || !id || vistas.has(id)) return
      vistas.add(id)
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({ event: 'secao_vista', secao: id, pagina: location.pathname })
      olho.unobserve(entrada.target)
    })
  }, { threshold: 0.35 })
  document.querySelectorAll('main section[id], main > div > section[id]').forEach((s) => olho.observe(s))
}
if (document.readyState === 'complete') observar()
else window.addEventListener('load', observar, { once: true })

// UTMs e afins da visita: repassa para os links internos de teste grátis e para o checkout
const busca = location.search
if (busca.length > 1) {
  const repassar = () => {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="/teste-gratis"]').forEach((a) => {
      if (!a.getAttribute('href')?.includes('?')) a.setAttribute('href', '/teste-gratis' + busca)
    })
    document.querySelectorAll<HTMLAnchorElement>('a[href^="https://checkout.metafit.cc"]').forEach((a) => {
      const href = a.getAttribute('href') || ''
      if (!href.includes('utm_')) a.setAttribute('href', href + (href.includes('?') ? '&' : '?') + busca.slice(1))
    })
  }
  repassar()
  setTimeout(repassar, 1500)
  document.addEventListener('click', (evento) => {
    if ((evento.target as HTMLElement)?.closest?.('a[href^="/teste-gratis"], a[href^="https://checkout.metafit.cc"]')) repassar()
  }, true)
}

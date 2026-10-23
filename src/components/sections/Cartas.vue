<template>
  <section class="cartas" :class="{ parada }" id="app" ref="secao">
    <div class="cabecalho movel">
      <span class="selo">O app do aluno</span>
      <h2>Tudo que o seu aluno precisa, <span class="realce">num único app</span></h2>
    </div>
    <div class="fixo" ref="fixo">
      <div class="cabecalho">
        <span class="selo">O app do aluno</span>
        <h2>Tudo que o seu aluno precisa, <span class="realce">num único app</span></h2>
      </div>
      <div class="baralho" ref="baralho">
        <article v-for="(carta, k) in cartas" :key="carta.titulo" class="carta" :class="{ inversa: k % 2 === 1 }">
          <div class="texto">
            <span class="numero">0{{ k + 1 }}</span>
            <h3>{{ carta.titulo }}</h3>
            <p>{{ carta.texto }}</p>
          </div>
          <div class="visual">
            <div class="aparelho" :class="carta.tipo">
              <span v-if="carta.tipo !== 'avisos'" class="camara" aria-hidden="true"></span>
              <img v-if="carta.tipo === 'tela'" :src="carta.imagem" :data-reserva="carta.reserva" :alt="carta.alt" width="560" height="1235" loading="lazy" decoding="async" onerror="if(this.dataset.reserva){this.src=this.dataset.reserva;this.removeAttribute('data-reserva')}" />
              <div v-else-if="carta.tipo === 'dupla'" class="quadro">
                <img v-for="(img, i) in carta.imagens" :key="img" :src="img" :class="{ segunda: i === 1 }" :alt="carta.alt" width="560" height="1235" loading="lazy" decoding="async" />
              </div>
              <div v-else-if="carta.tipo === 'filmado'" class="quadro">
                <img :src="carta.imagem" :alt="carta.alt" width="560" height="1235" loading="lazy" decoding="async" />
                <video class="clipe" :data-src="carta.video" :poster="carta.poster" muted loop playsinline preload="none" aria-hidden="true"></video>
              </div>
              <div v-else-if="carta.tipo === 'slider'" class="quadro comparar" :style="palco">
                <img :src="carta.depois" :alt="carta.alt" width="560" height="1235" loading="lazy" decoding="async" />
                <img class="antes" :src="carta.antes" alt="" width="560" height="1235" loading="lazy" decoding="async" />
                <span class="divisa" aria-hidden="true">
                  <span class="alca">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-4 6 4 6M15 6l4 6-4 6" /></svg>
                  </span>
                </span>
              </div>
              <div v-else-if="carta.tipo === 'video'" class="filme">
                <img :src="carta.imagem" :data-reserva="carta.reserva" :alt="carta.alt" width="540" height="1140" loading="lazy" decoding="async" onerror="if(this.dataset.reserva){this.src=this.dataset.reserva;this.removeAttribute('data-reserva')}" />
                <span class="etiqueta">Treino B · Costas</span>
                <span class="tocar" aria-hidden="true">
                  <Icone nome="play" />
                </span>
                <div class="legenda">
                  <strong>Pulldown na polia</strong>
                  <span>4 séries · 12 repetições · 60s de descanso</span>
                </div>
              </div>
              <div v-else class="bloqueio" :class="{ acesa }">
                <span class="ilha" aria-hidden="true"></span>
                <div class="status" aria-hidden="true">
                  <span>Vivo</span>
                  <span class="icones">
                    <svg viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
                    <svg viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.6c2.2 0 4.2.8 5.7 2.2l1.4-1.5C13.2 1.5 10.7.5 8 .5S2.8 1.5.9 3.3l1.4 1.5C3.8 3.4 5.8 2.6 8 2.6zm0 3.5c1.2 0 2.4.5 3.2 1.3l1.4-1.5C11.4 4.7 9.8 4 8 4s-3.4.7-4.6 1.9l1.4 1.5c.8-.8 2-1.3 3.2-1.3zm0 3.4c-.6 0-1.1.2-1.5.6L8 11.8l1.5-1.7c-.4-.4-.9-.6-1.5-.6z" /></svg>
                    <svg viewBox="0 0 27 12" fill="none"><rect x="0.5" y="0.5" width="23" height="11" rx="3.2" stroke="currentColor" opacity="0.5" /><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" /><path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4z" fill="currentColor" opacity="0.5" /></svg>
                  </span>
                </div>
                <div class="relogio" aria-hidden="true">
                  <span class="data">{{ dataTela }}</span>
                  <span class="hora">9:41</span>
                </div>
                <TransitionGroup name="chega" tag="div" class="pilha">
                  <div v-for="(aviso, i) in chegados" :key="aviso.titulo" class="aviso">
                    <span class="marca" aria-hidden="true">
                      <Icone nome="raio" />
                    </span>
                    <div class="corpo">
                      <span class="linha"><b>MetaFit</b><small>{{ quandoAviso[i] }}</small></span>
                      <strong>{{ aviso.titulo }}</strong>
                      <span class="msg">{{ aviso.texto }}</span>
                    </div>
                  </div>
                </TransitionGroup>
                <div class="atalhos" aria-hidden="true">
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8l-1 6H9L8 2zM9 8h6v13a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V8zM12 13v2" /></svg></span>
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" /><circle cx="12" cy="13" r="3.5" /></svg></span>
                </div>
                <span class="barra" aria-hidden="true"></span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icone from '../Icone.vue'

// Cartas que vão passando uma por cima da outra conforme a página rola (seção fixa na tela enquanto o baralho avança)
// Telas reais do app do aluno (capturas do projeto Metafit Mobile) em WebP leve, 25 a 42 KB cada, servidas pelo próprio site (public/imagens).
// LP5: todas as telas no modo claro do app
const cdn = '/imagens/'
const telas = {
  inicio: cdn + 't0t6taehj2iemwcm-claro-inicio-2.webp',
  treinoLista: cdn + '3cum0ihkxgbjkmnd-claro-treino-lista.webp',
  treinoSerie: cdn + 'v6ftue0ljfr3q8rg-claro-treino-serie.webp',
  dieta: cdn + 'nvrqr3ew6m7vaya0-claro-dieta.webp',
  video: cdn + 'u0bdhjiff0feilhg-claro-video.webp',
  fotosAntes: cdn + 'zlotbbzaupte4xp8-claro-fotos-antes-julia.webp',
  fotosDepois: cdn + '6w3lllsgoxl5wtgw-claro-fotos-depois-julia.webp',
  historico: cdn + 'gtjfknunefz0cbwh-claro-historico.webp'
}
// Onde fica a área das fotos dentro da tela do slider (em % da tela), para a linha divisória andar só sobre ela
const palco = { '--px': '4.32%', '--py': '29.92%', '--pw': '91.35%', '--ph': '55.23%' }
const remotas = '/imagens/reserva/'

const cartas = [
  { tipo: 'tela', titulo: 'Dashboard', imagem: telas.inicio, reserva: remotas + 'screen-1.jpeg', alt: 'Tela inicial do app do aluno com pendências, treino do dia, dieta e hidratação', texto: 'Tudo do dia numa tela só: treino, dieta, hidratação e próximos treinos. O aluno abre o app e sabe exatamente o que fazer hoje, sem depender de mensagem sua.' },
  { tipo: 'tela', titulo: 'Tela de treino', imagem: telas.treinoLista, reserva: remotas + 'screen-3.jpeg', alt: 'Treino A de quadríceps com os exercícios do dia e um bi-set', texto: 'O treino do dia do jeito que você prescreveu: exercícios em ordem, bi-sets e observações. O aluno abre o app, vê o que tem para hoje e começa com um toque.' },
  { tipo: 'tela', titulo: 'Registro das séries', imagem: telas.treinoSerie, reserva: remotas + 'screen-3.jpeg', alt: 'Série em andamento com carga, repetições e a série anterior para comparar', texto: 'A cada série, o aluno anota a carga e as repetições que fez e marca como concluída, vendo o que fez na última vez para tentar superar. Você acompanha a evolução de carga sem precisar perguntar.' },
  { tipo: 'tela', titulo: 'Tela de dieta', imagem: telas.dieta, reserva: remotas + 'screen-5.jpeg', alt: 'Dieta do aluno com refeições do dia, calorias e macros de cada uma', texto: 'Refeições, macros, substituições e recados do treinador dentro do app. Chega de PDF perdido na conversa do WhatsApp.' },
  { tipo: 'tela', titulo: 'Substituições', imagem: cdn + '8wtzc0j4e4g06ly1-claro-substituicao-almoco.webp', reserva: telas.dieta, alt: 'Opções de troca no almoço: peito de frango por carne moída, tilápia ou peito de peru', texto: 'Enjoou do frango? O aluno toca no alimento e vê as trocas que você já deixou aprovadas, na quantidade certa: patinho, tilápia ou peito de peru. A dieta continua no plano e você não recebe mais aquela mensagem perguntando o que pode comer no lugar.' },
  { tipo: 'filmado', titulo: 'Biomecânica', imagem: cdn + 'z40dy68o70dzazom-claro-video-supino-3.webp', video: '/videos/7uyck1b36uynvtrk-supino-inclinado.mp4', poster: cdn + '4hoouve4903mk5wr-supino-poster.webp', alt: 'Vídeo de execução do supino inclinado máquina enviado pelo treinador', texto: 'Cada exercício com vídeo de execução e orientação de técnica. O aluno treina certo mesmo longe de você, e erra muito menos.' },
  { tipo: 'avisos', titulo: 'Notificações', texto: 'Treino liberado, dieta atualizada, pagamento confirmado: o aluno e você são avisados na hora, sem ninguém precisar mandar mensagem.' },
  { tipo: 'slider', titulo: 'Comparativo de fotos', antes: telas.fotosAntes, depois: telas.fotosDepois, alt: 'Slider comparando a foto de antes e a de depois do aluno', texto: 'Fotos de frente, lado e costas lado a lado, com peso e data. O aluno vê o resultado acontecendo, e resultado visível é o que faz ele renovar.' },
  { tipo: 'tela', titulo: 'Histórico', imagem: telas.historico, reserva: remotas + 'screen-4.jpeg', alt: 'Histórico de treinos do aluno em calendário, com treinos e volume do mês', texto: 'Treinos, dietas e manipulados anteriores guardados no perfil do aluno. A evolução completa em segundos, sem procurar em conversa antiga.' }
]

const avisos = [
  { quando: 'agora', titulo: 'Treino D liberado', texto: 'Seu treinador atualizou sua ficha' },
  { quando: 'há 5 min', titulo: 'Plano alimentar atualizado', texto: 'Nova refeição às 10:00' },
  { quando: 'há 30 min', titulo: 'Pagamento confirmado', texto: 'Plano mensal · R$ 297,00' },
  { quando: 'ontem', titulo: 'Hora da foto de evolução', texto: 'Registre seu progresso desta semana' }
]

// Tela de bloqueio: as notificações chegam uma de cada vez, a mais nova por cima; no fim a tela apaga e o ciclo recomeça
const ordemAvisos = avisos.slice().reverse()
const chegados = ref(avisos.slice())
const acesa = ref(true)
const quandoAviso = ['agora', 'há 2 min', 'há 5 min', 'há 12 min']
const dataTela = ref('Sábado, 17 de outubro')
let relogioAvisos = 0
let olhoAvisos = null

const pararAvisos = () => {
  clearTimeout(relogioAvisos)
  relogioAvisos = 0
}

const passoAvisos = () => {
  if (chegados.value.length >= ordemAvisos.length) {
    chegados.value = []
    acesa.value = false
    relogioAvisos = setTimeout(passoAvisos, 1200)
    return
  }
  acesa.value = true
  chegados.value = [ordemAvisos[chegados.value.length], ...chegados.value]
  relogioAvisos = setTimeout(passoAvisos, chegados.value.length === ordemAvisos.length ? 4200 : 1600)
}

const iniciarAvisos = () => {
  pararAvisos()
  chegados.value = []
  acesa.value = false
  relogioAvisos = setTimeout(passoAvisos, 500)
}

const props = defineProps({
  forca: { type: String, default: '' }
})

const PASSO = 10
const secao = ref(null)
const fixo = ref(null)
let forcado = null
const baralho = ref(null)
const parada = ref(false)

let elementos = []
let celular = false
let esconderMovel = 0
let quadro = 0

const limitar = (v) => Math.min(Math.max(v, 0), 1)

// Pilha de cartas mais baixa: no máximo 3 bordas aparecendo atrás, e bem finas no celular, para sobrar espaço para o app
const passoAtual = () => (celular ? 4 : PASSO)
const empilha = (k) => Math.min(k, 3) * passoAtual()

// No celular a carta ocupa a tela toda: o espaço que sobra abaixo do texto vira a altura da tela do app
const ajustar = () => {
  if (!fixo.value || !baralho.value) return
  const n = elementos.length
  if (!celular) {
    fixo.value.style.paddingTop = ''
    baralho.value.style.height = ''
    elementos.forEach((el) => {
      const aparelho = el.querySelector('.aparelho')
      if (aparelho) aparelho.style.height = ''
    })
    return
  }
  let fimMenu = 0
  const menu = document.querySelector('header')
  if (menu && getComputedStyle(menu).position === 'fixed') fimMenu = menu.getBoundingClientRect().bottom
  const topo = Math.max(12, Math.round(fimMenu + 10))
  fixo.value.style.paddingTop = topo + 'px'
  const alturaFixa = fixo.value.clientHeight
  esconderMovel = alturaFixa + 30
  baralho.value.style.height = Math.max(300, alturaFixa - topo - empilha(n - 1) - 10) + 'px'
  elementos.forEach((el) => {
    const texto = el.querySelector('.texto')
    const aparelho = el.querySelector('.aparelho')
    if (!texto || !aparelho) return
    const estilo = getComputedStyle(el)
    const interno = el.clientHeight - parseFloat(estilo.paddingTop) - parseFloat(estilo.paddingBottom)
    const espaco = parseFloat(estilo.rowGap) || 12
    const livre = Math.floor(interno - texto.offsetHeight - espaco - 4)
    aparelho.style.height = Math.max(120, livre) + 'px'
  })
}

// Posição de cada carta a partir do quanto a seção já rolou
const atualizar = () => {
  if (!secao.value || !fixo.value || parada.value) return
  const n = elementos.length
  const r = secao.value.getBoundingClientRect()
  const alturaTela = fixo.value.clientHeight || window.innerHeight
  const total = r.height - alturaTela
  if (!(total > 0)) return
  const progresso = forcado === null ? limitar(-r.top / total) : forcado
  const u = progresso * ((n - 1) + 0.4)
  const esconder = celular ? esconderMovel : alturaTela * 0.78
  elementos.forEach((el, k) => {
    let desloca = 0
    if (k > 0) {
      const pg = limitar(u - (k - 1))
      desloca = (1 - pg) * esconder + pg * empilha(k)
    }
    const coberta = k < n - 1 ? limitar(u - k) : 0
    const escala = 1 - 0.04 * coberta
    el.style.transform = 'translateY(' + desloca + 'px) scale(' + escala + ')'
    el.style.setProperty('--cob', coberta)
    el.style.zIndex = k + 1
  })
}

const aoRolar = () => {
  if (quadro) return
  quadro = requestAnimationFrame(() => {
    quadro = 0
    atualizar()
  })
}

// No celular a barra de endereço do navegador some e volta enquanto a pessoa rola, mudando a altura da tela a toda hora.
// Se a seção acompanhasse (dvh), ela encolhia e crescia centenas de pixels no meio da rolagem e a página dava tranco.
// Por isso, no celular, a altura fica travada em pixels e só é recalculada quando a largura muda (ao girar o aparelho)
let larguraAnterior = 0
let alturaEstavel = 0

const aoRedimensionar = (ev) => {
  celular = window.matchMedia('(max-width: 1000px)').matches
  const largura = window.innerWidth
  if (celular && ev && ev.type === 'resize' && largura === larguraAnterior && alturaEstavel) return
  if (!alturaEstavel || largura !== larguraAnterior) alturaEstavel = window.innerHeight
  larguraAnterior = largura
  const fator = 100 + Math.round(((elementos.length - 1) + 0.4) * 78)
  if (secao.value) secao.value.style.height = parada.value ? '' : (celular ? Math.round(alturaEstavel * fator / 100) + 'px' : fator + 'dvh')
  if (fixo.value) fixo.value.style.height = celular && !parada.value ? alturaEstavel + 'px' : ''
  ajustar()
  atualizar()
}

let observador = null

onMounted(() => {
  elementos = Array.from(baralho.value ? baralho.value.querySelectorAll('.carta') : [])
  if (props.forca !== '') forcado = limitar(parseFloat(props.forca) || 0)
  try {
    const d = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
    dataTela.value = d.charAt(0).toUpperCase() + d.slice(1)
  } catch (e) {}
  parada.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (parada.value) return
  // Só anima quando a carta das notificações está na tela, recomeçando do zero cada vez que ela aparece
  const tela = baralho.value ? baralho.value.querySelector('.bloqueio') : null
  if (tela && 'IntersectionObserver' in window) {
    olhoAvisos = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          if (!relogioAvisos) iniciarAvisos()
        } else pararAvisos()
      })
    }, { threshold: 0.6 })
    olhoAvisos.observe(tela)
  } else if (tela) iniciarAvisos()
  aoRedimensionar()
  window.addEventListener('scroll', aoRolar, { passive: true })
  window.addEventListener('resize', aoRedimensionar)
  window.addEventListener('orientationchange', aoRedimensionar)
  window.addEventListener('load', aoRedimensionar)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(aoRedimensionar)
  ;[300, 1000, 2500].forEach((t) => setTimeout(aoRedimensionar, t))
  elementos.forEach((el) => {
    el.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', ajustar)
    })
  })
  // O vídeo (290 KB) só começa a baixar depois que a página terminou de carregar, para não pesar na primeira dobra
  const ligarVideos = () => {
    if (!baralho.value) return
    baralho.value.querySelectorAll('video[data-src]').forEach((v) => {
      v.src = v.dataset.src
      v.removeAttribute('data-src')
      const tocar = v.play()
      if (tocar && tocar.catch) tocar.catch(() => {})
    })
  }
  if (document.readyState === 'complete') setTimeout(ligarVideos, 1500)
  else window.addEventListener('load', () => setTimeout(ligarVideos, 1500), { once: true })
  if ('ResizeObserver' in window) {
    observador = new ResizeObserver(ajustar)
    elementos.forEach((el) => {
      const texto = el.querySelector('.texto')
      if (texto) observador.observe(texto)
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', aoRolar)
  window.removeEventListener('resize', aoRedimensionar)
  window.removeEventListener('orientationchange', aoRedimensionar)
  window.removeEventListener('load', aoRedimensionar)
  if (observador) observador.disconnect()
  if (olhoAvisos) olhoAvisos.disconnect()
  pararAvisos()
  cancelAnimationFrame(quadro)
})
</script>

<style lang="sass" scoped>
.cartas
  display: block
  position: relative
  width: 100%
  height: 600dvh
  background: var(--cor-fundo)

  .movel
    display: none

  .fixo
    display: flex
    position: sticky
    top: 0
    width: 100%
    height: 100dvh
    padding: 0 24px 0 24px
    flex-direction: column
    align-items: center
    justify-content: center
    overflow: hidden
    background: radial-gradient(ellipse 60% 50% at 50% 0%, var(--cor-fumaca-fraca), transparent 70%), var(--cor-fundo)

    .cabecalho
      position: relative
      z-index: 20

  .baralho
    display: block
    position: relative
    width: 100%
    max-width: 1010px
    height: min(60dvh, 560px)
    margin: 26px 0 0 0

  .carta
    display: flex
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    padding: 20px 46px 20px 46px
    align-items: center
    justify-content: space-between
    gap: 30px
    overflow: hidden
    background: var(--cor-carta)
    border: 1px solid var(--cor-linha-forte)
    border-radius: var(--raio-carta) var(--raio-carta) var(--raio-carta) var(--raio-carta)
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)
    backdrop-filter: blur(22px) saturate(1.4)
    -webkit-backdrop-filter: blur(22px) saturate(1.4)
    transform-origin: 50% 50%
    will-change: transform

    &.inversa
      flex-direction: row-reverse

    .texto, .visual
      opacity: calc(1 - var(--cob, 0))

    .texto
      display: flex
      width: 56%
      flex-direction: column
      align-items: flex-start

      .numero
        display: flex
        width: 34px
        height: 34px
        margin: 0 0 16px 0
        align-items: center
        justify-content: center
        font-family: var(--bold)
        font-size: var(--f0)
        color: var(--cor-destaque-viva)
        background: var(--cor-vidro-destaque)
        border: 1px solid var(--cor-linha-destaque)
        border-radius: 50% 50% 50% 50%

      h3
        margin: 0 0 10px 0
        font-family: var(--bold)
        font-size: var(--f6)
        color: var(--cor-texto)
        line-height: 1.1

      p
        max-width: 44ch
        font-family: var(--light)
        font-size: var(--f2)
        color: var(--cor-suave)
        line-height: 1.6

    .visual
      display: flex
      width: 40%
      align-items: center
      justify-content: center

    // Celular de verdade em volta de todas as telas do app: moldura de metal escuro, botões laterais e a ilha no topo
    .aparelho
      display: block
      position: relative
      height: min(calc(60dvh - 40px), 520px)
      padding: 7px 7px 7px 7px
      background: linear-gradient(145deg, #3a3a40 0%, #0d0d10 45%, #26262b 100%)
      border: 1px solid rgba(255, 255, 255, 0.14)
      border-radius: 34px 34px 34px 34px
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5), inset 0 0 0 2px rgba(0, 0, 0, 0.6)

      &::before
        content: ''
        position: absolute
        top: 20%
        left: -4px
        width: 3px
        height: 15%
        background: #2c2c31
        border-radius: 3px 0 0 3px

      &::after
        content: ''
        position: absolute
        top: 26%
        right: -4px
        width: 3px
        height: 11%
        background: #2c2c31
        border-radius: 0 3px 3px 0

      // Ilha do iPhone por cima da barra de status da tela
      > .camara
        display: block
        position: absolute
        top: 2.6%
        left: 50%
        z-index: 3
        width: 29%
        aspect-ratio: 3.5 / 1
        transform: translateX(-50%)
        background: var(--cor-preto)
        border-radius: 99px 99px 99px 99px

      img
        display: block
        width: auto
        height: 100%
        border-radius: 28px 28px 28px 28px

      &.video
        aspect-ratio: 9 / 19

      &.dupla, &.slider, &.filmado
        aspect-ratio: 560 / 1235

      &.avisos
        aspect-ratio: 560 / 1235

    // Duas telas na mesma moldura: a segunda aparece e some sozinha (lista do treino e série em andamento)
    // No slider, a foto de antes é recortada da direita para a esquerda e a linha acompanha o corte
    .quadro
      display: block
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      border-radius: 28px 28px 28px 28px

      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        border-radius: 0 0 0 0

      .segunda
        animation: alternar 7s ease-in-out infinite

      // Vídeo de execução encaixado exatamente na área do player da tela do app
      .clipe
        display: block
        position: absolute
        top: 56.04%
        left: 3.78%
        width: 92.43%
        height: 23.58%
        object-fit: cover
        border-radius: 5.3% / 9.4%
        background: var(--cor-preto)

      .antes
        animation: revelar 6s ease-in-out infinite

      .divisa
        display: block
        position: absolute
        top: var(--py)
        left: 0
        width: 2px
        height: var(--ph)
        margin: 0 0 0 -1px
        background: var(--cor-branco)
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.25)
        animation: andar 6s ease-in-out infinite

        .alca
          display: flex
          position: absolute
          top: 50%
          left: 50%
          width: 30px
          height: 30px
          margin: -15px 0 0 -15px
          align-items: center
          justify-content: center
          color: var(--cor-escuro)
          background: var(--cor-branco)
          border-radius: 50% 50% 50% 50%
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3)

          svg
            width: 15px
            height: 15px

    .filme
      display: block
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      border-radius: 28px 28px 28px 28px

      img
        width: 100%
        height: 100%
        object-fit: cover

      .etiqueta
        position: absolute
        top: 16px
        left: 14px
        padding: 6px 10px 6px 10px
        font-family: var(--bold)
        font-size: var(--f0)
        color: var(--cor-texto)
        background: var(--cor-barra)
        border-radius: var(--raio-total) var(--raio-total) var(--raio-total) var(--raio-total)

      .tocar
        display: flex
        position: absolute
        top: 50%
        left: 50%
        width: 56px
        height: 56px
        margin: -28px 0 0 -28px
        align-items: center
        justify-content: center
        color: var(--cor-branco)
        background: var(--cor-destaque)
        border-radius: 50% 50% 50% 50%
        box-shadow: 0 10px 30px rgba(209, 22, 31, 0.5)

        .icone
          width: 26px
          height: 26px
          margin: 0 0 0 3px

      .legenda
        display: flex
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        padding: 50px 16px 18px 16px
        flex-direction: column
        gap: 4px
        background: linear-gradient(180deg, transparent 0%, var(--cor-preto) 100%)

        strong
          font-family: var(--bold)
          font-size: var(--f2)
          color: var(--cor-texto)

        span
          font-family: var(--light)
          font-size: var(--f0)
          color: var(--cor-suave)

    // Tela de bloqueio do celular: papel de parede, relógio e as notificações do app chegando (medidas em cqw para escalar com o aparelho)
    .bloqueio
      display: block
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      text-align: left
      container-type: size
      background: radial-gradient(120% 55% at 10% 0%, rgba(255, 98, 76, 0.95) 0%, transparent 62%), radial-gradient(90% 50% at 100% 38%, rgba(160, 16, 34, 0.9) 0%, transparent 70%), radial-gradient(120% 60% at 0% 100%, rgba(78, 18, 64, 0.95) 0%, transparent 70%), linear-gradient(180deg, #520e19 0%, #140a12 100%)
      border-radius: 28px 28px 28px 28px

      // Tela apagada entre um ciclo e outro; acende quando chega a primeira notificação
      &::after
        content: ''
        position: absolute
        top: 0
        left: 0
        z-index: 5
        width: 100%
        height: 100%
        background: var(--cor-preto)
        opacity: 0.6
        pointer-events: none
        transition: opacity 0.6s ease

      &.acesa::after
        opacity: 0

      .ilha
        display: block
        position: absolute
        top: 3.2cqw
        left: 50%
        z-index: 6
        width: 30cqw
        height: 8.6cqw
        margin: 0 0 0 -15cqw
        background: var(--cor-preto)
        border-radius: 99px 99px 99px 99px

      .status
        display: flex
        position: absolute
        top: 4.6cqw
        left: 0
        width: 100%
        padding: 0 7cqw 0 9cqw
        align-items: center
        justify-content: space-between
        font-family: var(--bold)
        font-size: 4.4cqw
        color: var(--cor-branco)

        .icones
          display: flex
          align-items: center
          gap: 1.4cqw

          svg
            display: block
            width: auto
            height: 3.4cqw

      .relogio
        display: flex
        position: absolute
        top: 18cqw
        left: 0
        width: 100%
        flex-direction: column
        align-items: center
        color: var(--cor-branco)

        .data
          font-family: var(--bold)
          font-size: 4.8cqw
          opacity: 0.85

        .hora
          font-family: var(--bold)
          font-size: 25cqw
          line-height: 1
          opacity: 0.94

      .pilha
        display: flex
        position: absolute
        top: 60cqw
        left: 0
        width: 100%
        padding: 0 3.4cqw 0 3.4cqw
        flex-direction: column
        gap: 2.4cqw

      .aviso
        display: flex
        width: 100%
        padding: 3.2cqw 3.6cqw 3.2cqw 3.2cqw
        align-items: center
        gap: 3cqw
        background: rgba(246, 246, 248, 0.82)
        border-radius: 5.5cqw 5.5cqw 5.5cqw 5.5cqw
        box-shadow: 0 2cqw 6cqw rgba(0, 0, 0, 0.2)
        backdrop-filter: blur(14px) saturate(1.6)
        -webkit-backdrop-filter: blur(14px) saturate(1.6)

        .marca
          display: flex
          width: 10cqw
          min-width: 10cqw
          height: 10cqw
          align-items: center
          justify-content: center
          color: var(--cor-branco)
          background: var(--cor-destaque)
          border-radius: 2.6cqw 2.6cqw 2.6cqw 2.6cqw

          .icone
            width: 5.4cqw
            height: 5.4cqw

        .corpo
          display: flex
          width: 100%
          min-width: 0
          flex-direction: column
          gap: 0.3cqw
          color: var(--cor-aviso-texto)

          .linha
            display: flex
            align-items: baseline
            justify-content: space-between
            font-family: var(--light)
            font-size: 3.6cqw
            color: var(--cor-aviso-suave)

            b
              font-family: var(--bold)
              font-size: 3.8cqw
              color: var(--cor-aviso-texto)

          strong
            font-family: var(--bold)
            font-size: 4.4cqw
            line-height: 1.2

          .msg
            font-family: var(--light)
            font-size: 3.9cqw
            color: var(--cor-aviso-suave)
            line-height: 1.25

      // Chegada: desce do topo com um leve quique; as outras escorregam para baixo
      .chega-enter-active
        transition: opacity 0.45s ease, transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.2)

      .chega-move
        transition: transform 0.55s cubic-bezier(0.2, 0.9, 0.3, 1)

      .chega-leave-active
        transition: opacity 0.4s ease, transform 0.4s ease

      .chega-enter-from
        opacity: 0
        transform: translateY(-70%) scale(0.9)

      .chega-leave-to
        opacity: 0
        transform: translateY(-10%) scale(0.96)

      .atalhos
        display: flex
        position: absolute
        bottom: 8cqw
        left: 0
        width: 100%
        padding: 0 9cqw 0 9cqw
        justify-content: space-between

        span
          display: flex
          width: 11.5cqw
          height: 11.5cqw
          align-items: center
          justify-content: center
          color: var(--cor-branco)
          background: rgba(0, 0, 0, 0.3)
          border-radius: 50% 50% 50% 50%
          backdrop-filter: blur(10px)
          -webkit-backdrop-filter: blur(10px)

          svg
            width: 5.2cqw
            height: 5.2cqw

      .barra
        display: block
        position: absolute
        bottom: 2.4cqw
        left: 50%
        width: 34cqw
        height: 1.3cqw
        margin: 0 0 0 -17cqw
        background: var(--cor-branco)
        opacity: 0.85
        border-radius: 99px 99px 99px 99px

  // Quem prefere menos movimento vê as cartas uma abaixo da outra
  &.parada
    height: auto
    padding: 100px 24px 100px 24px

    .fixo
      position: static
      height: auto
      overflow: visible

    .baralho
      display: flex
      height: auto
      flex-direction: column
      gap: 18px

    .carta
      position: relative
      height: auto

// Lista do treino → série em andamento → volta
@keyframes alternar
  0%, 38%
    opacity: 0
  50%, 88%
    opacity: 1
  100%
    opacity: 0

// Linha passa de um lado para o outro sobre as fotos (de 15% a 85% da área das fotos)
@keyframes revelar
  0%, 8%
    clip-path: inset(0 81.98% 0 0)
  46%, 54%
    clip-path: inset(0 18.03% 0 0)
  92%, 100%
    clip-path: inset(0 81.98% 0 0)

@keyframes andar
  0%, 8%
    left: 18.02%
  46%, 54%
    left: 81.97%
  92%, 100%
    left: 18.02%

@media screen and (max-width: 1000px)
  .cartas
    .movel
      display: flex
      width: 100%
      padding: 80px 20px 18px 20px

    .fixo
      padding: 88px 14px 0 14px
      justify-content: flex-start

      .cabecalho
        display: none

    .baralho
      height: calc(100dvh - 152px)
      margin: 0 0 0 0

    .carta
      padding: 18px 18px 14px 18px
      flex-direction: column
      align-items: center
      justify-content: flex-start
      gap: 10px
      text-align: center
      background: var(--cor-cartao)
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45)
      backdrop-filter: none
      -webkit-backdrop-filter: none

      &.inversa
        flex-direction: column

      // Número ao lado do título e frase mais larga e baixa: sobra mais altura para a tela do app
      .texto
        width: 100%
        flex-direction: row
        flex-wrap: wrap
        align-items: center
        justify-content: center
        gap: 6px 10px

        .numero
          width: 28px
          height: 28px
          margin: 0 0 0 0

        h3
          margin: 0 0 0 0
          font-size: var(--f5)

        p
          width: 100%
          max-width: 34ch
          font-size: var(--f1)
          line-height: 1.5

      .visual
        width: 100%

      .aparelho
        height: 300px
        padding: 5px 5px 5px 5px
        border-radius: 26px 26px 26px 26px

        img
          border-radius: 22px 22px 22px 22px

      .filme, .quadro
        border-radius: 22px 22px 22px 22px

      .quadro img
        border-radius: 0 0 0 0

      .bloqueio
        border-radius: 22px 22px 22px 22px

    &.parada
      padding: 40px 20px 60px 20px

      .movel
        padding: 0 0 18px 0

      .fixo
        padding: 0 0 0 0

      .baralho
        height: auto

      .carta
        height: auto
</style>

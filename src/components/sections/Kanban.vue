<template>
  <section class="kanban" id="kanban" ref="secao">
    <div class="conteudo">
      <div class="cena">
        <!-- Computador: janela do app com o quadro inteiro e um aluno sendo arrastado de etapa -->
        <div class="computador">
          <div class="janela">
            <div class="topo" aria-hidden="true">
              <span class="bolas"><i></i><i></i><i></i></span>
              <span class="endereco">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                app.metafit.cc/kanban
              </span>
            </div>
            <video class="filme" :data-src="videoComputador" :data-poster="capaComputador" width="1280" height="788" muted loop playsinline preload="none" aria-label="Quadro Kanban da MetaFit com alunos sendo arrastados entre as etapas"></video>
          </div>
        </div>

        <!-- Celular: o mesmo movimento ampliado em duas etapas, para dar para ler os cards -->
        <div class="celular">
          <div class="quadro">
            <video class="filme" :data-src="videoCelular" :data-poster="capaCelular" width="960" height="491" muted loop playsinline preload="none" aria-label="Cards de alunos sendo arrastados entre as etapas do Kanban"></video>
          </div>
        </div>
      </div>

      <div class="texto">
        <span class="selo">Kanban de alunos</span>
        <h2>Veja em que etapa cada aluno está</h2>
        <p>Cada aluno vira um card no quadro, da anamnese à entrega do plano. Arraste de uma etapa para a outra e saiba na hora quem está esperando por você, sem planilha e sem lista no bloco de notas.</p>
        <ul>
          <li v-for="item in itens" :key="item">
            <span class="marca">
              <Icone nome="certo" />
            </span>
            <span>{{ item }}</span>
          </li>
        </ul>
        <a class="link" href="#planos">
          Organize seus alunos num quadro só
          <Icone nome="seta" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icone from '../Icone.vue'

// Tela real do Kanban (kanban-board.html do projeto Metafit Desktop no Claude Design), com mais alunos e a Camila Reis
// sendo arrastada de "Plano em criação" para "Plano criado". Vídeos MP4 leves: 170 KB (computador) e 160 KB (celular, três etapas)
// Endereço da CDN (Cloudflare) da biblioteca: entrega os arquivos de um servidor perto do visitante, bem mais rápido no Brasil
const cdn = '/'
// Juliana Costa vai para a 3ª posição de Plano criado e Renan Costa vai para cima da Bianca Torres; depois os dois voltam.
// Rápido, com brilho vermelho e o card arrastado sempre por cima de tudo (loop de 3,8 s)
const videoComputador = cdn + 'videos/xymhhfnjfly5j8mo-kanban3-desktop.mp4'
const videoCelular = cdn + 'videos/kbeson7n9cor2h1n-kanban3-celular.mp4'
const capaComputador = cdn + 'imagens/cari4yln7r9yre03-kanban3-desktop-poster.webp'
const capaCelular = cdn + 'imagens/6my0d49rp8tzfm6x-kanban3-celular-poster.webp'

const itens = [
  'Etapas do seu jeito: anamnese, plano em criação, plano criado, ajustes e feedback',
  'Ícones no card mostram o que já foi entregue: anamnese, fotos, dieta, treino e cardio',
  'Chat e WhatsApp direto do card, sem procurar o contato',
  'Um funil para cada produto ou mentoria que você vende'
]

const secao = ref(null)
let olho = null

// Só baixa o vídeo (e a capa) do aparelho que está visível, computador ou celular.
// Começa a baixar logo depois que a página terminou de carregar, ou antes, se a pessoa chegar perto da seção: quando ela chega, o vídeo já está pronto
const ligar = () => {
  if (!secao.value) return
  secao.value.querySelectorAll('video[data-src]').forEach((v) => {
    if (v.offsetParent === null) return
    if (v.dataset.poster) v.poster = v.dataset.poster
    v.src = v.dataset.src
    v.removeAttribute('data-src')
    const tocar = v.play()
    if (tocar && tocar.catch) tocar.catch(() => {})
  })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if ('IntersectionObserver' in window && secao.value) {
    olho = new IntersectionObserver((entradas) => {
      if (entradas.some((e) => e.isIntersecting)) ligar()
    }, { rootMargin: '1500px 0px' })
    olho.observe(secao.value)
  } else ligar()
  const adiantar = () => setTimeout(ligar, 2500)
  if (document.readyState === 'complete') adiantar()
  else window.addEventListener('load', adiantar, { once: true })
  window.addEventListener('resize', ligar)
})

onBeforeUnmount(() => {
  if (olho) olho.disconnect()
  window.removeEventListener('resize', ligar)
})
</script>

<style lang="sass" scoped>
.kanban
  display: flex
  width: 100%
  padding: 60px 24px 120px 24px
  justify-content: center
  overflow: hidden
  background: radial-gradient(ellipse 45% 55% at 28% 50%, rgba(209, 22, 31, 0.2), transparent 70%), var(--cor-fundo)

  .conteudo
    display: flex
    width: 100%
    max-width: 1180px
    align-items: center
    justify-content: space-between
    gap: 56px

  .texto
    display: flex
    width: 38%
    flex-direction: column
    align-items: flex-start
    gap: 22px

    h2
      font-family: var(--bold)
      font-size: var(--f7)
      color: var(--cor-texto)
      line-height: 1.08

    p
      font-family: var(--light)
      font-size: var(--f3)
      color: var(--cor-suave)
      line-height: 1.6

    ul
      display: flex
      flex-direction: column
      gap: 14px
      list-style: none

      li
        display: flex
        align-items: center
        gap: 12px
        font-family: var(--light)
        font-size: var(--f2)
        color: var(--cor-texto)
        line-height: 1.4

        .marca
          display: flex
          width: 26px
          min-width: 26px
          height: 26px
          align-items: center
          justify-content: center
          color: var(--cor-destaque-viva)
          border: 1px solid var(--cor-linha-destaque)
          border-radius: 50% 50% 50% 50%

          .icone
            width: 14px
            height: 14px

    .link
      display: inline-flex
      min-height: 44px
      align-items: center
      gap: 8px
      font-family: var(--bold)
      font-size: var(--f2)
      color: var(--cor-texto)
      transition: all 0.3s

      .icone
        width: 18px
        height: 18px
        color: var(--cor-destaque-viva)

      &:hover
        gap: 14px

  .cena
    display: flex
    width: 58%
    justify-content: center

  .filme
    display: block
    width: 100%
    height: auto
    background: #F6F8FB

  // ---------- Computador ----------
  .celular
    display: none

  .computador
    display: block
    width: 100%
    max-width: 680px

    .janela
      display: block
      width: 100%
      overflow: hidden
      background: var(--cor-branco)
      border: 1px solid rgba(255, 255, 255, 0.16)
      border-radius: 14px 14px 14px 14px
      box-shadow: 0 0 100px var(--cor-brilho), 0 34px 80px rgba(0, 0, 0, 0.55)

      .topo
        display: flex
        position: relative
        height: 36px
        padding: 0 14px 0 14px
        align-items: center
        justify-content: center
        background: #ECEDF1
        border-bottom: 1px solid #DCDEE4

        .bolas
          display: flex
          position: absolute
          top: 0
          left: 14px
          height: 100%
          align-items: center
          gap: 7px

          i
            display: block
            width: 11px
            height: 11px
            background: #FF5F57
            border-radius: 50% 50% 50% 50%

            &:nth-child(2)
              background: #FEBC2E

            &:nth-child(3)
              background: #28C840

        .endereco
          display: flex
          width: 46%
          height: 22px
          align-items: center
          justify-content: center
          gap: 6px
          font-family: var(--light)
          font-size: 11px
          color: #5B5E69
          background: var(--cor-branco)
          border-radius: 6px 6px 6px 6px

          svg
            width: 10px
            height: 10px

@media screen and (max-width: 1000px)
  .kanban
    padding: 20px 20px 90px 20px

    .conteudo
      flex-direction: column-reverse
      gap: 40px

    .texto
      width: 100%
      gap: 18px

    .cena
      width: 100%

    .computador
      display: none

    // ---------- Celular: recorte ampliado de duas etapas ----------
    .celular
      display: block
      width: 100%

      .quadro
        display: block
        width: 100%
        overflow: hidden
        background: #F6F8FB
        border: 1px solid rgba(255, 255, 255, 0.16)
        border-radius: 20px 20px 20px 20px
        box-shadow: 0 0 90px var(--cor-brilho), 0 24px 60px rgba(0, 0, 0, 0.5)
</style>

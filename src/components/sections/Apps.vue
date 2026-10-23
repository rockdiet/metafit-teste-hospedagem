<template>
  <section class="apps" id="apps">
    <div class="topo">
      <span class="selo">Um app no lugar de quatorze</span>
      <h2>Aluno em <span class="realce">planilha</span>?</h2>
      <p>Planilha para cobrança, Forms para as perguntas, PDF para o treino, WhatsApp todo bagunçado e agenda no caderninho. A MetaFit junta tudo isso em um lugar só.</p>
    </div>

    <div class="palco" aria-hidden="true">
      <span class="brilho"></span>
      <div v-for="(app, k) in apps" :key="app.nome" class="app" :style="{ '--x': app.x + 'px', '--y': app.y + 'px', '--xm': (app.xm ?? Math.round(app.x * 0.32)) + 'px', '--ym': (app.ym ?? app.y) + 'px', '--r': app.r + 'deg', '--d': (k * 0.012) + 's', '--b': ((k % 5) * 0.33) + 's', '--c': app.cor }">
        <span class="bloco" :class="{ comlogo: app.imagem && !app.cheio, cheio: app.cheio }">
          <img v-if="app.imagem" :src="app.imagem" alt="" width="160" height="160" loading="lazy" decoding="async" />
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="app.icone"></svg>
        </span>
        <span class="nome">{{ app.nome }}</span>
      </div>
      <div class="contador">
        <strong>Bagunça</strong>
      </div>
      <div class="centro">
        <img :src="logo" alt="" width="168" height="49" loading="lazy" decoding="async" />
        <span class="legenda">Tudo num app só</span>
      </div>
    </div>

    <p class="conta"><s>14 apps abertos</s><Icone nome="seta" /><strong>1 MetaFit</strong></p>
  </section>
</template>

<script setup>
import Icone from '../Icone.vue'

// Os apps que o treinador usa hoje ficam espalhados e flutuando; depois todos se juntam no centro e viram a MetaFit (loop de 5 s).
// Ícones são desenhos próprios e genéricos (planilha, documento, formulário, conversa...), com o nome de cada app embaixo, sem os logotipos oficiais.
const cdn = 'https://unicpages-assets.nyc3.cdn.digitaloceanspaces.com/imagens/'
const logo = '/images/logo.svg'
// Logos enviados pelo Maykon (imagem): ficam num bloco branco, como ícone de app; os outros seguem com o desenho

const desenho = {
  planilha: "<rect x='3.5' y='4' width='17' height='16' rx='2'/><path d='M3.5 9h17M3.5 14h17M9 4v16M15 4v16'/>",
  soma: "<rect x='3.5' y='4' width='17' height='16' rx='2'/><path d='M3.5 9h17M9 9v11'/><path d='M16.5 12h-4l2.2 2.5-2.2 2.5h4'/>",
  documento: "<path d='M6 3h8l4 4v14H6z'/><path d='M14 3v4h4M9 11h6M9 14h6M9 17h4'/>",
  texto: "<path d='M6 3h8l4 4v14H6z'/><path d='M14 3v4h4M9 11h6M9 14h6'/><path d='M12.5 19.5l4-4 1.5 1.5-4 4h-1.5z'/>",
  formulario: "<rect x='4' y='3' width='16' height='18' rx='2'/><rect x='7' y='7' width='3' height='3' rx='.6'/><path d='M12.5 8.5h4.5'/><rect x='7' y='13' width='3' height='3' rx='.6'/><path d='M12.5 14.5h4.5M7.6 8.6l.8.8 1.4-1.6'/>",
  conversa: "<path d='M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z'/><path d='M9 10.5c.5 2 2 3.5 4 4l1.2-1.2 1.8.8-.5 1.6c-3.3.2-6.7-3.2-6.5-6.5l1.6-.5.8 1.8z'/>",
  pdf: "<path d='M6 3h8l4 4v14H6z'/><path d='M14 3v4h4'/><path d='M8.5 17v-4h1.3a1.2 1.2 0 0 1 0 2.4H8.5M12.3 13v4h.9a2 2 0 0 0 0-4zM16.2 17v-4h1.8M16.2 15h1.4'/>",
  pasta: "<path d='M3.5 7a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z'/><path d='M3.5 10.5h17'/>",
  agenda: "<rect x='3.5' y='5' width='17' height='15' rx='2'/><path d='M3.5 10h17M8 3v4M16 3v4M8 14h2M12 14h2M16 14h.5M8 17h2M12 17h2'/>",
  caderno: "<rect x='6' y='3' width='13' height='18' rx='2'/><path d='M4 7h3M4 11h3M4 15h3M10 8h6M10 12h6'/>",
  banco: "<path d='M3.5 9.5L12 4l8.5 5.5'/><path d='M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3.5 20h17'/>",
  email: "<rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3.5 6.5L12 13l8.5-6.5'/>"
}

// Posições em volta do centro (px no computador; no celular o CSS encolhe as distâncias)
const apps = [
  { nome: 'Planilhas', icone: desenho.planilha, imagem: cdn + '3monbtcpa14amc4z-app-planilhas2.webp', cheio: true, cor: '#FF6B6B', x: -390, y: -150, r: -8 },
  { nome: 'Excel', icone: desenho.soma, imagem: cdn + 'vkj9k94p01q21cmk-app-excel3.webp', cheio: true, cor: '#8B5CF6', x: -205, y: -190, r: 6 },
  { nome: 'Google Docs', icone: desenho.documento, cor: '#F59E0B', x: 10, y: -200, r: -4 },
  { nome: 'Documentos', icone: desenho.texto, imagem: cdn + 'zhh8217hwlfz5mfz-app-docs2.webp', cheio: true, cor: '#EC4899', x: 225, y: -175, r: 9 },
  { nome: 'Formulários', icone: desenho.formulario, imagem: cdn + 'o8q695qgnbd7nwkn-app-forms2.webp', cheio: true, cor: '#06B6D4', x: 400, y: -160, r: -6 },
  { nome: 'WhatsApp', icone: desenho.conversa, imagem: cdn + '9d7p241awbgvb7re-app-whatsapp.webp', cheio: true, cor: '#F97316', x: -100, y: 115, r: 5 },
  { nome: 'PDF', icone: desenho.pdf, imagem: cdn + 'nmsz12zpyl74vk03-app-pdf3.webp', cheio: true, cor: '#6366F1', x: 100, y: 115, r: -10 },
  { nome: 'Armazenamento', icone: desenho.pasta, imagem: cdn + '6bde61r7cu3w527v-app-armazenamento4.webp', cheio: true, cor: '#14B8A6', x: 250, y: 25, r: 7 },
  { nome: 'Agenda', icone: desenho.agenda, imagem: cdn + 'qo5ue069mppc4rgt-app-agenda3.webp', cheio: true, cor: '#A855F7', x: 455, y: -15, r: -5 },
  { nome: 'Caderninho', icone: desenho.caderno, imagem: cdn + '6scnel96npn630d8-app-caderno.webp', cheio: true, cor: '#EAB308', x: -320, y: 185, r: 8 },
  { nome: 'App do banco', icone: desenho.banco, imagem: cdn + 'h1crbe07zt05kb2s-app-banco.webp', cheio: true, cor: '#3B82F6', x: -440, y: 20, r: -6 },
  { nome: 'Banco', icone: desenho.banco, imagem: cdn + 'xbehgp2vipgqf38p-app-banco2.webp', cheio: true, cor: '#FF6200', x: -250, y: 30, r: 7 },
  { nome: 'E-mail', icone: desenho.email, imagem: cdn + 'dgdhaw6zcmpic5qa-app-email.webp', cheio: true, cor: '#F43F5E', x: 260, y: 185, r: 4 },
  { nome: 'Mercado Pago', icone: desenho.banco, imagem: cdn + '428b6gfim5irqc1g-app-mercado-pago.webp', cheio: true, cor: '#00B1EA', x: 400, y: 145, r: -3 }
]

// No celular: 2 logo acima e 2 logo abaixo do "Bagunça", 3 no topo, 2 de cada lado e 3 no fundo (Mercado Pago no meio)
const roda = {
  'Planilhas': [-110, -165], 'Documentos': [0, -190], 'Formulários': [110, -165],
  'Excel': [-42, -78], 'Google Docs': [42, -78],
  'App do banco': [-135, -35], 'Banco': [-135, 65], 'Agenda': [135, -35], 'Armazenamento': [135, 65],
  'WhatsApp': [-42, 82], 'PDF': [42, 82],
  'Caderninho': [-95, 182], 'Mercado Pago': [0, 182], 'E-mail': [95, 182]
}
apps.forEach((app) => { app.xm = roda[app.nome][0]; app.ym = roda[app.nome][1] })
</script>

<style lang="sass" scoped>
.apps
  display: flex
  position: relative
  width: 100%
  padding: 40px 24px 110px 24px
  flex-direction: column
  align-items: center
  overflow: hidden
  background: var(--cor-fundo)

  .topo
    display: flex
    width: 100%
    max-width: 820px
    flex-direction: column
    align-items: center
    gap: 18px
    text-align: center

    h2
      font-family: var(--bold)
      font-size: var(--f7)
      color: var(--cor-texto)
      line-height: 1.1

    p
      max-width: 680px
      font-family: var(--light)
      font-size: var(--f3)
      color: var(--cor-suave)
      line-height: 1.6

  // Palco da animação: os apps espalhados em volta do centro
  .palco
    display: block
    position: relative
    width: 100%
    max-width: 1100px
    height: 560px
    margin: 30px 0 0 0

    .brilho
      display: block
      position: absolute
      top: 50%
      left: 50%
      width: 520px
      height: 520px
      margin: -260px 0 0 -260px
      background: radial-gradient(closest-side, var(--cor-brilho), transparent)
      opacity: 0
      animation: acender 5s ease-in-out infinite

    .app
      display: flex
      position: absolute
      top: 50%
      left: 50%
      width: 110px
      margin: -48px 0 0 -55px
      --xa: var(--x)
      --ya: var(--y)
      flex-direction: column
      align-items: center
      gap: 8px
      animation: juntar 5s cubic-bezier(0.7, 0, 0.3, 1) infinite
      animation-delay: var(--d)

      .bloco
        display: flex
        width: 72px
        height: 72px
        align-items: center
        justify-content: center
        color: var(--cor-branco)
        background: linear-gradient(150deg, color-mix(in srgb, var(--c) 82%, white) 0%, var(--c) 45%, color-mix(in srgb, var(--c) 60%, black) 100%)
        border: 1px solid rgba(255, 255, 255, 0.22)
        border-radius: 20px 20px 20px 20px
        box-shadow: 0 14px 30px color-mix(in srgb, var(--c) 40%, transparent), 0 6px 14px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35)
        backdrop-filter: blur(8px)
        -webkit-backdrop-filter: blur(8px)
        animation: flutuar 2.8s ease-in-out infinite alternate
        animation-delay: var(--b)

        svg
          width: 34px
          height: 34px
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))

        &.comlogo
          background: var(--cor-branco)
          border: 1px solid rgba(255, 255, 255, 0.6)
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5), 0 0 24px rgba(255, 255, 255, 0.08)

          img
            width: 62px
            height: 62px

        img
          display: block
          width: 42px
          height: 42px

        // Imagem que já é o ícone inteiro do app: ocupa o bloco todo
        &.cheio
          overflow: hidden
          background: transparent
          border: none
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5)

          img
            width: 100%
            height: 100%

      .nome
        font-family: var(--light)
        font-size: var(--f0)
        color: var(--cor-suave)
        white-space: nowrap

    // Número no meio enquanto os apps estão espalhados; encolhe quando eles se juntam e volta no fim
    .contador
      display: flex
      position: absolute
      top: 50%
      left: 50%
      width: 300px
      margin: -36px 0 0 -150px
      justify-content: center
      animation: contar 5s cubic-bezier(0.7, 0, 0.3, 1) infinite

      strong
        font-family: var(--bold)
        font-size: 60px
        color: var(--cor-destaque-viva)
        line-height: 1.2
        white-space: nowrap
        text-shadow: 0 10px 40px rgba(209, 22, 31, 0.4)

    .centro
      display: flex
      position: absolute
      top: 50%
      left: 50%
      width: 300px
      margin: -50px 0 0 -150px
      flex-direction: column
      align-items: center
      gap: 12px
      opacity: 0
      animation: surgir 5s cubic-bezier(0.2, 0.9, 0.3, 1.15) infinite

      img
        display: block
        width: 220px
        height: auto
        filter: drop-shadow(0 10px 40px rgba(209, 22, 31, 0.6))

      .legenda
        font-family: var(--bold)
        font-size: var(--f2)
        color: var(--cor-texto)

  .conta
    display: flex
    margin: 10px 0 0 0
    align-items: center
    gap: 12px
    font-family: var(--light)
    font-size: var(--f3)
    color: var(--cor-fraca)

    s
      text-decoration-color: var(--cor-destaque-viva)

    .icone
      width: 20px
      height: 20px
      color: var(--cor-destaque-viva)

    strong
      font-family: var(--bold)
      color: var(--cor-texto)

// Espalhados e flutuando, depois todos sugados para o centro, some e volta
@keyframes juntar
  0%
    opacity: 0
    transform: translate(calc(var(--xa) * 1.15), calc(var(--ya) * 1.15)) rotate(var(--r)) scale(0.8)
  3%, 30%
    opacity: 1
    transform: translate(var(--xa), var(--ya)) rotate(var(--r)) scale(1)
  42%, 100%
    opacity: 0
    transform: translate(0, 0) rotate(0deg) scale(0.2)

@keyframes contar
  0%, 30%
    opacity: 1
    transform: scale(1)
  41%, 94%
    opacity: 0
    transform: scale(0.2)
  100%
    opacity: 1
    transform: scale(1)

@keyframes flutuar
  0%
    transform: translateY(-6px) rotate(-2deg)
  100%
    transform: translateY(6px) rotate(2deg)

@keyframes surgir
  0%, 39%
    opacity: 0
    transform: scale(0.6)
  48%, 93%
    opacity: 1
    transform: scale(1)
  100%
    opacity: 0
    transform: scale(1.05)

@keyframes acender
  0%, 37%
    opacity: 0
    transform: scale(0.6)
  47%, 92%
    opacity: 0.9
    transform: scale(1)
  100%
    opacity: 0
    transform: scale(1)

// Versões do celular: apps e junção no mesmo tempo, logo visível por menos tempo
@keyframes juntarCel
  0%
    opacity: 0
    transform: translate(calc(var(--xa) * 1.15), calc(var(--ya) * 1.15)) rotate(var(--r)) scale(0.8)
  3.8%, 37.6%
    opacity: 1
    transform: translate(var(--xa), var(--ya)) rotate(var(--r)) scale(1)
  52.7%, 100%
    opacity: 0
    transform: translate(0, 0) rotate(0deg) scale(0.2)

@keyframes contarCel
  0%, 37.6%
    opacity: 1
    transform: scale(1)
  51.5%, 92.5%
    opacity: 0
    transform: scale(0.2)
  100%
    opacity: 1
    transform: scale(1)

@keyframes surgirCel
  0%, 48.9%
    opacity: 0
    transform: scale(0.6)
  60.2%, 91.2%
    opacity: 1
    transform: scale(1)
  100%
    opacity: 0
    transform: scale(1.05)

@keyframes acenderCel
  0%, 46.4%
    opacity: 0
    transform: scale(0.6)
  59%, 90%
    opacity: 0.9
    transform: scale(1)
  100%
    opacity: 0
    transform: scale(1)

@media (prefers-reduced-motion: reduce)
  .apps .palco .app, .apps .palco .app .bloco, .apps .palco .centro, .apps .palco .brilho, .apps .palco .contador
    animation: none

@media screen and (max-width: 1000px)
  .apps
    padding: 30px 20px 80px 20px

    .topo
      gap: 14px

    // No celular as distâncias encolhem para caber na largura da tela e o ciclo fica mais curto (3,2 s), para dar tempo de ver rolando a página
    .palco
      height: 470px
      margin: 20px 0 0 0

      // Mesma animação, com a fase do logo "Tudo num app só" 1/3 mais curta (ciclo de 2,55 s)
      .brilho, .app, .contador, .centro
        animation-duration: 2.55s

      .brilho
        animation-name: acenderCel

      .app
        animation-name: juntarCel

      .contador
        animation-name: contarCel

      .centro
        animation-name: surgirCel

      .brilho
        width: 340px
        height: 340px
        margin: -170px 0 0 -170px

      .app
        width: 84px
        margin: -38px 0 0 -42px
        --xa: var(--xm)
        --ya: var(--ym)
        gap: 6px

        .bloco
          width: 54px
          height: 54px
          border-radius: 16px 16px 16px 16px

          svg
            width: 26px
            height: 26px

          img
            width: 32px
            height: 32px

          &.cheio img
            width: 100%
            height: 100%

          &.comlogo img
            width: 47px
            height: 47px

        .nome
          font-size: 11px

      .contador
        width: 200px
        margin: -22px 0 0 -100px

        strong
          font-size: 36px

      .centro
        width: 240px
        margin: -40px 0 0 -120px

        img
          width: 170px

    .conta
      font-size: var(--f2)
</style>

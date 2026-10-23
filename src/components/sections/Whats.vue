<template>
  <section class="whats" id="whatsapp" ref="secao">
    <div class="conteudo">
      <div class="lado">
        <div class="topo">
          <span class="selo">Integração com WhatsApp</span>
          <h2>Seu <span class="zap">WhatsApp</span> trabalhando <span class="realce">no automático</span></h2>
          <p>Parabéns no aniversário, cobrança de formulário, avisos de evolução e mensagens prontas saem sozinhos para o aluno. Você não digita nada e o aluno sente que você está sempre por perto.</p>
        </div>
      </div>

      <!-- Celular com a conversa do WhatsApp: as mensagens automáticas da MetaFit chegam e a aluna responde -->
      <div class="cena" aria-hidden="true">
        <span class="aura"></span>
        <div class="aparelho">
          <div class="tela">
            <span class="ilha"></span>
            <div class="status">
              <span class="hora">9:41</span>
              <span class="sinais">
                <svg viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
                <svg viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.6c2.2 0 4.2.8 5.7 2.2l1.4-1.5C13.2 1.5 10.7.5 8 .5S2.8 1.5.9 3.3l1.4 1.5C3.8 3.4 5.8 2.6 8 2.6zm0 3.5c1.2 0 2.4.5 3.2 1.3l1.4-1.5C11.4 4.7 9.8 4 8 4s-3.4.7-4.6 1.9l1.4 1.5c.8-.8 2-1.3 3.2-1.3zm0 3.4c-.6 0-1.1.2-1.5.6L8 11.8l1.5-1.7c-.4-.4-.9-.6-1.5-.6z" /></svg>
                <svg viewBox="0 0 27 12" fill="none"><rect x="0.5" y="0.5" width="23" height="11" rx="3.2" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" /><path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4z" fill="currentColor" opacity="0.4" /></svg>
              </span>
            </div>

            <div class="cabeca">
              <span class="voltar">
                <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2L2 10l8 8" /></svg>
                <b>12</b>
              </span>
              <span class="foto">C</span>
              <span class="contato">
                <b>Carol Mendes</b>
                <small :class="{ digitando }">{{ digitando ? 'digitando...' : 'online' }}</small>
              </span>
              <span class="acoes">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="13" height="12" rx="3" /><path d="M15.5 10.5l5-3v9l-5-3" /></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3.5h3l1.5 4-2 1.3a11 11 0 0 0 7.7 7.7l1.3-2 4 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z" /></svg>
              </span>
            </div>

            <div class="conversa">
              <div class="mensagens" :class="{ sumindo }">
                <span class="cripto">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3H9z" /></svg>
                  As mensagens são protegidas com a criptografia de ponta a ponta.
                </span>
                <span class="dia">Hoje</span>
                <TransitionGroup name="bolha" tag="div" class="lista">
                  <div v-for="msg in mostrados" :key="msg.id" class="bolha" :class="msg.lado">
                    <span v-if="msg.auto" class="auto">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>
                      {{ msg.etiqueta || 'Automático MetaFit' }}
                    </span>
                    <div v-if="msg.doc" class="doc">
                      <span class="pdf form"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M8.5 10l1.5 1.5L13 8.5M8.5 16l1.5 1.5L13 14.5M15 10h1M15 16h1" /></svg></span>
                      <span class="arquivo"><b>{{ msg.doc.nome }}</b><small>{{ msg.doc.info }}</small></span>
                    </div>
                    <p>{{ msg.texto }}<span class="espaco"></span></p>
                    <span class="meta">
                      {{ msg.hora }}
                      <svg v-if="msg.lado === 'sai'" :class="{ lido: msg.lido }" viewBox="0 0 18 11" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6l3.5 3.5L11.5 2" /><path d="M7.5 9.5L16.5 1.5" /></svg>
                    </span>
                  </div>
                </TransitionGroup>
                <!-- Fora da animação da lista: some no mesmo instante em que a resposta entra -->
                <div v-if="digitando" class="bolha entra pontos">
                  <i></i><i></i><i></i>
                </div>
              </div>
            </div>

            <div class="rodape">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
              <span class="campo">
                Mensagem
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01" /></svg>
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><circle cx="12" cy="12.5" r="3.5" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>
            </div>
            <span class="barra"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Conversa encenada no WhatsApp: as mensagens automáticas da MetaFit chegam (verde, com a etiqueta "Automático")
// e a aluna responde depois do "digitando...". O card do recurso correspondente acende ao lado. Loop enquanto a dobra está na tela
const recursos = [
  { titulo: 'Parabéns no aniversário', texto: 'Mensagem automática no dia, sem você precisar lembrar.', icone: "<path d='M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7M5 16c2 1.5 3.5 1.5 5 0s3.5-1.5 5 0 3.5 1.5 4 0M12 12V8M12 5.5c.8-1 .8-2 0-3-.8 1-.8 2 0 3z'/>" },
  { titulo: 'Cobrança de formulário', texto: 'O aluno é lembrado de responder anamnese e feedback.', icone: "<rect x='5' y='4' width='14' height='17' rx='2'/><path d='M9 4V3h6v1M8.5 10l1.5 1.5L13 8.5M8.5 16l1.5 1.5L13 14.5'/>" },
  { titulo: 'Avisos de evolução', texto: 'O resultado do mês chega direto no WhatsApp do aluno.', icone: "<path d='M4 19h16M6 15l4-4 3 3 5-6'/><path d='M15 8h3v3'/>" },
  { titulo: 'Mensagens prontas', texto: 'Modelos salvos que você envia com um toque.', icone: "<path d='M13 2L4 14h6l-1 8 9-12h-6l1-8z'/>" }
]

const roteiro = [
  { lado: 'sai', auto: true, card: 0, texto: '🎂 Feliz aniversário, Carol! Seu presente: 1 semana de treino bônus já liberada no app 🎁', hora: '09:02' },
  { lado: 'entra', texto: 'Que surpresa incrível! Obrigada 😍🙏', hora: '09:04' },
  { lado: 'sai', auto: true, card: 1, doc: { nome: 'Feedback semanal', info: 'Formulário · 6 perguntas · 2 min' }, texto: 'Oi Carol! Falta só o seu feedback da semana para eu ajustar o treino 📋', hora: '10:15' },
  { lado: 'entra', texto: 'Respondido! ✅', hora: '10:21' },
  { lado: 'sai', auto: true, card: 2, texto: '📈 Sua evolução do mês: -2,5 kg e +12% de carga no agachamento. Bora manter! 🔥', hora: '18:30' },
  { lado: 'entra', texto: 'Tô muito feliz com o resultado 😭💪', hora: '18:32' },
  { lado: 'sai', auto: true, card: 3, etiqueta: 'Mensagem pronta', texto: '📸 Lembrete: amanhã é dia de mandar as fotos de check-in no app. Qualquer dúvida é só chamar!', hora: '20:00' }
]

const secao = ref(null)
const mostrados = ref([])
const digitando = ref(false)
const sumindo = ref(false)
const ativo = ref(-1)
let relogio = 0
let passo = 0
let serie = 0
let rodando = false
let olho = null

const esperar = (ms, fn) => {
  clearTimeout(relogio)
  relogio = setTimeout(fn, ms)
}

const avancar = () => {
  if (!rodando) return
  if (passo >= roteiro.length) {
    // Fim da conversa: some tudo e recomeça
    esperar(2500, () => {
      sumindo.value = true
      esperar(450, () => {
        mostrados.value = []
        ativo.value = -1
        sumindo.value = false
        passo = 0
        esperar(500, avancar)
      })
    })
    return
  }
  const msg = roteiro[passo]
  if (msg.lado === 'entra') {
    digitando.value = true
    esperar(800, () => {
      digitando.value = false
      // A resposta chegou: as mensagens enviadas antes ficam com o check azul de lida
      mostrados.value.forEach((m) => { if (m.lado === 'sai') m.lido = true })
      mostrados.value.push({ ...msg, id: serie++ })
      passo++
      esperar(600, avancar)
    })
  } else {
    esperar(350, () => {
      mostrados.value.push({ ...msg, id: serie++, lido: false })
      ativo.value = msg.card
      passo++
      esperar(1200, avancar)
    })
  }
}

const iniciar = () => {
  if (rodando) return
  rodando = true
  avancar()
}

const parar = () => {
  rodando = false
  clearTimeout(relogio)
}

onMounted(() => {
  // Quem prefere menos movimento vê a conversa inteira parada
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    mostrados.value = roteiro.map((m) => ({ ...m, id: serie++, lido: true }))
    return
  }
  if ('IntersectionObserver' in window && secao.value) {
    olho = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? iniciar() : parar()))
    }, { threshold: 0.25 })
    olho.observe(secao.value)
  } else iniciar()
})

onBeforeUnmount(() => {
  parar()
  if (olho) olho.disconnect()
})
</script>

<style lang="sass" scoped>
.whats
  display: flex
  width: 100%
  padding: 60px 24px 120px 24px
  justify-content: center
  overflow: hidden
  background: radial-gradient(ellipse 40% 55% at 72% 50%, var(--zap-brilho), transparent 70%), var(--cor-fundo)

  .conteudo
    display: flex
    width: 100%
    max-width: 1140px
    align-items: center
    justify-content: space-between
    gap: 48px

  // ---------- Texto e recursos ----------
  .lado
    display: flex
    width: 54%
    flex-direction: column
    gap: 32px

    .topo
      display: flex
      flex-direction: column
      align-items: flex-start
      gap: 18px

      h2
        font-family: var(--bold)
        font-size: var(--f7)
        color: var(--cor-texto)
        line-height: 1.08

        .zap
          color: var(--zap-verde)

      p
        max-width: 520px
        font-family: var(--light)
        font-size: var(--f3)
        color: var(--cor-suave)
        line-height: 1.6

        &.fecho
          font-family: var(--bold)
          font-size: var(--f2)
          color: var(--cor-texto)

      // Lista curta com ícones: o item da mensagem que acabou de chegar no celular acende em verde
      .itens
        display: flex
        flex-direction: column
        gap: 10px
        list-style: none

        li
          display: flex
          align-items: center
          gap: 12px
          font-family: var(--bold)
          font-size: var(--f3)
          color: var(--cor-suave)
          transition: color 0.25s cubic-bezier(0.23, 1, 0.32, 1)

          .icone
            display: flex
            width: 36px
            min-width: 36px
            height: 36px
            align-items: center
            justify-content: center
            color: var(--zap-verde)
            background: var(--zap-brilho)
            border: 1px solid transparent
            border-radius: 10px 10px 10px 10px
            transition: color 0.25s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.25s cubic-bezier(0.23, 1, 0.32, 1), transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)

            svg
              width: 19px
              height: 19px

          &.ativo
            color: var(--cor-texto)

            .icone
              color: var(--cor-branco)
              background: var(--zap-verde-escuro)
              transform: scale(1.08)

  .recursos
    display: flex
    flex-wrap: wrap
    gap: 12px
    list-style: none

    li
      display: flex
      width: calc(50% - 6px)
      padding: 18px 18px 18px 18px
      align-items: flex-start
      gap: 14px
      background: var(--cor-carta)
      border: 1px solid var(--cor-linha)
      border-radius: var(--raio-grande) var(--raio-grande) var(--raio-grande) var(--raio-grande)
      transition: background-color 0.3s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s cubic-bezier(0.23, 1, 0.32, 1), transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)

      .icone
        display: flex
        width: 40px
        min-width: 40px
        height: 40px
        align-items: center
        justify-content: center
        color: var(--zap-verde)
        background: var(--zap-brilho)
        border-radius: 12px 12px 12px 12px
        transition: background-color 0.3s cubic-bezier(0.23, 1, 0.32, 1), color 0.3s cubic-bezier(0.23, 1, 0.32, 1)

        svg
          width: 20px
          height: 20px

      .textos
        display: flex
        flex-direction: column
        gap: 4px

        b
          font-family: var(--bold)
          font-size: var(--f2)
          color: var(--cor-texto)
          line-height: 1.25

        small
          font-family: var(--light)
          font-size: var(--f1)
          color: var(--cor-suave)
          line-height: 1.45

      // Recurso que acabou de aparecer na conversa acende em verde
      &.ativo
        background: var(--zap-brilho)
        border: 1px solid var(--zap-borda)
        transform: translateY(-2px)

        .icone
          color: var(--cor-branco)
          background: var(--zap-verde-escuro)

  // ---------- Celular ----------
  .cena
    display: flex
    position: relative
    width: 40%
    justify-content: center

    .aura
      display: block
      position: absolute
      top: 50%
      left: 50%
      width: 420px
      height: 420px
      margin: -210px 0 0 -210px
      background: radial-gradient(closest-side, var(--zap-brilho), transparent)
      pointer-events: none

    // Popup flutuando por cima da lateral do celular, trocando a cada mensagem automática
    .popup
      display: flex
      position: absolute
      top: 16%
      left: calc(50% - 290px)
      z-index: 6
      width: 250px
      padding: 12px 14px 12px 12px
      align-items: flex-start
      gap: 10px
      background: rgba(18, 18, 22, 0.92)
      border: 1px solid var(--zap-borda)
      border-radius: 16px 16px 16px 16px
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55), 0 0 30px var(--zap-brilho)
      backdrop-filter: blur(12px)
      -webkit-backdrop-filter: blur(12px)

      .icone
        display: flex
        width: 34px
        min-width: 34px
        height: 34px
        align-items: center
        justify-content: center
        color: var(--cor-branco)
        background: var(--zap-verde-escuro)
        border-radius: 10px 10px 10px 10px

        svg
          width: 18px
          height: 18px

      .textos
        display: flex
        flex-direction: column
        gap: 2px

        b
          font-family: var(--bold)
          font-size: var(--f1)
          color: var(--cor-texto)
          line-height: 1.25

        small
          font-family: var(--light)
          font-size: var(--f0)
          color: var(--cor-suave)
          line-height: 1.4

    .popup-enter-active
      transition: opacity 0.25s cubic-bezier(0.23, 1, 0.32, 1), transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)

    .popup-leave-active
      transition: opacity 0.15s ease, transform 0.15s ease

    .popup-enter-from
      opacity: 0
      transform: translateX(-12px) scale(0.96)

    .popup-leave-to
      opacity: 0
      transform: translateY(-6px) scale(0.98)

  .aparelho
    display: block
    position: relative
    width: 330px
    aspect-ratio: 9 / 19.2
    padding: 10px 10px 10px 10px
    background: linear-gradient(145deg, #3a3a40 0%, #0d0d10 45%, #26262b 100%)
    border: 1px solid var(--cor-linha-forte)
    border-radius: 52px 52px 52px 52px
    box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6), inset 0 0 0 2px rgba(0, 0, 0, 0.6)

    // Botões laterais
    &::before
      content: ''
      position: absolute
      top: 22%
      left: -4px
      width: 3px
      height: 13%
      background: #2c2c31
      border-radius: 3px 0 0 3px

    &::after
      content: ''
      position: absolute
      top: 27%
      right: -4px
      width: 3px
      height: 10%
      background: #2c2c31
      border-radius: 0 3px 3px 0

  // Tela: medidas em cqw para tudo escalar junto com o aparelho
  .tela
    display: flex
    position: relative
    width: 100%
    height: 100%
    flex-direction: column
    overflow: hidden
    font-family: var(--light)
    color: var(--zap-texto)
    background: var(--zap-fundo)
    border-radius: 42px 42px 42px 42px
    container-type: inline-size

    .ilha
      display: block
      position: absolute
      top: 3cqw
      left: 50%
      z-index: 5
      width: 31cqw
      height: 9cqw
      margin: 0 0 0 -15.5cqw
      background: var(--cor-preto)
      border-radius: 99px 99px 99px 99px

    .status
      display: flex
      width: 100%
      height: 14cqw
      min-height: 14cqw
      padding: 3.6cqw 7cqw 0 9.5cqw
      align-items: center
      justify-content: space-between
      background: var(--zap-barra)

      .hora
        font-family: var(--bold)
        font-size: 4.8cqw

      .sinais
        display: flex
        align-items: center
        gap: 1.4cqw

        svg
          display: block
          width: auto
          height: 3.4cqw

    // Topo da conversa: voltar, foto, nome com online/digitando e chamadas
    .cabeca
      display: flex
      width: 100%
      height: 15cqw
      min-height: 15cqw
      padding: 0 4cqw 0 2.6cqw
      align-items: center
      gap: 2.6cqw
      background: var(--zap-barra)
      border-bottom: 1px solid var(--zap-linha)

      .voltar
        display: flex
        align-items: center
        gap: 1cqw
        color: var(--zap-verde-escuro)

        svg
          width: 2.6cqw
          height: 4.4cqw

        b
          font-family: var(--bold)
          font-size: 4.2cqw

      .foto
        display: flex
        width: 10.5cqw
        min-width: 10.5cqw
        height: 10.5cqw
        align-items: center
        justify-content: center
        font-family: var(--bold)
        font-size: 4.6cqw
        color: var(--cor-branco)
        background: linear-gradient(150deg, #F7A3B5 0%, #E0577A 100%)
        border-radius: 50% 50% 50% 50%

      .contato
        display: flex
        width: 100%
        min-width: 0
        flex-direction: column

        b
          font-family: var(--bold)
          font-size: 4.3cqw
          line-height: 1.2
          white-space: nowrap

        small
          font-family: var(--light)
          font-size: 3.3cqw
          color: var(--zap-hora)

          &.digitando
            color: var(--zap-verde-escuro)

      .acoes
        display: flex
        align-items: center
        gap: 5cqw
        color: var(--zap-texto)

        svg
          width: 6cqw
          height: 6cqw

    // Área das mensagens com o papel de parede de desenhos do WhatsApp
    .conversa
      display: flex
      position: relative
      width: 100%
      height: calc(100% - 51cqw)
      padding: 0 3cqw 2cqw 3cqw
      flex-direction: column
      justify-content: flex-end
      overflow: hidden
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='0.06' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='14' cy='14' r='6'/%3E%3Cpath d='M40 8l4 8 8 1-6 6 2 8-8-4-8 4 2-8-6-6 8-1z'/%3E%3Cpath d='M70 12c4-6 12-2 8 4l-8 8-8-8c-4-6 4-10 8-4z'/%3E%3Cpath d='M8 48h14M15 41v14'/%3E%3Crect x='36' y='42' width='16' height='12' rx='3'/%3E%3Cpath d='M66 44l10 10M76 44L66 54'/%3E%3Cpath d='M10 76c4-6 10-6 14 0'/%3E%3Ccircle cx='46' cy='78' r='3'/%3E%3Cpath d='M64 72h14v10H64z'/%3E%3C/g%3E%3C/svg%3E")
      background-size: 30cqw 30cqw

    .mensagens
      display: flex
      flex-direction: column
      align-items: center
      gap: 1.6cqw
      transition: opacity 0.4s ease

      &.sumindo
        opacity: 0

      .cripto
        display: flex
        max-width: 88%
        margin: 3cqw 0 0 0
        padding: 1.8cqw 3cqw 1.8cqw 3cqw
        align-items: flex-start
        gap: 1.4cqw
        font-family: var(--light)
        font-size: 3cqw
        color: var(--zap-aviso-texto)
        line-height: 1.35
        text-align: center
        background: var(--zap-aviso)
        border-radius: 2cqw 2cqw 2cqw 2cqw
        box-shadow: 0 1px 0.5px var(--zap-sombra)

        svg
          width: 2.8cqw
          min-width: 2.8cqw
          height: 2.8cqw
          margin: 0.4cqw 0 0 0

      .dia
        display: block
        margin: 1cqw 0 1cqw 0
        padding: 1.2cqw 3cqw 1.2cqw 3cqw
        font-family: var(--bold)
        font-size: 3.1cqw
        color: var(--zap-aviso-texto)
        background: var(--zap-entrada)
        border-radius: 2cqw 2cqw 2cqw 2cqw
        box-shadow: 0 1px 0.5px var(--zap-sombra)

    .lista
      display: flex
      width: 100%
      flex-direction: column
      gap: 1.6cqw

    // Balões: entrada branca à esquerda, saída verde à direita, com o rabinho e a hora com os checks
    .bolha
      display: block
      position: relative
      max-width: 80%
      padding: 1.6cqw 2.4cqw 1.8cqw 2.6cqw
      background: var(--zap-entrada)
      border-radius: 2.2cqw 2.2cqw 2.2cqw 2.2cqw
      box-shadow: 0 1px 0.5px var(--zap-sombra)

      &::before
        content: ''
        position: absolute
        top: 0
        width: 0
        height: 0
        border-top: 2.4cqw solid var(--zap-entrada)

      &.entra
        align-self: flex-start
        border-radius: 0 2.2cqw 2.2cqw 2.2cqw
        transform-origin: 0 100%

        &::before
          left: -2cqw
          border-left: 2.4cqw solid transparent

      &.sai
        align-self: flex-end
        background: var(--zap-saida)
        border-radius: 2.2cqw 0 2.2cqw 2.2cqw
        transform-origin: 100% 100%

        &::before
          right: -2cqw
          border-top: 2.4cqw solid var(--zap-saida)
          border-right: 2.4cqw solid transparent

      .auto
        display: flex
        margin: 0 0 0.8cqw 0
        align-items: center
        gap: 0.8cqw
        font-family: var(--bold)
        font-size: 2.9cqw
        color: var(--zap-verde-escuro)

        svg
          width: 2.6cqw
          height: 2.6cqw

      .doc
        display: flex
        margin: 0 0 1.4cqw 0
        padding: 2.2cqw 2.4cqw 2.2cqw 2.4cqw
        align-items: center
        gap: 2.4cqw
        background: var(--zap-doc)
        border-radius: 1.6cqw 1.6cqw 1.6cqw 1.6cqw

        .pdf
          display: flex
          width: 8.5cqw
          min-width: 8.5cqw
          height: 10.5cqw
          align-items: flex-end
          justify-content: center
          padding: 0 0 1.4cqw 0
          font-family: var(--bold)
          font-size: 2.4cqw
          color: var(--cor-branco)
          background: var(--zap-pdf)
          border-radius: 1cqw 2.6cqw 1cqw 1cqw

          // Ícone do formulário (verde) no lugar do PDF
          &.form
            align-items: center
            padding: 0 0 0 0
            background: var(--zap-verde-escuro)
            border-radius: 1.6cqw 1.6cqw 1.6cqw 1.6cqw

            svg
              width: 5.6cqw
              height: 5.6cqw

        .arquivo
          display: flex
          min-width: 0
          flex-direction: column
          gap: 0.4cqw

          b
            font-family: var(--bold)
            font-size: 3.5cqw
            white-space: nowrap

          small
            font-family: var(--light)
            font-size: 2.9cqw
            color: var(--zap-hora)

      p
        font-family: var(--light)
        font-size: 3.9cqw
        color: var(--zap-texto)
        line-height: 1.35

        // Reserva o canto para a hora, como no WhatsApp
        .espaco
          display: inline-block
          width: 15cqw
          height: 1px

      .meta
        display: flex
        position: absolute
        right: 2.2cqw
        bottom: 1.3cqw
        align-items: center
        gap: 0.8cqw
        font-family: var(--light)
        font-size: 2.8cqw
        color: var(--zap-hora)

        svg
          width: 4cqw
          height: 2.6cqw
          color: var(--zap-hora)
          transition: color 0.3s ease

          &.lido
            color: var(--zap-check)

      // Três pontinhos do "digitando"
      &.pontos
        display: flex
        padding: 3cqw 3.6cqw 3cqw 3.6cqw
        gap: 1.2cqw

        i
          display: block
          width: 1.8cqw
          height: 1.8cqw
          background: var(--zap-hora)
          border-radius: 50% 50% 50% 50%
          animation: digitar 1.1s ease-in-out infinite

          &:nth-child(2)
            animation-delay: 0.15s

          &:nth-child(3)
            animation-delay: 0.3s

    // Chegada das mensagens
    .bolha-enter-active
      transition: opacity 0.22s cubic-bezier(0.23, 1, 0.32, 1), transform 0.26s cubic-bezier(0.23, 1, 0.32, 1)

    .bolha-enter-from
      opacity: 0
      transform: translateY(3cqw) scale(0.94)

    .bolha-move
      transition: transform 0.26s cubic-bezier(0.23, 1, 0.32, 1)

    .bolha-leave-active
      display: none

    // Barra de digitar
    .rodape
      display: flex
      width: 100%
      height: 14cqw
      min-height: 14cqw
      padding: 0 4cqw 0 4cqw
      align-items: center
      gap: 3.4cqw
      color: var(--zap-texto)
      background: var(--zap-barra)
      border-top: 1px solid var(--zap-linha)

      > svg
        width: 6cqw
        min-width: 6cqw
        height: 6cqw

      .campo
        display: flex
        width: 100%
        height: 8.6cqw
        padding: 0 2.6cqw 0 3.6cqw
        align-items: center
        justify-content: space-between
        font-family: var(--light)
        font-size: 3.6cqw
        color: var(--zap-hora)
        background: var(--zap-entrada)
        border: 1px solid var(--zap-linha)
        border-radius: 99px 99px 99px 99px

        svg
          width: 5cqw
          height: 5cqw
          color: var(--zap-hora)

    .barra
      display: block
      position: absolute
      bottom: 1.6cqw
      left: 50%
      width: 34cqw
      height: 1.3cqw
      margin: 0 0 0 -17cqw
      background: var(--zap-texto)
      border-radius: 99px 99px 99px 99px

@keyframes digitar
  0%, 60%, 100%
    opacity: 0.35
    transform: translateY(0)
  30%
    opacity: 1
    transform: translateY(-0.8cqw)

@media (prefers-reduced-motion: reduce)
  .whats .tela .bolha.pontos i
    animation: none

@media screen and (max-width: 1000px)
  .whats
    padding: 30px 20px 80px 20px

    .conteudo
      flex-direction: column
      gap: 44px

    .lado
      width: 100%
      gap: 24px

    // No celular a lista sai: o recurso aparece no popup em cima do aparelho
    .recursos
      display: none

    .cena
      width: 100%

      .aura
        width: 320px
        height: 320px
        margin: -160px 0 0 -160px

      .popup
        top: auto
        bottom: 3%
        left: 50%
        width: 270px
        margin: 0 0 0 -135px

    .aparelho
      width: 290px
      padding: 9px 9px 9px 9px
      border-radius: 46px 46px 46px 46px

    .tela
      border-radius: 37px 37px 37px 37px
</style>

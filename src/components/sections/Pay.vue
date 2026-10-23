<template>
  <section class="pay" id="pay">
    <div class="conteudo">
      <div class="texto">
        <span class="selo">Recebimento automático</span>
        <h2>O dinheiro do aluno cai sozinho na sua conta</h2>
        <p>O aluno paga por Pix ou cartão pelo MetaFit Pay e o valor entra no seu saldo sem você cobrar ninguém. No painel você vê o que já está pronto para saque, o que ainda vai liberar e quem pagou.</p>
        <ul>
          <li v-for="item in itens" :key="item">
            <span class="marca">
              <Icone nome="certo" />
            </span>
            <span>{{ item }}</span>
          </li>
        </ul>
        <a class="link" href="#planos">
          Automatize as cobranças da sua consultoria
          <Icone nome="seta" />
        </a>
      </div>

      <div class="cena">
        <!-- Celular: notificações empilhadas que nascem da ilha e saem para fora do aparelho -->
        <div class="celular">
          <TransitionGroup name="pilha" tag="div" class="avisos" aria-hidden="true">
            <div v-for="(item, i) in pilha" :key="item.id" class="aviso" :style="{ '--i': i, zIndex: 3 - i }">
              <span class="app">
                <Icone nome="raio" />
              </span>
              <span class="corpo">
                <span class="linha"><b>MetaFit</b><small>{{ quando[i] }}</small></span>
                <strong>Pagamento recebido</strong>
                <span class="msg">{{ pagamentos[item.p].nome }} · {{ pagamentos[item.p].produto }} · + {{ pagamentos[item.p].valor }}</span>
              </span>
            </div>
          </TransitionGroup>
          <div class="aparelho">
            <div class="tela">
              <div class="status" aria-hidden="true">
                <b>9:41</b>
                <span class="ilha"></span>
                <span class="icones">
                  <svg viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
                  <svg viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.6c2.2 0 4.2.8 5.7 2.2l1.4-1.5C13.2 1.5 10.7.5 8 .5S2.8 1.5.9 3.3l1.4 1.5C3.8 3.4 5.8 2.6 8 2.6zm0 3.5c1.2 0 2.4.5 3.2 1.3l1.4-1.5C11.4 4.7 9.8 4 8 4s-3.4.7-4.6 1.9l1.4 1.5c.8-.8 2-1.3 3.2-1.3zm0 3.4c-.6 0-1.1.2-1.5.6L8 11.8l1.5-1.7c-.4-.4-.9-.6-1.5-.6z" /></svg>
                  <svg viewBox="0 0 27 12" fill="none"><rect x="0.5" y="0.5" width="23" height="11" rx="3.2" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" /><path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4z" fill="currentColor" opacity="0.4" /></svg>
                </span>
              </div>
              <img :src="telaCelular" alt="Financeiro da MetaFit no celular com saldo disponível, saldo pendente e os pagamentos dos alunos" width="900" height="1602" loading="lazy" decoding="async" />
              <span class="barra" aria-hidden="true"></span>
            </div>
          </div>
        </div>

        <!-- Computador: janela do app com a notificação do Mac no canto -->
        <div class="computador">
          <div class="janela">
            <div class="topo" aria-hidden="true">
              <span class="bolas"><i></i><i></i><i></i></span>
              <span class="endereco">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                app.metafit.cc/financeiro
              </span>
            </div>
            <img :src="telaComputador" alt="Painel Financeiro da MetaFit no computador com saldos, botões de saque e a lista de transações dos alunos" width="1600" height="1000" loading="lazy" decoding="async" />
          </div>
          <TransitionGroup name="pilha" tag="div" class="avisos" aria-hidden="true">
            <div v-for="(item, i) in pilha" :key="item.id" class="aviso" :style="{ '--i': i, zIndex: 3 - i }">
              <span class="app">
                <Icone nome="raio" />
              </span>
              <span class="corpo">
                <span class="linha"><b>MetaFit</b><small>{{ quando[i] }}</small></span>
                <strong>Pagamento recebido</strong>
                <span class="msg">{{ pagamentos[item.p].nome }} comprou {{ pagamentos[item.p].produto }} · + {{ pagamentos[item.p].valor }}</span>
              </span>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icone from '../Icone.vue'

// Telas reais do Financeiro (projeto Metafit Desktop no Claude Design), em WebP leve na biblioteca da UnicPages:
// celular = "Financeiro - Imagem vertical (site)" na proporção 9:16; computador = página financeiro.html inteira
const cdn = 'https://unicpages-assets.nyc3.cdn.digitaloceanspaces.com/imagens/'
const telaCelular = cdn + 'ighi5rz5oj0q2bhb-claro-financeiro-celular.webp'
const telaComputador = cdn + 'n4j9ck7zhgwx58t5-claro-financeiro-desktop.webp'
// Três alunos comprando produtos diferentes: a venda nova entra ao mesmo tempo em que a anterior sai
const pagamentos = [
  { nome: 'Julia Buckoski', produto: 'Plano Trimestral', valor: 'R$ 549,00' },
  { nome: 'Ana Paula', produto: 'Plano Hipertrofia 3M', valor: 'R$ 297,00' },
  { nome: 'Marco Antônio', produto: 'Consultoria Mensal', valor: 'R$ 189,00' }
]
const quando = ['agora', 'há 1 min', 'há 3 min']
const pilha = ref([{ id: 0, p: 0 }])
let proximo = 1
let serie = 1
let relogio = 0

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  relogio = setInterval(() => {
    pilha.value = [{ id: serie++, p: proximo }]
    proximo = (proximo + 1) % pagamentos.length
  }, 2200)
})

onBeforeUnmount(() => clearInterval(relogio))

const itens = [
  'Cobrança recorrente todo mês, sem você lembrar ninguém',
  'Saldo disponível e pendente atualizados na hora',
  'Pagamentos manuais registrados no mesmo painel'
]
</script>

<style lang="sass" scoped>
.pay
  display: flex
  width: 100%
  padding: 60px 24px 120px 24px
  justify-content: center
  overflow: hidden
  background: radial-gradient(ellipse 45% 55% at 74% 50%, rgba(209, 22, 31, 0.2), transparent 70%), var(--cor-fundo)

  .conteudo
    display: flex
    width: 100%
    max-width: 1180px
    align-items: center
    justify-content: space-between
    gap: 56px

  .texto
    display: flex
    width: 40%
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
    width: 56%
    justify-content: center

  // Notificações no estilo do sistema (vidro claro), empilhadas: a da frente inteira, as de trás menores e um pouco abaixo
  .avisos
    display: block
    position: absolute
    z-index: 5
    height: 110px

  .aviso
    display: flex
    position: absolute
    top: 0
    left: 0
    width: 100%
    align-items: center
    gap: 12px
    transform: translateY(calc(var(--i) * 19px)) scale(calc(1 - var(--i) * 0.05))
    transform-origin: 50% 0
    opacity: calc(1 - var(--i) * 0.18)
    transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.12), opacity 0.5s ease

    // Nos avisos de trás só aparece a borda do cartão, sem o texto vazando por baixo do da frente
    > span
      opacity: calc(1 - min(var(--i), 1))
      transition: opacity 0.4s ease
    background: rgba(246, 246, 248, 0.97)
    border: 1px solid rgba(255, 255, 255, 0.55)
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.55), 0 4px 10px rgba(0, 0, 0, 0.35)
    backdrop-filter: blur(16px) saturate(1.6)

    // A que sai fica atrás e some rápido; a que chega vem por cima, nítida
    &.pilha-leave-active
      z-index: 0 !important
      transition: opacity 0.22s ease, transform 0.3s ease
    -webkit-backdrop-filter: blur(16px) saturate(1.6)

    .app
      display: flex
      width: 38px
      min-width: 38px
      height: 38px
      align-items: center
      justify-content: center
      color: var(--cor-branco)
      background: var(--cor-destaque)
      border-radius: 10px 10px 10px 10px

      .icone
        width: 20px
        height: 20px

    .corpo
      display: flex
      width: 100%
      min-width: 0
      flex-direction: column
      gap: 1px

      .linha
        display: flex
        align-items: baseline
        justify-content: space-between
        font-family: var(--light)
        font-size: var(--f0)
        color: var(--cor-aviso-suave)

        b
          font-family: var(--bold)
          color: var(--cor-aviso-texto)

      strong
        font-family: var(--bold)
        font-size: var(--f1)
        color: var(--cor-aviso-texto)
        line-height: 1.25

      .msg
        font-family: var(--light)
        font-size: var(--f0)
        color: var(--cor-aviso-suave)
        line-height: 1.3

  // ---------- Computador ----------
  .celular
    display: none

  .computador
    display: block
    position: relative
    width: 100%
    max-width: 660px

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

      img
        display: block
        width: 100%
        height: auto

    // Banners do Mac empilhados no canto de cima: cada venda nova entra pela direita
    .avisos
      top: -34px
      right: -30px
      width: 330px

    .aviso
      padding: 12px 14px 12px 12px
      border-radius: 16px 16px 16px 16px

      &.pilha-enter-from
        opacity: 0
        transform: translateX(70px) scale(0.92)

      &.pilha-leave-to
        opacity: 0
        transform: translateY(34px) scale(0.94)

@media screen and (max-width: 1000px)
  .pay
    padding: 20px 20px 90px 20px

    .conteudo
      flex-direction: column
      gap: 44px

    .texto
      width: 100%
      gap: 18px

    .cena
      width: 100%

    .computador
      display: none

    // ---------- Celular ----------
    .celular
      display: flex
      position: relative
      width: 100%
      flex-direction: column
      align-items: center

      // Pilha mais larga que o aparelho, por cima do topo da tela: parece que as vendas estão saindo do celular
      .avisos
        top: 52px
        left: 50%
        width: min(350px, 100%)
        margin: 0 0 0 calc(min(350px, 100%) / -2)

      .aviso
        padding: 13px 15px 13px 13px
        border-radius: 22px 22px 22px 22px
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.55), 0 4px 10px rgba(0, 0, 0, 0.35)

        // Nasce pequeno da ilha do aparelho e cresce para fora
        &.pilha-enter-from
          opacity: 0
          transform: translateY(-40px) scale(0.28)

        &.pilha-leave-to
          opacity: 0
          transform: translateY(30px) scale(0.94)

      .aparelho
        display: block
        position: relative
        width: min(300px, 84%)
        padding: 6px 6px 6px 6px
        background: linear-gradient(145deg, #3a3a40 0%, #0d0d10 45%, #26262b 100%)
        border: 1px solid rgba(255, 255, 255, 0.14)
        border-radius: 40px 40px 40px 40px
        box-shadow: 0 0 90px var(--cor-brilho), 0 24px 60px rgba(0, 0, 0, 0.5)

        &::before
          content: ''
          position: absolute
          top: 20%
          left: -4px
          width: 3px
          height: 14%
          background: #2c2c31
          border-radius: 3px 0 0 3px

        &::after
          content: ''
          position: absolute
          top: 25%
          right: -4px
          width: 3px
          height: 10%
          background: #2c2c31
          border-radius: 0 3px 3px 0

      .tela
        display: block
        position: relative
        width: 100%
        overflow: hidden
        background: #F6F8FB
        border-radius: 34px 34px 34px 34px

        .status
          display: flex
          position: relative
          height: 40px
          padding: 0 20px 0 26px
          align-items: center
          justify-content: space-between
          color: #0D0E13

          b
            font-family: var(--bold)
            font-size: 13px

          .ilha
            display: block
            position: absolute
            top: 9px
            left: 50%
            width: 84px
            height: 24px
            margin: 0 0 0 -42px
            background: var(--cor-preto)
            border-radius: 99px 99px 99px 99px

          .icones
            display: flex
            align-items: center
            gap: 4px

            svg
              display: block
              width: auto
              height: 10px

        img
          display: block
          width: 100%
          height: auto

        .barra
          display: block
          position: absolute
          bottom: 7px
          left: 50%
          width: 96px
          height: 4px
          margin: 0 0 0 -48px
          background: #0D0E13
          border-radius: 99px 99px 99px 99px

</style>

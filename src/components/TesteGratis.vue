<template>
  <div class="cadastro">
    <div class="cena" aria-hidden="true">
      <span class="brilho"></span>
      <span class="grao"></span>
    </div>

    <a class="voltar" href="/" aria-label="Voltar para a página inicial">
      <Icone nome="seta" />
      <span>Voltar</span>
    </a>

    <main class="caixa">
      <a class="marca" href="/" aria-label="MetaFit, página inicial">
        <img :src="logo" :data-reserva="logoReserva" alt="MetaFit" width="168" height="49" onerror="if(this.dataset.reserva){this.src=this.dataset.reserva;this.removeAttribute('data-reserva')}" />
      </a>

      <div class="titulo">
        <h1>Aproveite a avaliação gratuita</h1>
        <p>Ganhe <strong>10 dias grátis</strong> para testar a plataforma, sem compromisso.</p>
      </div>

      <form class="formulario" novalidate @submit.prevent="enviar">
        <label class="campo">
          <span class="rotulo">Nome completo</span>
          <input v-model.trim="nome" type="text" name="nome" autocomplete="name" placeholder="Digite seu nome completo" :class="{ erro: tentou && !nomeOk }" />
          <small v-if="tentou && !nomeOk" class="aviso">Informe seu nome e sobrenome.</small>
        </label>

        <label class="campo">
          <span class="rotulo">E-mail</span>
          <input v-model.trim="email" type="email" name="email" autocomplete="email" inputmode="email" placeholder="seu@email.com" :class="{ erro: tentou && !emailOk }" />
          <small v-if="tentou && !emailOk" class="aviso">Informe um e-mail válido.</small>
        </label>

        <label class="campo">
          <span class="rotulo">WhatsApp</span>
          <span class="telefone" :class="{ erro: tentou && !telefoneOk }">
            <span class="pais" aria-hidden="true">
              <svg viewBox="0 0 28 20" width="28" height="20">
                <rect width="28" height="20" rx="3" fill="#009C3B" />
                <path d="M14 3 L25 10 L14 17 L3 10 Z" fill="#FFDF00" />
                <circle cx="14" cy="10" r="4.2" fill="#002776" />
              </svg>
              <span class="ddi">+55</span>
            </span>
            <input :value="telefone" type="tel" name="whatsapp" autocomplete="tel-national" inputmode="numeric" placeholder="(11) 99999-9999" @input="mascarar" />
          </span>
          <small v-if="tentou && !telefoneOk" class="aviso">Informe o WhatsApp com DDD.</small>
        </label>

        <button class="botao enviar" type="submit">Criar minha conta na MetaFit</button>
      </form>

      <p class="login">Já tem uma conta? <a href="https://app.metafit.cc/login">Fazer login</a></p>

      <p class="termos">Ao criar uma conta, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>.</p>

      <ul class="selos">
        <li v-for="item in selos" :key="item">
          <Icone nome="certo" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Icone from './Icone.vue'

// Página de cadastro do teste grátis (botões "Teste grátis" das landing pages apontam para cá)
// Por enquanto só o visual: o envio valida os campos e ainda não manda os dados para nenhum lugar.
// Para ligar ao app, troque o conteúdo de enviar() pela chamada de criação de conta.
const logo = '/images/logo.svg'
const logoReserva = '/images/logo.svg'


const nome = ref('')
const email = ref('')
const telefone = ref('')
const tentou = ref(false)

const selos = ['10 dias grátis', 'Sem cartão de crédito', 'Cancele quando quiser']

const nomeOk = computed(() => nome.value.split(' ').filter(Boolean).length >= 2)
const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value))
const telefoneOk = computed(() => telefone.value.replace(/\D/g, '').length >= 10)

// Formata o número enquanto digita: (11) 99999-9999
const mascarar = (ev) => {
  const d = ev.target.value.replace(/\D/g, '').slice(0, 11)
  let t = d
  if (d.length > 2) t = '(' + d.slice(0, 2) + ') ' + d.slice(2)
  else if (d.length > 0) t = '(' + d
  if (d.length > 6) t = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(d.length - 4)
  telefone.value = t
  ev.target.value = t
}

// Rastreio do formulário: início (primeiro campo tocado), tentativa com erro e envio válido (lead)
let comecou = false
const avisar = (dados) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(dados)
}
onMounted(() => {
  document.querySelector('.formulario')?.addEventListener('focusin', () => {
    if (comecou) return
    comecou = true
    avisar({ event: 'formulario_inicio', formulario: 'teste_gratis' })
  })
})

const enviar = () => {
  tentou.value = true
  if (!nomeOk.value || !emailOk.value || !telefoneOk.value) {
    avisar({ event: 'formulario_erro', formulario: 'teste_gratis' })
    return
  }
  avisar({ event: 'formulario_envio', formulario: 'teste_gratis' })
  // Ponto de integração: enviar { nome, email, whatsapp: '+55' + só dígitos } para a criação de conta do app
}
</script>

<style lang="sass" scoped>
.cadastro
  display: flex
  position: relative
  width: 100%
  min-height: 100dvh
  padding: 64px 20px 48px 20px
  justify-content: center
  overflow: hidden
  isolation: isolate
  background: var(--cor-fundo)

  // Fumaça vermelha no topo, no lugar do degradê azul da referência
  .cena
    display: block
    position: absolute
    top: 0
    left: 0
    z-index: 0
    width: 100%
    height: 100%
    pointer-events: none

    .brilho
      display: block
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 520px
      background: radial-gradient(ellipse 60% 70% at 50% 0%, var(--cor-fumaca), transparent 70%), linear-gradient(180deg, rgba(120, 0, 0, 0.35) 0%, transparent 100%)

    .grao
      display: block
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")
      background-size: 160px 160px
      opacity: 0.06

  .voltar
    display: flex
    position: absolute
    top: 22px
    left: 24px
    z-index: 2
    padding: 8px 14px 8px 10px
    align-items: center
    gap: 6px
    font-family: var(--light)
    font-size: var(--f1)
    color: var(--cor-suave)
    background: var(--cor-vidro)
    border: 1px solid var(--cor-linha)
    border-radius: var(--raio-total) var(--raio-total) var(--raio-total) var(--raio-total)
    transition: all 0.3s

    .icone
      width: 16px
      height: 16px
      transform: rotate(180deg)

    &:hover
      color: var(--cor-texto)
      border: 1px solid var(--cor-linha-forte)

  .caixa
    display: flex
    position: relative
    z-index: 1
    width: 100%
    max-width: 460px
    flex-direction: column
    align-items: center
    gap: 22px

  .marca
    display: block
    margin: 40px 0 70px 0

    img
      width: 168px
      height: auto
      filter: drop-shadow(0 10px 30px rgba(209, 22, 31, 0.45))

  .titulo
    display: flex
    flex-direction: column
    align-items: center
    gap: 10px
    text-align: center

    h1
      font-family: var(--bold)
      font-size: var(--f6)
      color: var(--cor-texto)
      line-height: 1.15

    p
      max-width: 380px
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-suave)
      line-height: 1.5

      strong
        color: var(--cor-texto)

  .formulario
    display: flex
    width: 100%
    margin: 10px 0 0 0
    flex-direction: column
    gap: 18px

  .campo
    display: flex
    width: 100%
    flex-direction: column
    gap: 8px

    .rotulo
      padding: 0 0 0 4px
      font-family: var(--bold)
      font-size: var(--f1)
      color: var(--cor-texto)

    input
      width: 100%
      height: 54px
      padding: 0 18px 0 18px
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-texto)
      background: var(--cor-vidro)
      border: 1px solid var(--cor-linha-forte)
      border-radius: var(--raio-medio) var(--raio-medio) var(--raio-medio) var(--raio-medio)
      outline: none
      transition: all 0.3s

      &::placeholder
        color: var(--cor-fraca)

      &:focus
        background: var(--cor-vidro-destaque)
        border: 1px solid var(--cor-linha-destaque)
        box-shadow: 0 0 0 4px rgba(209, 22, 31, 0.12)

      &.erro
        border: 1px solid var(--cor-destaque-viva)

    .telefone
      display: flex
      width: 100%
      height: 54px
      align-items: center
      background: var(--cor-vidro)
      border: 1px solid var(--cor-linha-forte)
      border-radius: var(--raio-medio) var(--raio-medio) var(--raio-medio) var(--raio-medio)
      transition: all 0.3s

      &:focus-within
        background: var(--cor-vidro-destaque)
        border: 1px solid var(--cor-linha-destaque)
        box-shadow: 0 0 0 4px rgba(209, 22, 31, 0.12)

      &.erro
        border: 1px solid var(--cor-destaque-viva)

      .pais
        display: flex
        height: 100%
        padding: 0 12px 0 16px
        align-items: center
        gap: 8px
        border-right: 1px solid var(--cor-linha)

        svg
          display: block
          width: 26px
          height: auto

        .ddi
          font-family: var(--light)
          font-size: var(--f2)
          color: var(--cor-texto)

      input
        height: 100%
        padding: 0 16px 0 12px
        background: transparent
        border: none
        border-radius: 0 0 0 0

        &:focus
          background: transparent
          border: none
          box-shadow: none

    .aviso
      padding: 0 0 0 4px
      font-family: var(--light)
      font-size: var(--f0)
      color: var(--cor-destaque-viva)

  .enviar
    width: 100%
    min-height: 56px
    margin: 8px 0 0 0
    font-size: var(--f3)

  .login
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-suave)
    text-align: center

    a
      font-family: var(--bold)
      color: var(--cor-texto)

      &:hover
        color: var(--cor-destaque-viva)

  .termos
    max-width: 400px
    font-family: var(--light)
    font-size: var(--f1)
    color: var(--cor-fraca)
    line-height: 1.6
    text-align: center

    a
      color: var(--cor-suave)
      text-decoration: underline

      &:hover
        color: var(--cor-texto)

  .selos
    display: flex
    margin: 6px 0 0 0
    flex-wrap: wrap
    justify-content: center
    gap: 8px 18px
    list-style: none

    li
      display: flex
      align-items: center
      gap: 6px
      font-family: var(--light)
      font-size: var(--f0)
      color: var(--cor-suave)

      .icone
        width: 14px
        height: 14px
        color: var(--cor-destaque-viva)

@media screen and (max-width: 1000px)
  .cadastro
    padding: 56px 18px 40px 18px

    .voltar
      top: 16px
      left: 16px

    .marca
      margin: 30px 0 46px 0

      img
        width: 140px

    .titulo
      h1
        font-size: var(--f5)
</style>

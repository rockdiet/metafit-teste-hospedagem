<template>
  <header class="menu">
    <div class="barra">
      <a class="marca" href="#topo" aria-label="MetaFit, voltar ao topo">
        <img :src="logo" :data-reserva="logoReserva" alt="MetaFit" width="95" height="28" onerror="if(this.dataset.reserva){this.src=this.dataset.reserva;this.removeAttribute('data-reserva')}" />
      </a>
      <nav class="links" aria-label="Seções da página">
        <a href="#recursos">Recursos</a>
        <a href="#app">O app</a>
        <a href="#planos">Planos</a>
        <a href="#faq">Dúvidas</a>
      </nav>
      <div class="acoes">
        <a class="entrar" href="https://app.metafit.cc/login">Entrar</a>
        <a class="botao" href="/teste-gratis">Teste grátis</a>
      </div>
    </div>
  </header>
</template>

<script setup>
// Caminho como variável: o Vite não tenta resolver o arquivo na compilação; se ele ainda não existir, o onerror troca pela cópia do site atual
const logo = '/images/logo.svg'
const logoReserva = 'https://metafit.cc/images/logo.svg'
</script>

<style lang="sass" scoped>
.menu
  display: flex
  position: fixed
  top: 16px
  left: 0
  z-index: 50
  width: 100%
  padding: 0 20px 0 20px
  justify-content: center
  pointer-events: none

  .barra
    display: flex
    width: 100%
    max-width: 880px
    padding: 8px 8px 8px 22px
    align-items: center
    justify-content: space-between
    gap: 20px
    background: var(--cor-barra)
    border: 1px solid var(--cor-linha-forte)
    border-radius: var(--raio-total) var(--raio-total) var(--raio-total) var(--raio-total)
    backdrop-filter: blur(18px)
    -webkit-backdrop-filter: blur(18px)
    pointer-events: auto

  .marca
    display: flex
    align-items: center

    img
      width: auto
      height: 28px

  .links
    display: flex
    align-items: center
    gap: 30px

    a
      font-family: var(--light)
      font-size: var(--f1)
      color: var(--cor-suave)
      transition: all 0.3s

      &:hover
        color: var(--cor-texto)

  .acoes
    display: flex
    align-items: center
    gap: 6px

    .entrar
      padding: 10px 16px 10px 16px
      font-family: var(--bold)
      font-size: var(--f1)
      color: var(--cor-texto)
      transition: all 0.3s

      &:hover
        color: var(--cor-destaque-viva)

    .botao
      min-height: 42px
      padding: 8px 20px 8px 20px
      font-size: var(--f1)
      border-radius: var(--raio-total) var(--raio-total) var(--raio-total) var(--raio-total)

@media screen and (max-width: 1000px)
  .menu
    top: 10px
    padding: 0 12px 0 12px

    .barra
      padding: 6px 6px 6px 16px
      gap: 10px

    .marca
      img
        height: 24px

    .links
      display: none

    .acoes
      .entrar
        padding: 10px 10px 10px 10px

      .botao
        padding: 8px 16px 8px 16px
</style>

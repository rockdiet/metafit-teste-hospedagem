<template>
  <footer class="rodape">
    <div class="conteudo">
      <div class="marca">
        <img :src="logo" :data-reserva="logoReserva" alt="MetaFit" width="103" height="30" loading="lazy" onerror="if(this.dataset.reserva){this.src=this.dataset.reserva;this.removeAttribute('data-reserva')}" />
        <p>Treinos, dietas, gestão de alunos, cobrança automática e controle financeiro em um só lugar.</p>
        <div class="redes">
          <a href="https://www.instagram.com/metafit.cc" target="_blank" rel="noopener" aria-label="Instagram da MetaFit">
            <Icone nome="instagram" />
          </a>
          <a href="https://www.tiktok.com/@metafit.cc" target="_blank" rel="noopener" aria-label="TikTok da MetaFit">
            <Icone nome="tiktok" />
          </a>
        </div>
      </div>
      <nav class="coluna" aria-label="Menu do rodapé">
        <span class="titulo">Menu</span>
        <a href="#recursos">Recursos</a>
        <a href="#app">O app</a>
        <a href="#planos">Planos</a>
        <a href="#faq">Dúvidas</a>
      </nav>
      <div class="coluna">
        <span class="titulo">Acesso</span>
        <a href="https://app.metafit.cc/login">Entrar na plataforma</a>
        <a href="/teste-gratis">Testar grátis por 10 dias</a>
      </div>
      <div class="coluna">
        <span class="titulo">Fale conosco</span>
        <!-- Os marcadores email_off avisam a Cloudflare para não embaralhar este e-mail (senão ela injeta um script a mais na página) -->
        <span class="marca" v-html="'<!--email_off-->'"></span>
        <a href="mailto:contato@metafit.cc">contato@metafit.cc</a>
        <span class="marca" v-html="'<!--/email_off-->'"></span>
        <a href="https://wa.me/5512981761453" target="_blank" rel="noopener">WhatsApp: +55 12 98176-1453</a>
        <div class="empresa">
          <span>METAFIT NUTRIÇÃO E EDUCAÇÃO FÍSICA LTDA</span>
          <span>CNPJ: 39.695.851/0001-31</span>
          <span>São José dos Campos, São Paulo</span>
        </div>
      </div>
    </div>
    <div class="base">
      <span>© 2026 MetaFit. Todos os direitos reservados.</span>
    </div>
  </footer>
</template>

<script setup>
import Icone from '../Icone.vue'

// Caminho como variável: o Vite não tenta resolver o arquivo na compilação; se ele ainda não existir, o onerror troca pela cópia do site atual
const logo = '/images/logo.svg'
const logoReserva = '/images/logo.svg'
</script>

<style lang="sass" scoped>
.rodape
  display: flex
  width: 100%
  padding: 72px 24px 36px 24px
  flex-direction: column
  align-items: center
  gap: 56px
  background: var(--cor-fundo)
  border-top: 1px solid var(--cor-linha-destaque)

  .conteudo
    display: flex
    width: 100%
    max-width: 1200px
    flex-wrap: wrap
    align-items: flex-start
    justify-content: space-between

  .marca
    display: flex
    width: 30%
    flex-direction: column
    align-items: flex-start
    gap: 20px

    img
      width: auto
      height: 30px

    p
      max-width: 320px
      font-family: var(--light)
      font-size: var(--f1)
      color: var(--cor-suave)
      line-height: 1.6

    .redes
      display: flex
      align-items: center
      gap: 10px

      a
        display: flex
        width: 44px
        height: 44px
        align-items: center
        justify-content: center
        color: var(--cor-suave)
        border: 1px solid var(--cor-linha)
        border-radius: 50% 50% 50% 50%
        transition: all 0.3s

        &:hover
          color: var(--cor-destaque-viva)
          border: 1px solid var(--cor-linha-destaque)

  .coluna
    display: flex
    flex-direction: column
    align-items: flex-start
    gap: 14px

    .marca
      display: contents

    .titulo
      margin: 0 0 6px 0
      font-family: var(--bold)
      font-size: var(--f2)
      color: var(--cor-texto)

    a
      font-family: var(--light)
      font-size: var(--f1)
      color: var(--cor-suave)
      transition: all 0.3s

      &:hover
        color: var(--cor-texto)

    .empresa
      display: flex
      margin: 10px 0 0 0
      flex-direction: column
      gap: 6px

      span
        font-family: var(--light)
        font-size: var(--f1)
        color: var(--cor-fraca)
        line-height: 1.5

  .base
    display: flex
    width: 100%
    max-width: 1200px
    padding: 24px 0 0 0
    border-top: 1px solid var(--cor-linha)

    span
      font-family: var(--light)
      font-size: var(--f0)
      color: var(--cor-fraca)

@media screen and (max-width: 1000px)
  .rodape
    padding: 56px 20px 30px 20px
    gap: 40px

    .conteudo
      flex-direction: column
      gap: 38px

    .marca
      width: 100%
</style>

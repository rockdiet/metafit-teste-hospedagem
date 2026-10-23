<template>
  <section class="final" id="final">
    <div class="caixa">
      <span class="brilho" aria-hidden="true"></span>
      <span class="marca" aria-hidden="true">
        <Icone nome="raio" />
      </span>
      <span class="selo">Bora?</span>
      <h2>Coloque sua consultoria no <span class="realce">automático</span></h2>
      <p>Teste por 10 dias com todas as ferramentas desbloqueadas. Sem fidelidade e sem multa: você cancela quando quiser, direto pelo painel.</p>
      <div class="acoes">
        <a class="botao" href="/teste-gratis">Testar grátis por 10 dias</a>
        <a class="botao vidro" href="https://wa.me/5512981761453" target="_blank" rel="noopener">Falar no WhatsApp</a>
      </div>
      <ul class="garantias">
        <li v-for="item in garantias" :key="item">
          <Icone nome="certo" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import Icone from '../Icone.vue'

const garantias = ['10 dias grátis', 'Sem fidelidade', 'Cancele pelo painel']
</script>

<style lang="sass" scoped>
.final
  display: flex
  width: 100%
  padding: 40px 24px 120px 24px
  justify-content: center
  background: var(--cor-fundo)

  .caixa
    display: flex
    position: relative
    width: 100%
    max-width: 1100px
    padding: 90px 40px 80px 40px
    flex-direction: column
    align-items: center
    gap: 22px
    overflow: hidden
    text-align: center
    background: radial-gradient(ellipse 60% 60% at 50% 0%, var(--cor-fumaca-fraca), transparent 70%), var(--cor-fundo-alt)
    border: 1px solid var(--cor-linha-forte)
    border-radius: var(--raio-aparelho) var(--raio-aparelho) var(--raio-aparelho) var(--raio-aparelho)

    // Brilho que respira atrás do texto (só transform e opacity)
    .brilho
      display: block
      position: absolute
      top: -45%
      left: 15%
      width: 70%
      height: 110%
      border-radius: 50% 50% 50% 50%
      background: radial-gradient(ellipse at center, var(--cor-fumaca) 0%, var(--cor-fumaca-fraca) 40%, transparent 68%)
      animation: respirar 10s ease-in-out infinite
      pointer-events: none
      will-change: transform, opacity

    .marca
      position: absolute
      right: -40px
      bottom: -70px
      color: var(--cor-destaque)
      opacity: 0.16

      .icone
        width: 320px
        height: 320px

    .selo
      position: relative

    h2
      position: relative
      max-width: 720px
      font-family: var(--bold)
      font-size: var(--f7)
      color: var(--cor-texto)
      line-height: 1.08

    p
      position: relative
      max-width: 600px
      font-family: var(--light)
      font-size: var(--f3)
      color: var(--cor-suave)
      line-height: 1.6

    .acoes
      display: flex
      position: relative
      margin: 8px 0 0 0
      flex-wrap: wrap
      align-items: center
      justify-content: center
      gap: 14px

    .garantias
      display: flex
      position: relative
      margin: 8px 0 0 0
      flex-wrap: wrap
      justify-content: center
      gap: 10px 26px
      list-style: none

      li
        display: flex
        align-items: center
        gap: 8px
        font-family: var(--light)
        font-size: var(--f1)
        color: var(--cor-suave)

        .icone
          width: 16px
          height: 16px
          color: var(--cor-destaque-viva)

@keyframes respirar
  0%, 100%
    opacity: 0.6
    transform: translate3d(-6%, 0, 0) scale(1)
  50%
    opacity: 1
    transform: translate3d(6%, 4%, 0) scale(1.12)

@media screen and (max-width: 1000px)
  .final
    padding: 20px 20px 80px 20px

    .caixa
      padding: 56px 22px 48px 22px
      gap: 18px
      border-radius: var(--raio-grande) var(--raio-grande) var(--raio-grande) var(--raio-grande)

      .marca
        .icone
          width: 220px
          height: 220px

      .acoes
        width: 100%
        flex-direction: column

        .botao
          width: 100%
</style>

<template>
  <section class="perdas" id="perdas">
    <div class="cabecalho">
      <span class="selo">Dinheiro na mesa</span>
      <h2>Quanto o financeiro bagunçado <span class="realce">te custa por mês?</span></h2>
      <p>Pix que o aluno “esqueceu”, plano que venceu e ninguém cobrou, hora perdida conferindo comprovante no WhatsApp. Coloque os seus números e veja o tamanho do vazamento.</p>
    </div>

    <div class="conteudo">
      <!-- Calculadora: o treinador mexe nos números e vê o prejuízo crescer -->
      <div class="calculo">
        <div class="chamada">
          <span class="mao" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12h12M16 8l4 4-4 4M8 12H4M8 8l-4 4 4 4" /></svg></span>
          <span class="textos"><b>Arraste e veja quanto você perde</b><small>Coloque o número de alunos e o valor que você cobra</small></span>
        </div>
        <label class="campo">
          <span class="rotulo">Alunos ativos<strong>{{ alunos }}</strong></span>
          <input v-model.number="alunos" type="range" min="5" max="400" step="1" aria-label="Quantidade de alunos ativos" />
        </label>
        <label class="campo">
          <span class="rotulo">Mensalidade média<strong>{{ real(valor) }}</strong></span>
          <input v-model.number="valor" type="range" min="80" max="800" step="10" aria-label="Valor médio da mensalidade" />
        </label>

        <ul class="vazamentos">
          <li>
            <span class="gota logo"><img :src="logoPix" alt="" width="160" height="160" loading="lazy" decoding="async" /></span>
            <span class="descricao"><b>Atraso e calote</b><small>{{ atrasados }} {{ atrasados === 1 ? 'aluno atrasa ou some' : 'alunos atrasam ou somem' }} sem pagar</small></span>
            <span class="valor">-{{ real(atraso) }}</span>
          </li>
          <li>
            <span class="gota erro"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><defs><linearGradient id="perdas-x" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF5A4F" /><stop offset="1" stop-color="#D1161F" /></linearGradient></defs><path d="M5 5l14 14M19 5L5 19" stroke="url(#perdas-x)" stroke-width="5" /></svg></span>
            <span class="descricao"><b>Renovação esquecida</b><small>{{ perdidos }} {{ perdidos === 1 ? 'plano vence' : 'planos vencem' }} e ninguém lembra de renovar</small></span>
            <span class="valor">-{{ real(renovacao) }}</span>
          </li>
          <li>
            <span class="gota logo"><img :src="logoWhatsapp" alt="" width="160" height="160" loading="lazy" decoding="async" /></span>
            <span class="descricao"><b>Cobrando no WhatsApp</b><small>Conferindo Pix e mandando lembrete</small></span>
            <span class="valor tempo">{{ horas }}h/mês</span>
          </li>
        </ul>

        <div class="total">
          <span class="titulo">Saindo do seu bolso</span>
          <strong class="numero">{{ real(mostrado) }}<small>/mês</small></strong>
          <span class="ano">São <b>{{ real(anual) }}</b> por ano que você já trabalhou para ganhar e não recebeu.</span>
        </div>

        <p class="premissa">Estimativa: 1 em cada 10 alunos atrasa ou some sem pagar e 1 em cada 20 não renova porque ninguém cobrou. No WhatsApp são uns 15 min por aluno entre lembrete, conferir Pix, cobrar atrasado e renovar, mais 1h para fechar o mês. Com a MetaFit a cobrança é recorrente e o lembrete sai sozinho.</p>
      </div>

      <!-- Sinais: o treinador marca o que acontece com ele e se reconhece -->
      <div class="sinais">
        <h3>Quantas dessas já aconteceram com você?</h3>
        <p class="dica">Toque nas que você já viveu</p>
        <ul :data-nivel="quantos">
          <li v-for="(sinal, k) in sinais" :key="sinal">
            <button type="button" class="sinal" :class="{ marcado: marcados[k], convite: k === 0 && quantos === 0 }" :aria-pressed="marcados[k] ? 'true' : 'false'" @click="marcados[k] = !marcados[k]">
              <span class="caixa" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </span>
              <span>{{ sinal }}</span>
            </button>
          </li>
        </ul>
        <div class="veredito" :data-nivel="quantos" aria-live="polite">
          <div class="linha">
            <span class="contagem">{{ quantos }}/5</span>
            <span class="textos"><small class="grau">{{ grau }}</small><b>{{ veredito }}</b></span>
          </div>
          <div class="termometro" aria-hidden="true">
            <i v-for="n in 5" :key="n" :class="{ cheio: n <= quantos }" :style="{ '--n': n }"></i>
          </div>
        </div>
        <a class="botao" :class="{ urgente: quantos >= 3 }" href="/teste-gratis">Quero parar de perder dinheiro</a>
        <span class="nota">10 dias grátis, cancele quando quiser.</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, watch } from 'vue'

// Dobra financeira: calculadora do quanto o treinador perde por mês com atraso, calote e renovação esquecida,
// mais uma lista de sinais para ele marcar o que já aconteceu. Percentuais são estimativa e aparecem escritos na tela
// Logos enviados pelo Maykon: Pix (embutido, 3 KB) e o mesmo WhatsApp da dobra dos apps
const logoWhatsapp = 'https://unicpages-assets.nyc3.cdn.digitaloceanspaces.com/imagens/9d7p241awbgvb7re-app-whatsapp.webp'
const logoPix = 'data:image/webp;base64,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'
const alunos = ref(40)
const valor = ref(250)

const atrasados = computed(() => Math.max(1, Math.round(alunos.value * 0.1)))
const perdidos = computed(() => Math.max(1, Math.round(alunos.value * 0.05)))
const atraso = computed(() => atrasados.value * valor.value)
const renovacao = computed(() => perdidos.value * valor.value)
const mensal = computed(() => atraso.value + renovacao.value)
const anual = computed(() => mensal.value * 12)
// Uns 15 min por aluno por mês (lembrete 2, conferir Pix e dar baixa 4, cobrar atrasado 5, renovação 4) + 1h fixa de fechamento do mês
const horas = computed(() => Math.round(alunos.value * 15 / 60 + 1))

const formato = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const real = (v) => formato.format(v)

// O total sobe contando quando os números mudam
const mostrado = ref(mensal.value)
let quadro = 0
watch(mensal, (novo) => {
  if (typeof window === 'undefined') { mostrado.value = novo; return }
  cancelAnimationFrame(quadro)
  const inicio = mostrado.value
  const comeco = performance.now()
  const passo = (agora) => {
    const t = Math.min(1, (agora - comeco) / 450)
    mostrado.value = Math.round(inicio + (novo - inicio) * (1 - Math.pow(1 - t, 3)))
    if (t < 1) quadro = requestAnimationFrame(passo)
  }
  quadro = requestAnimationFrame(passo)
})

const sinais = [
  'Você não sabe dizer agora quanto vai entrar este mês',
  'Já liberou treino para aluno que ainda não tinha pago',
  'Tem Pix na conta que você não sabe de quem é',
  'Fica sem jeito de cobrar o aluno de novo no WhatsApp',
  'Descobre que o plano venceu só quando o aluno some'
]
const marcados = ref(sinais.map(() => false))
const quantos = computed(() => marcados.value.filter(Boolean).length)
// A gravidade sobe aos poucos: 1 e 2 são atenção (amarelo), 3 é alerta, 4 e 5 são perigo (vermelho forte, brilho e batida)
const graus = ['Faça o teste', 'Atenção', 'Atenção', 'Alerta', 'Perigo', 'Crítico']
const frases = [
  'Se marcou pelo menos uma, tem dinheiro escapando.',
  'Já tem um vazamento no seu financeiro.',
  'Dois vazamentos: o prejuízo já se repete todo mês.',
  'Seu financeiro está trabalhando contra você.',
  'Você está perdendo dinheiro e aluno todo mês.',
  'Sinal vermelho: seu financeiro está fora de controle.'
]
const grau = computed(() => graus[quantos.value])
const veredito = computed(() => frases[quantos.value])

onBeforeUnmount(() => cancelAnimationFrame(quadro))
</script>

<style lang="sass" scoped>
.perdas
  display: flex
  width: 100%
  padding: 40px 24px 120px 24px
  flex-direction: column
  align-items: center
  gap: 48px
  overflow: hidden
  background: radial-gradient(ellipse 50% 45% at 30% 60%, rgba(209, 22, 31, 0.16), transparent 70%), var(--cor-fundo)

  .conteudo
    display: flex
    width: 100%
    max-width: 780px
    flex-direction: column
    align-items: center
    gap: 56px

  // ---------- Calculadora ----------
  .calculo
    display: flex
    width: 100%
    padding: 30px 30px 26px 30px
    flex-direction: column
    gap: 22px
    background: linear-gradient(160deg, var(--cor-vidro-forte), var(--cor-vidro)), var(--cor-carta)
    border: 1px solid var(--cor-linha-destaque)
    border-radius: var(--raio-grande) var(--raio-grande) var(--raio-grande) var(--raio-grande)
    box-shadow: 0 0 80px rgba(209, 22, 31, 0.18), 0 30px 70px rgba(0, 0, 0, 0.45)

    .chamada
      display: flex
      padding: 0 0 18px 0
      align-items: center
      gap: 12px
      border-bottom: 1px solid var(--cor-linha)

      .mao
        display: flex
        width: 36px
        min-width: 36px
        height: 36px
        align-items: center
        justify-content: center
        color: var(--cor-branco)
        background: var(--cor-destaque)
        border-radius: 50% 50% 50% 50%
        box-shadow: 0 6px 20px rgba(209, 22, 31, 0.45)
        animation: cutucar 1.6s ease-in-out infinite

        svg
          width: 18px
          height: 18px

      .textos
        display: flex
        flex-direction: column
        gap: 2px

        b
          font-family: var(--bold)
          font-size: var(--f3)
          color: var(--cor-texto)
          line-height: 1.2

        small
          font-family: var(--light)
          font-size: var(--f1)
          color: var(--cor-fraca)

    .campo
      display: flex
      flex-direction: column
      gap: 10px

      .rotulo
        display: flex
        align-items: baseline
        justify-content: space-between
        font-family: var(--light)
        font-size: var(--f2)
        color: var(--cor-suave)

        strong
          font-family: var(--bold)
          font-size: var(--f4)
          color: var(--cor-texto)

      input
        width: 100%
        height: 28px
        accent-color: var(--cor-destaque-viva)
        cursor: pointer

    .vazamentos
      display: flex
      flex-direction: column
      list-style: none
      border-top: 1px solid var(--cor-linha)

      li
        display: flex
        padding: 14px 0 14px 0
        align-items: center
        gap: 12px
        border-bottom: 1px solid var(--cor-linha)

        .gota
          display: flex
          width: 36px
          min-width: 36px
          height: 36px
          align-items: center
          justify-content: center
          color: var(--cor-suave)
          background: var(--cor-vidro-forte)
          border: 1px solid var(--cor-linha)
          border-radius: 10px 10px 10px 10px

          svg
            width: 18px
            height: 18px

          // Só o X vermelho, sem quadradinho atrás (como o ícone ❌)
          &.erro
            background: transparent
            border: none

            svg
              width: 30px
              height: 30px

          // Logo do app ocupando o quadradinho inteiro
          &.logo
            overflow: hidden
            background: transparent
            border: none

            img
              display: block
              width: 100%
              height: 100%

        .descricao
          display: flex
          width: 100%
          min-width: 0
          flex-direction: column
          gap: 2px

          b
            font-family: var(--bold)
            font-size: var(--f2)
            color: var(--cor-texto)

          small
            font-family: var(--light)
            font-size: var(--f0)
            color: var(--cor-fraca)

        .valor
          font-family: var(--bold)
          font-size: var(--f3)
          color: var(--cor-destaque-viva)
          white-space: nowrap

          &.tempo
            color: var(--cor-texto)

    .total
      display: flex
      padding: 20px 20px 20px 20px
      flex-direction: column
      align-items: flex-start
      gap: 6px
      background: var(--cor-vidro)
      border: 1px solid var(--cor-linha)
      border-radius: 16px 16px 16px 16px

      .titulo
        font-family: var(--bold)
        font-size: var(--f0)
        color: var(--cor-destaque-viva)
        text-transform: uppercase

      .numero
        font-family: var(--bold)
        font-size: var(--f8)
        color: var(--cor-texto)
        line-height: 1

        small
          margin: 0 0 0 6px
          font-family: var(--light)
          font-size: var(--f3)
          color: var(--cor-suave)

      .ano
        font-family: var(--light)
        font-size: var(--f2)
        color: var(--cor-suave)
        line-height: 1.5

        b
          font-family: var(--bold)
          color: var(--cor-destaque-viva)

    .premissa
      font-family: var(--light)
      font-size: var(--f0)
      color: var(--cor-fraca)
      line-height: 1.5

  // ---------- Sinais ----------
  .sinais
    display: flex
    width: 100%
    flex-direction: column
    align-items: center
    gap: 14px
    text-align: center

    h3
      font-family: var(--bold)
      font-size: var(--f5)
      color: var(--cor-texto)
      line-height: 1.15

    .dica
      margin: -4px 0 4px 0
      font-family: var(--bold)
      font-size: var(--f2)
      color: var(--cor-destaque-viva)

    ul
      display: flex
      width: 100%
      max-width: 640px
      flex-direction: column
      gap: 10px
      list-style: none

      li
        display: flex
        width: 100%

    // Tom de cada nível, o mesmo das 5 partes do termômetro: vale para as opções marcadas e para o resultado
    [data-nivel="1"]
      --tom: #F5B83D
      --forca: 7%
      --luz: 0px

    [data-nivel="2"]
      --tom: #F59331
      --forca: 10%
      --luz: 0px

    [data-nivel="3"]
      --tom: #EF5B2B
      --forca: 14%
      --luz: 16px

    [data-nivel="4"]
      --tom: #E3262A
      --forca: 19%
      --luz: 34px

    [data-nivel="5"]
      --tom: #D0121C
      --forca: 25%
      --luz: 54px

    .sinal
      display: flex
      width: 100%
      padding: 14px 16px 14px 14px
      align-items: center
      gap: 12px
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-texto)
      line-height: 1.35
      text-align: left
      background: var(--cor-carta)
      border: 1px solid var(--cor-linha)
      border-radius: 14px 14px 14px 14px
      transition: all 0.25s

      .caixa
        display: flex
        width: 24px
        min-width: 24px
        height: 24px
        align-items: center
        justify-content: center
        color: transparent
        border: 1.5px solid var(--cor-linha-forte)
        border-radius: 7px 7px 7px 7px
        transition: all 0.25s

        svg
          width: 14px
          height: 14px

      &:hover
        border: 1px solid var(--cor-linha-forte)

      // Enquanto nada foi marcado, a primeira opção dá uns pulinhos com a borda vermelha, chamando o toque
      &.convite
        border: 1px solid var(--cor-linha-destaque)
        animation: saltinho 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite

        .caixa
          border: 1.5px solid var(--cor-destaque-viva)

      // Marcada: pinta com o tom do nível atual (todas mudam juntas quando a contagem sobe)
      &.marcado
        background: color-mix(in srgb, var(--tom, var(--cor-destaque)) var(--forca, 12%), transparent)
        border: 1px solid color-mix(in srgb, var(--tom, var(--cor-destaque)) 60%, transparent)
        box-shadow: 0 0 var(--luz, 0px) color-mix(in srgb, var(--tom, var(--cor-destaque)) 30%, transparent)

        .caixa
          color: var(--cor-branco)
          background: var(--tom, var(--cor-destaque))
          border: 1.5px solid var(--tom, var(--cor-destaque))

    // Resultado gradual: cada marcação enche o termômetro e esquenta o quadro (cor, borda e brilho).
    // Transições (não keyframes) para acompanhar toques rápidos; batida contínua só nos níveis 4 e 5
    .veredito
      display: flex
      width: 100%
      max-width: 640px
      padding: 16px 16px 16px 16px
      flex-direction: column
      gap: 14px
      text-align: left
      background: transparent
      border: 1px dashed var(--cor-linha-forte)
      border-radius: 16px 16px 16px 16px
      transition: background-color 0.25s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.25s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.25s cubic-bezier(0.23, 1, 0.32, 1)
      --cor-nivel: var(--cor-fraca)

      .linha
        display: flex
        align-items: center
        gap: 14px

      .contagem
        display: flex
        min-width: 52px
        height: 52px
        align-items: center
        justify-content: center
        font-family: var(--bold)
        font-size: var(--f3)
        color: var(--cor-fraca)
        background: transparent
        border: 1.5px solid var(--cor-linha-forte)
        border-radius: 14px 14px 14px 14px
        transition: color 0.2s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.2s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s cubic-bezier(0.23, 1, 0.32, 1), transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)

      .textos
        display: flex
        flex-direction: column
        gap: 2px

        .grau
          font-family: var(--bold)
          font-size: var(--f0)
          color: var(--cor-nivel)
          text-transform: uppercase
          transition: color 0.2s ease

        b
          font-family: var(--bold)
          font-size: var(--f2)
          color: var(--cor-suave)
          line-height: 1.3
          transition: color 0.2s ease

      // Termômetro de 5 partes: do amarelo (atenção) ao vermelho escuro (crítico)
      .termometro
        display: flex
        width: 100%
        gap: 6px

        i
          display: block
          width: 20%
          height: 8px
          background: var(--cor-linha)
          border-radius: 99px 99px 99px 99px
          transform: scaleY(0.75)
          transition: background-color 0.2s cubic-bezier(0.23, 1, 0.32, 1), transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s cubic-bezier(0.23, 1, 0.32, 1)

          &.cheio
            transform: scaleY(1)

            &:nth-child(1)
              background: #F5B83D

            &:nth-child(2)
              background: #F59331

            &:nth-child(3)
              background: #EF5B2B

            &:nth-child(4)
              background: #E3262A
              box-shadow: 0 0 10px rgba(227, 38, 42, 0.6)

            &:nth-child(5)
              background: #D0121C
              box-shadow: 0 0 14px rgba(255, 40, 40, 0.8)

      // Com 1 ou mais marcadas: quadro, contagem e etiqueta no tom do nível, cada vez mais forte e com mais brilho
      &:not([data-nivel="0"])
        --cor-nivel: var(--tom)
        background: color-mix(in srgb, var(--tom) var(--forca), transparent)
        border: 1px solid color-mix(in srgb, var(--tom) 65%, transparent)
        box-shadow: 0 0 var(--luz) color-mix(in srgb, var(--tom) 45%, transparent)

        .contagem
          color: var(--cor-branco)
          background: var(--tom)
          border: 1.5px solid var(--tom)
          box-shadow: 0 6px var(--luz) color-mix(in srgb, var(--tom) 55%, transparent)

        .textos b
          color: var(--cor-texto)

      &[data-nivel="3"] .contagem
        transform: scale(1.04)

      // 4 e 5: perigo, texto maior e batida de coração na contagem
      &[data-nivel="4"], &[data-nivel="5"]
        .contagem
          transform: scale(1.08)

        .textos b
          color: var(--cor-branco)
          font-size: var(--f3)

      &[data-nivel="5"] .contagem
        animation: batida 1.2s cubic-bezier(0.23, 1, 0.32, 1) infinite

      &[data-nivel="4"] .contagem
        animation: batida 1.8s cubic-bezier(0.23, 1, 0.32, 1) infinite

    .botao
      margin: 6px 0 0 0

      // A partir de 3 marcações o botão ganha brilho pulsando, chamando para a saída
      &.urgente
        animation: chamar 1.6s ease-in-out infinite

    .nota
      font-family: var(--light)
      font-size: var(--f1)
      color: var(--cor-fraca)

@keyframes batida
  0%, 100%
    transform: scale(1.08)
  15%
    transform: scale(1.16)
  30%
    transform: scale(1.08)
  45%
    transform: scale(1.13)

@keyframes saltinho
  0%, 40%, 100%
    transform: translateY(0)
    box-shadow: 0 0 0 0 rgba(255, 43, 43, 0)
  10%
    transform: translateY(-7px)
    box-shadow: 0 10px 26px rgba(255, 43, 43, 0.28)
  20%
    transform: translateY(0)
  28%
    transform: translateY(-3px)

@keyframes chamar
  0%, 100%
    box-shadow: 0 10px 30px rgba(209, 22, 31, 0.35)
  50%
    box-shadow: 0 10px 50px rgba(255, 50, 40, 0.75)

@media (prefers-reduced-motion: reduce)
  .perdas .sinais .veredito .contagem, .perdas .sinais .botao.urgente, .perdas .sinais .sinal.convite
    animation: none

// O botãozinho de setas balança de lado, chamando para arrastar
@keyframes cutucar
  0%, 100%
    transform: translateX(0)
  50%
    transform: translateX(4px)

@media screen and (max-width: 1000px)
  .perdas
    padding: 20px 20px 80px 20px
    gap: 32px

    .conteudo
      flex-direction: column
      gap: 40px

    .calculo
      width: 100%
      padding: 22px 18px 20px 18px
      gap: 18px

      .vazamentos li
        gap: 10px

        .valor
          font-size: var(--f2)

      .total .numero
        font-size: var(--f7)

    .sinais
      align-items: center
      text-align: center

      ul li
        width: 100%

      .botao
        width: 100%

      .nota
        width: 100%
        text-align: center
</style>

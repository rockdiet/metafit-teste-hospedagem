<template>
  <section class="planos" id="planos">
    <div class="cabecalho">
      <span class="selo">Planos</span>
      <h2>Escolha o plano perfeito <span class="realce">para você</span></h2>
      <p>Comece grátis. Sem fidelidade. Cancele quando quiser.</p>
    </div>
    <div class="periodo">
      <button type="button" class="opcao" :class="{ ativo: !anual }" :aria-pressed="!anual" @click="anual = false">Mensal</button>
      <button type="button" class="opcao" :class="{ ativo: anual }" :aria-pressed="anual" @click="anual = true">Anual</button>
      <span class="economia">Economize 30%</span>
    </div>
    <div class="lista">
      <article v-for="plano in planos" :key="plano.chave" class="plano cartao" :class="{ destaque: plano.destaque }">
        <span v-if="plano.destaque" class="popular">Mais popular</span>
        <h3>{{ plano.nome }}</h3>
        <p class="resumo">{{ plano.resumo }}</p>
        <div class="preco">
          <span class="antes">{{ antes(plano) }}</span>
          <div class="valor">
            <span class="moeda">R$</span>
            <strong>{{ anual ? plano.anual : plano.mensal }}</strong>
            <span class="mes">/mês</span>
          </div>
          <span class="cobranca">{{ cobranca(plano) }}</span>
        </div>
        <a class="botao" :class="{ vidro: !plano.destaque }" :href="link(plano)">Começar grátis por 10 dias</a>
        <span class="titulo">{{ plano.titulo }}</span>
        <ul>
          <li v-for="item in plano.itens" :key="item">
            <Icone nome="certo" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Icone from '../Icone.vue'

const checkout = 'https://checkout.metafit.cc/?plan='

const planos = [
  {
    chave: 's',
    nome: 'Starter',
    resumo: 'Para quem está profissionalizando a operação agora.',
    mensal: 67,
    anual: 47,
    total: 564,
    linkM: checkout + 'cc6c4f0d-fd0f-4bf8-bab8-3820be787c22',
    linkA: checkout + '5cf3fd4a-10e5-4f08-ba0f-b75eb59ba1c5',
    titulo: 'Incluso',
    itens: [
      'Até 25 alunos',
      'Construtor de treinos, com vídeos próprios',
      'Construtor de dietas',
      'Lembretes automáticos',
      'Gestão de pagamentos e cobrança automática',
      'Anamnese personalizada',
      'Kanban estilo Trello',
      'App MetaFit para alunos, gratuito'
    ]
  },
  {
    chave: 'p',
    nome: 'Pro',
    destaque: true,
    resumo: 'Para quem quer crescer com estratégia, não só com esforço.',
    mensal: 97,
    anual: 68,
    total: 816,
    linkM: checkout + 'f8458ef4-2068-473e-bee5-de0c9349552d',
    linkA: checkout + '0cb91a9b-dc7b-4e0b-88a3-0ac652828306',
    titulo: 'Tudo do Starter, mais',
    itens: [
      'Até 50 alunos',
      'Feedbacks personalizados',
      'Ranking de engajamento de alunos',
      'Formulários personalizados',
      'Cupons de desconto',
      'Afiliados da consultoria',
      'Integração com Google Agenda',
      'Trackeamento de links'
    ]
  },
  {
    chave: 'b',
    nome: 'Business',
    resumo: 'Para a consultoria que opera em escala.',
    mensal: 117,
    anual: 82,
    total: 984,
    linkM: checkout + '90f369c3-670e-4859-9d43-f6333392beaf',
    linkA: checkout + 'bb6c8186-c526-4658-b594-536c19e96ba8',
    titulo: 'Tudo do Pro, mais',
    itens: [
      'Alunos ilimitados',
      'Múltiplas consultorias',
      'WhatsApp: mensagens e disparo automático',
      'Gestão de colaboradores',
      'Todas as aulas do módulo desbloqueadas',
      'Suporte prioritário'
    ]
  }
]

const anual = ref(false)
const busca = ref('')

const antes = (plano) => (anual.value ? 'R$' + plano.mensal + '/mês' : '')
const cobranca = (plano) => (anual.value ? 'Cobrado como R$' + plano.total + '/ano' : 'Cobrado mês a mês')

// Link do checkout com os parâmetros da URL (utm etc.) repassados
const link = (plano) => {
  const url = anual.value ? plano.linkA : plano.linkM
  return busca.value ? url + '&' + busca.value.slice(1) : url
}

onMounted(() => {
  busca.value = window.location.search
})
</script>

<style lang="sass" scoped>
.planos
  display: flex
  width: 100%
  padding: 110px 24px 120px 24px
  flex-direction: column
  align-items: center
  gap: 40px
  background: radial-gradient(ellipse 45% 40% at 85% 6%, rgba(209, 22, 31, 0.22), transparent 70%), var(--cor-fundo)
  border-top: 1px solid var(--cor-linha)

  .periodo
    display: flex
    padding: 6px 6px 6px 6px
    align-items: center
    gap: 4px
    background: var(--cor-vidro)
    border: 1px solid var(--cor-linha)
    border-radius: var(--raio-total) var(--raio-total) var(--raio-total) var(--raio-total)

    .opcao
      min-height: 42px
      padding: 8px 22px 8px 22px
      font-family: var(--bold)
      font-size: var(--f1)
      color: var(--cor-suave)
      border-radius: var(--raio-total) var(--raio-total) var(--raio-total) var(--raio-total)
      transition: all 0.3s

      &:hover
        color: var(--cor-texto)

      &:focus-visible
        outline: 2px solid var(--cor-branco)
        outline-offset: 2px

      &.ativo
        color: var(--cor-branco)
        background: var(--cor-destaque)

    .economia
      padding: 0 14px 0 10px
      font-family: var(--bold)
      font-size: var(--f0)
      color: var(--cor-destaque-viva)
      text-transform: uppercase

  .lista
    display: flex
    width: 100%
    max-width: 1120px
    margin: 16px 0 0 0
    align-items: stretch
    gap: 20px

    .plano
      display: flex
      position: relative
      width: calc((100% - 40px) / 3)
      padding: 36px 28px 32px 28px
      flex-direction: column
      gap: 14px

      .popular
        position: absolute
        top: -14px
        left: 50%
        padding: 6px 16px 6px 16px
        font-family: var(--bold)
        font-size: var(--f0)
        color: var(--cor-branco)
        text-transform: uppercase
        white-space: nowrap
        background: var(--cor-destaque)
        border-radius: var(--raio-total) var(--raio-total) var(--raio-total) var(--raio-total)
        transform: translateX(-50%)

      h3
        font-family: var(--bold)
        font-size: var(--f5)
        color: var(--cor-texto)

      .resumo
        min-height: 42px
        font-family: var(--light)
        font-size: var(--f1)
        color: var(--cor-suave)
        line-height: 1.5

      .preco
        display: flex
        margin: 4px 0 8px 0
        flex-direction: column
        gap: 4px

        .antes
          min-height: 20px
          font-family: var(--light)
          font-size: var(--f1)
          color: var(--cor-fraca)
          text-decoration: line-through

        .valor
          display: flex
          align-items: baseline
          gap: 4px

          .moeda
            font-family: var(--bold)
            font-size: var(--f4)
            color: var(--cor-texto)

          strong
            font-family: var(--bold)
            font-size: var(--f8)
            color: var(--cor-texto)
            line-height: 1

          .mes
            font-family: var(--light)
            font-size: var(--f1)
            color: var(--cor-suave)

        .cobranca
          font-family: var(--light)
          font-size: var(--f0)
          color: var(--cor-fraca)

      .botao
        width: 100%

      .titulo
        margin: 12px 0 0 0
        font-family: var(--bold)
        font-size: var(--f0)
        color: var(--cor-fraca)
        text-transform: uppercase

      ul
        display: flex
        flex-direction: column
        gap: 11px
        list-style: none

        li
          display: flex
          align-items: flex-start
          gap: 10px

          .icone
            width: 18px
            min-width: 18px
            height: 18px
            color: var(--cor-destaque-viva)

          span
            font-family: var(--light)
            font-size: var(--f1)
            color: var(--cor-suave)
            line-height: 1.4

      &.destaque
        background: linear-gradient(170deg, var(--cor-vidro-destaque), var(--cor-vidro))
        border: 1px solid var(--cor-destaque)
        box-shadow: 0 0 90px rgba(209, 22, 31, 0.25)

        ul
          li
            span
              color: var(--cor-texto)

@media screen and (max-width: 1000px)
  .planos
    padding: 80px 20px 80px 20px
    gap: 30px

    .periodo
      .opcao
        padding: 8px 16px 8px 16px

    .lista
      flex-direction: column
      gap: 30px

      .plano
        width: 100%
        padding: 32px 22px 28px 22px

        .resumo
          min-height: 0

        .preco
          .valor
            strong
              font-size: var(--f7)
</style>

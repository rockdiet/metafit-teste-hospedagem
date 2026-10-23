<template>
  <section class="faq" id="faq">
    <div class="cabecalho">
      <span class="selo">Dúvidas</span>
      <h2>Perguntas <span class="realce">frequentes</span></h2>
      <p>Tudo que você precisa saber antes de começar.</p>
    </div>
    <ul class="lista">
      <li v-for="(item, i) in perguntas" :key="item.pergunta" class="cartao" :class="{ aberto: aberto === i }">
        <button type="button" :aria-expanded="aberto === i" @click="alternar(i)">
          <span>{{ item.pergunta }}</span>
          <Icone nome="mais" />
        </button>
        <p v-show="aberto === i">{{ item.resposta }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Icone from '../Icone.vue'

const perguntas = [
  { pergunta: 'A MetaFit cobra taxa ou porcentagem sobre os meus alunos?', resposta: 'Não. Você paga só a mensalidade do seu plano, a partir de R$ 67/mês, sem taxa por aluno e sem ficar com uma parte do que você fatura. A única taxa a mais é a do MetaFit Pay, e ela só existe se você escolher receber dos alunos por ele: cada pagamento tem uma taxa de processamento, como em qualquer maquininha, e o restante cai no seu saldo. Se preferir receber por fora (Pix direto, transferência ou outra plataforma), é só registrar o pagamento no painel e a MetaFit não fica com nada.' },
  { pergunta: 'Como faço para trazer meus alunos para a MetaFit?', resposta: 'Você não precisa fazer nada. A nossa equipe faz a migração dos seus alunos para você, de forma rápida e sem dor de cabeça, e você já começa com tudo pronto na MetaFit.' },
  { pergunta: 'Dá para colocar minha equipe na mesma conta?', resposta: 'Dá. No plano Business você cadastra colaboradores e todo mundo trabalha na mesma operação, sem precisar dividir login. E você acompanha a produtividade de cada funcionário num painel próprio para isso.' },
  { pergunta: 'O que é o MetaFit?', resposta: 'O MetaFit é a plataforma de gestão de consultoria fitness focada em fazer você faturar mais todos os meses. Prescrição de treinos e dietas, acompanhamento de alunos, cobrança automática e controle financeiro, tudo em um lugar só.' },
  { pergunta: 'O que é o app com marca própria?', resposta: 'É um add-on disponível para qualquer plano que coloca o seu nome e a sua logo no app dos seus alunos, disponível na App Store e no Google Play. Se tiver interesse em ser parceiro, entre em contato com a gente.' },
  { pergunta: 'É difícil de configurar?', resposta: 'Não. O MetaFit foi construído para ser simples: você consegue ter sua operação rodando em poucas horas. Se precisar de ajuda, nosso suporte está disponível por chat, e-mail e WhatsApp.' },
  { pergunta: 'Meus dados e os dos meus clientes estão seguros?', resposta: 'Sim. Todos os dados são armazenados com criptografia e seguindo os mais altos padrões de segurança do mercado. Sua informação é sua: ninguém além de você tem acesso a ela.' },
]

const aberto = ref(-1)

const alternar = (i) => {
  aberto.value = aberto.value === i ? -1 : i
}
</script>

<style lang="sass" scoped>
.faq
  display: flex
  width: 100%
  padding: 110px 24px 110px 24px
  flex-direction: column
  align-items: center
  gap: 48px
  background: radial-gradient(ellipse 45% 40% at 85% 6%, rgba(209, 22, 31, 0.18), transparent 70%), var(--cor-fundo)
  border-top: 1px solid var(--cor-linha)

  .lista
    display: flex
    width: 100%
    max-width: 800px
    flex-direction: column
    gap: 12px
    list-style: none

    li
      display: flex
      flex-direction: column
      overflow: hidden
      transition: border-color 0.3s

      button
        display: flex
        width: 100%
        min-height: 62px
        padding: 18px 22px 18px 22px
        align-items: center
        justify-content: space-between
        gap: 16px
        font-family: var(--light)
        font-size: var(--f2)
        color: var(--cor-texto)
        text-align: left
        line-height: 1.4

        .icone
          width: 20px
          min-width: 20px
          height: 20px
          color: var(--cor-destaque-viva)
          transition: all 0.3s

        &:focus-visible
          outline: 2px solid var(--cor-branco)
          outline-offset: -4px

      p
        padding: 0 22px 22px 22px
        font-family: var(--light)
        font-size: var(--f2)
        color: var(--cor-suave)
        line-height: 1.65

      &.aberto
        border: 1px solid var(--cor-linha-destaque)

        button
          .icone
            transform: rotate(45deg)

@media screen and (max-width: 1000px)
  .faq
    padding: 80px 20px 80px 20px
    gap: 36px

    .lista
      li
        button
          padding: 16px 18px 16px 18px

        p
          padding: 0 18px 18px 18px
</style>

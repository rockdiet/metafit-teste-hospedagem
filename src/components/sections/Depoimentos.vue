<template>
  <section class="depoimentos" id="resultados">
    <div class="texto">
      <span class="selo">Resultados reais</span>
      <h2>Quem usa a <span class="realce">MetaFit</span> não volta para as planilhas</h2>
      <p>Mais alunos e mais tempo livre, sem viver no WhatsApp cobrando. Veja quem já fez a troca.</p>
      <a class="botao" href="/teste-gratis">Testar grátis por 10 dias</a>
    </div>
    <div class="faixa" :class="{ parado }" @touchstart.passive="parado = true" @touchend="parado = false" @touchcancel="parado = false">
      <div v-for="(fileira, f) in fileiras" :key="f" class="trilho" :class="f === 0 ? 'ida' : 'volta'">
        <div v-for="(item, i) in fileira" :key="f + '-' + i" class="cartao" :aria-hidden="i >= depoimentos.length ? 'true' : null">
          <p>{{ item.texto }}</p>
          <div class="autor">
            <img :src="item.foto" :alt="i >= depoimentos.length ? '' : item.nome" width="52" height="52" loading="lazy" decoding="async" />
            <div class="dados">
              <strong>{{ item.nome }}</strong>
              <span>{{ item.cargo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const cdn = 'https://unicpages-assets.nyc3.cdn.digitaloceanspaces.com/imagens/'

// Dedo na faixa pausa a rolagem no celular; soltou, volta a andar
const parado = ref(false)

// ATENÇÃO: depoimentos de EXEMPLO (não são clientes reais). Trocar pelos depoimentos reais dos beta testers,
// com autorização, antes de abrir a página ou rodar tráfego
const depoimentos = [
  { nome: 'Edu Silveira', cargo: 'Personal trainer online', foto: cdn + 'cmsog8cedes5m1ru-depoimento-edu-silveira-rosto.webp', texto: '“Eu mandava um PDF feio pelo WhatsApp e tinha planilha de alunos. Sempre acabava esquecendo de cobrar e enviava dieta de um para o outro sem querer. Agora tenho 110 alunos e tá mais fácil do que quando tinha 40. Consigo atender todos sozinho.”' },
  { nome: 'Flávio', cargo: 'Coach · FFC Coaching', foto: cdn + 'd65b5oha60aop3vw-depoimento-flavio-ffc.webp', texto: '“O que eu mais odiava era ficar cobrando aluno, me sentia mal toda vez. Agora o lembrete vai sozinho e o dinheiro cai na conta. Nem lembro a última vez que mandei “oi, e o pagamento?” kkk”' },
  { nome: 'Diego Camaglio', cargo: 'Bodybuilding coach', foto: cdn + '6nhmsw83u6dr4agm-depoimento-diego-camaglio.webp', texto: '“Em preparação eu mexo na dieta e no treino dos atletas toda semana. Antes era um PDF novo pra cada um, hoje eu ajusto no app e eles já veem. Um atleta até perguntou se eu tinha contratado alguém kkkk”' },
  { nome: 'Jhow Cabral', cargo: 'Coach e Bodybuilder PRO', foto: cdn + '1a3re0cs15uorxyu-depoimento-jhow-cabral-corpo.webp', texto: '“Gosto muito do quadro dos alunos. Bato o olho e já sei quem tá sumindo, aí chamo antes de cancelar. Só esse mês segurei 4 alunos que iam sair.”' },
  { nome: 'Rafael Moura', cargo: 'Nutricionista esportivo', foto: cdn + '6cuq2frzhncnbbyt-depoimento-rafael-moura-corpo.webp', texto: '“Tinha medo de trocar de plataforma e virar uma dor de cabeça. Subi a planilha com meus 80 alunos e no mesmo dia tava tudo lá. O suporte me respondeu rapidinho no WhatsApp.”' },
  { nome: 'Fernanda Alves', cargo: 'Personal online · 120 alunos', foto: cdn + 'rqj4z201m6vivzui-depoimento-fernanda-alves.webp', texto: '“Quando vi o relatório levei um susto: tinha uns R$ 3 mil por mês de aluno atrasado que eu nem lembrava. Só isso já paga a MetaFit com sobra.”' }
]

// Cada fileira repete a lista duas vezes para o loop não ter emenda; a de baixo vem em outra ordem e corre ao contrário
const segunda = [3, 4, 5, 0, 1, 2].map((n) => depoimentos[n])
const fileiras = [
  [...depoimentos, ...depoimentos],
  [...segunda, ...segunda]
]
</script>

<style lang="sass" scoped>
.depoimentos
  display: flex
  width: 100%
  padding: 110px 0 110px 0
  flex-direction: column
  align-items: center
  gap: 56px
  overflow: hidden
  background: radial-gradient(ellipse 45% 45% at 88% 8%, rgba(209, 22, 31, 0.2), transparent 70%), var(--cor-fundo)
  border-top: 1px solid var(--cor-linha)

  .texto
    display: flex
    width: 100%
    max-width: 760px
    padding: 0 24px 0 24px
    flex-direction: column
    align-items: center
    text-align: center
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

  .faixa
    display: flex
    width: 100%
    padding: 8px 0 8px 0
    flex-direction: column
    gap: 20px
    overflow: hidden
    -webkit-mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)
    mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)

    &:hover .trilho, &.parado .trilho
      animation-play-state: paused

  .trilho
    display: flex
    width: max-content
    align-items: stretch
    will-change: transform

    &.ida
      animation: rolaIda 48s linear infinite

    &.volta
      animation: rolaVolta 58s linear infinite

  .cartao
    display: flex
    width: 340px
    margin-right: 18px
    padding: 26px 24px 24px 24px
    flex-shrink: 0
    flex-direction: column
    justify-content: space-between
    gap: 20px

    p
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-texto)
      line-height: 1.55

    .autor
      display: flex
      align-items: center
      gap: 12px

      img
        width: 52px
        height: 52px
        flex-shrink: 0
        object-fit: cover
        border: 2px solid var(--cor-linha-destaque)
        border-radius: 50% 50% 50% 50%

      .dados
        display: flex
        flex-direction: column
        gap: 2px

        strong
          font-family: var(--bold)
          font-size: var(--f1)
          color: var(--cor-texto)

        span
          font-family: var(--light)
          font-size: var(--f0)
          color: var(--cor-suave)

@keyframes rolaIda
  from
    transform: translateX(0)
  to
    transform: translateX(-50%)

@keyframes rolaVolta
  from
    transform: translateX(-50%)
  to
    transform: translateX(0)

@media screen and (max-width: 1000px)
  .depoimentos
    padding: 80px 0 80px 0
    gap: 36px

    .texto
      padding: 0 20px 0 20px
      gap: 18px

      .botao
        width: 100%

    .faixa
      gap: 12px

    .trilho
      align-items: flex-start

      &.ida
        animation-duration: 24s

      &.volta
        animation-duration: 29s

    .cartao
      width: 264px
      margin-right: 12px
      padding: 18px 18px 18px 18px
      justify-content: flex-start
      gap: 14px

      p
        font-size: var(--f1)
        line-height: 1.5

      .autor
        gap: 10px

        img
          width: 40px
          height: 40px

@media (prefers-reduced-motion: reduce)
  .depoimentos .trilho
    animation: none

  .depoimentos .faixa
    overflow-x: auto
</style>

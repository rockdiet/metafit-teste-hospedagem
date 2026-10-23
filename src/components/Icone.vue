<template>
  <svg class="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="desenhos[nome]"></svg>
</template>

<script setup>
defineProps({
  nome: { type: String, required: true }
})

// Desenhos dos ícones (traço), todos na grade 24x24
const desenhos = {
  raio: '<path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="currentColor" stroke="none"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
  sino: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/>',
  cartao: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
  celular: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  conversa: '<path d="M5 5h14v10H10l-5 4z"/>',
  grafico: '<path d="M4 20h16M6 15l4-4 3 3 5-7"/>',
  prancheta: '<rect x="6" y="5" width="12" height="16" rx="2"/><path d="M9 5V3h6v2M9 11h6M9 15h4"/>',
  halter: '<path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10"/>',
  quadro: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v10"/>',
  prato: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  evolucao: '<path d="M4 18l5-5 4 3 7-9M15 7h5v5"/>',
  trofeu: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6"/>',
  frasco: '<path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/>',
  historico: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  certo: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  errado: '<path d="M6 6l12 12M18 6 6 18"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><path d="M16.8 7.2h.01"/>',
  tiktok: '<path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.6 2 4.2 4.5 4.5"/>'
}
</script>

<style lang="sass" scoped>
.icone
  display: block
  width: 22px
  height: 22px
</style>

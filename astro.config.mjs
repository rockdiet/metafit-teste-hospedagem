// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

// Site estático: cada página vira um HTML pronto no build; só as dobras com interação carregam JavaScript (ilhas)
export default defineConfig({
  site: 'https://metafit.cc',
  output: 'static',
  integrations: [vue()],
  compressHTML: true,
  build: {
    // teste-gratis.html em vez de teste-gratis/index.html: a URL fica /teste-gratis, sem barra no fim, igual ao site atual
    format: 'file',
    // O CSS é embutido no HTML depois do build (tira-css-duplicado.mjs), como o site atual faz: no celular isso tira uma ida e volta antes da primeira pintura
    inlineStylesheets: 'never'
  },
  vite: {
    css: { preprocessorOptions: { sass: { api: 'modern-compiler' } } }
  }
})

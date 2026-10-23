# Site MetaFit em Astro

Cópia do site metafit.cc reconstruída em Astro 5 + Vue 3, publicada no Cloudflare Pages
(projeto `metafit-astro`, endereço de teste https://astro.metafit.cc, marcada como não indexável).
Este repositório guardava antes um teste de hospedagem do build Nuxt (scripts de espelho); ficou no histórico do git.

## Rodar

    npm install
    npm run dev        # ambiente local
    npm run build      # gera a pasta dist (e embute/deduplica o CSS: tira-css-duplicado.mjs)
    npm run preview

## Publicar no Cloudflare Pages

    CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npx wrangler pages deploy dist --project-name metafit-astro --branch main

## Estrutura

- `src/layouts/Base.astro`: cabeçalho HTML (SEO, fontes locais, pré-carregamento das imagens do topo), GTM GTM-T75MG4TK com carga preguiçosa (só depois da primeira pintura) e o script de medição de cliques/seções (`src/scripts/rastreio.ts`).
- `src/pages/`: `index.astro` (home), `teste-gratis.astro`, `404.astro`.
- `src/components/sections/`: as seções. `Hero.astro` é HTML puro (com o vídeo de fumaça em JS simples); as seções com interação (Cartas, Pay, Kanban, Whats, Perdas, Depoimentos, Planos, Faq) são ilhas Vue carregadas só quando aparecem na tela (`client:visible`); Menu, Apps, Final e Rodapé são Vue renderizado no build, sem JavaScript no navegador.
- `src/styles/`: `main.sass` e `variables.sass` (mesmas regras do site atual: Sass indentado, variáveis CSS, uma única media query).
- `public/`: imagens do topo, fontes (woff2), ícones, `robots.txt` (bloqueia tudo: é cópia) e `_headers` (noindex + cache longo).

Para virar o site oficial: tirar o `X-Robots-Tag: noindex` do `_headers`, liberar o `robots.txt`, apontar o domínio metafit.cc para o projeto no Cloudflare Pages e manter o UnicPages como reserva até confirmar.

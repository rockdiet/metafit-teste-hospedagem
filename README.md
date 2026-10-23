# Site MetaFit em Astro

Site oficial metafit.cc, reconstruído em Astro 5 + Vue 3 e publicado no Cloudflare Pages (projeto `metafit-astro`).
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
- `public/`: imagens do topo, fontes (woff2), ícones, `robots.txt`, `sitemap.xml` e `_headers` (cache longo). Redirecionamentos de www, astro.metafit.cc e pages.dev para o oficial ficam no Cloudflare (regras da zona e Bulk Redirects), não aqui.

Reserva: o site antigo (Nuxt, UnicPages) continua publicado em https://site-o25uz4.unic.page/.

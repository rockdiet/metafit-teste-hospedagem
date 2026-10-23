// Imagens do topo, usadas pelo Hero e pelo <link rel="preload"> da página inicial (o atleta é a maior imagem da primeira dobra).
// Ficam na própria hospedagem (pasta public/imagens), no mesmo endereço da página: o celular não precisa abrir outra conexão para baixá-las
export const cdn = '/imagens/'
// Atleta em WebP (49 KB) na biblioteca de arquivos da UnicPages
export const atleta = cdn + 'vyp1rewhexg003c7-atleta.webp'
// Mesmo desenho em 3 larguras: o navegador escolhe a menor que fica nítida na tela (celular baixa 22 a 34 KB em vez de 49 KB)
export const atletaSrcset = cdn + 'bm4l4zff0lx4i4gj-atleta-320.webp 320w, ' + cdn + '9rpisj4ubtg9jayc-atleta-460.webp 460w, ' + atleta + ' 622w'
// Largura exibida: 244px no celular (470px de altura) e 34% da altura da tela no computador (66% de altura)
export const atletaSizes = '(max-width: 1000px) 244px, 35vh'
// Escrito "leo stronda" atrás do atleta (WebP de 6 KB): no celular ele é a maior imagem da primeira dobra, então também é pré-carregado
export const nome = cdn + '3yiimy8f73t5s43z-leo-stronda-3.webp'
// Versão de 900 px para o celular (menos trabalho para decodificar num aparelho fraco); no computador usa a de 1800 px
export const nomeSrcset = cdn + 'leo-stronda-900.webp 900w, ' + nome + ' 1800w'
export const nomeSizes = '(max-width: 1000px) 153vw, min(866px, 84vw)'

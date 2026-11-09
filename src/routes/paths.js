export const caminhos = {
  loja: '/',
  jogos: '/jogos',
  login: '/login',
  detalhes: '/jogo',
};

export function urlCatalogo(parametros) {
  return `${caminhos.jogos}?${new URLSearchParams(parametros)}`;
}

export function urlJogo(id) {
  return `${caminhos.detalhes}?${new URLSearchParams({ jogo: id })}`;
}

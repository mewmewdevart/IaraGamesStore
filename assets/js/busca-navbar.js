(function () {
  'use strict';

  const entradaBusca = document.querySelector('.funil-busca__entrada');
  if (!entradaBusca) return;

  const parametros = new URLSearchParams(window.location.search);
  const buscaAtual = parametros.get('search');
  if (buscaAtual) entradaBusca.value = buscaAtual;

  entradaBusca.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Enter') return;

    const termo = entradaBusca.value.trim();
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? './games.html' : 'https://mewmewdevart.github.io/IaraGamesStore/games.html';
    const destino = new URL(baseUrl, window.location.href);

    if (termo) destino.searchParams.set('search', termo);
    window.location.href = destino.href;
  });
})();
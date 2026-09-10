(function () {
  'use strict';

  if (typeof JOGOS_DATA === 'undefined') return;

  const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const jogosPorTitulo = new Map(JOGOS_DATA.map((jogo) => [normalizar(jogo.titulo), jogo.id]));

  document.querySelectorAll('.link-cobre-card').forEach((link) => {
    const card = link.closest('article');
    if (!card) return;

    const tituloOriginal = link.textContent.trim();
    const id = jogosPorTitulo.get(normalizar(tituloOriginal)) || normalizar(tituloOriginal).replace(/[^a-z0-9]+/g, '-');
    const imagem = card.querySelector('img')?.getAttribute('src');
    const parametros = new URLSearchParams({ jogo: id, titulo: tituloOriginal });
    if (imagem) parametros.set('imagem', imagem);
    link.href = `./game-details.html?${parametros.toString()}`;
  });
})();
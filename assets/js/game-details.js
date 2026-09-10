(function () {
  'use strict';

  const container = document.getElementById('detalhes-jogo');
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get('jogo');
  const jogoEncontrado = JOGOS_DATA.find((item) => item.id === id);
  const jogo = jogoEncontrado || {
    id,
    titulo: parametros.get('titulo') || 'Jogo Iara Games',
    estudio: 'Desenvolvedora independente',
    imagem: parametros.get('imagem') || './assets/img/og-image.png',
    nota: 0,
    totalVotos: 0,
    precoOriginal: null,
    precoAtual: 0,
    desconto: null,
    generos: ['Indie'],
    plataformas: ['windows'],
    tags: ['Indie'],
  };

  const descricoes = {
    'a-lenda-do-heroi': 'Uma aventura musical e bem-humorada inspirada nas lendas brasileiras, com exploração, desafios e muita personalidade.',
    dandara: 'Explore um mundo fantástico inspirado na cultura brasileira e desafie as leis da gravidade nesta aventura metroidvania.',
    'dandy-ace': 'Enfrente um labirinto em constante mudança combinando cartas, poderes e muita ação em uma aventura roguelike.',
    dolmen: 'Sobreviva a um universo de ficção científica hostil em uma experiência de ação e horror cósmico.',
    'gaucho-and-the-grassland': 'Viaje por paisagens brasileiras, cuide da sua fazenda e descubra uma aventura relaxante cheia de descobertas.',
    'horizon-chase-turbo': 'Reviva a velocidade e a estética dos clássicos arcades em corridas coloridas ao redor do mundo.',
    'kaze-and-the-wild-masks': 'Domine plataformas precisas, máscaras ancestrais e desafios intensos nesta aventura inspirada nos clássicos.',
    'mark-of-the-deep': 'Mergulhe em uma aventura pirata com exploração, mistérios e combates em um mundo cheio de segredos.',
    pipistrello: 'Use um ioiô amaldiçoado para enfrentar inimigos e desvendar uma cidade vibrante em uma aventura de ação.',
    'pocket-bravery': 'Entre no ringue com lutadores brasileiros e domine combates rápidos em um jogo de luta com visual pixel art.',
    'ruff-ghanor': 'Assuma o papel de Ruff, um jovem clérigo treinado pelos monges do mosteiro de São Arnaldo, e enfrente o tirano Dragão Vermelho Zamir.',
    'arida-backlands-awakening': 'Atravesse o sertão do século XIX em uma jornada de sobrevivência, memória e descoberta.',
    'knights-of-pen-and-paper': 'Monte seu grupo de aventureiros e viva uma campanha de RPG de mesa cheia de humor e estratégia.',
    'odallus-the-dark-call': 'Enfrente criaturas sombrias e descubra os segredos de uma terra amaldiçoada em uma aventura retrô.',
    'fobia-st-dinfna-hotel': 'Investigue um hotel abandonado e encare fenômenos sobrenaturais em uma experiência brasileira de terror.',
  };

  function dinheiro(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function escapeHTML(valor) {
    return String(valor).replace(/[&<>'"]/g, (caractere) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[caractere]));
  }

  const precoAntigo = jogo.precoOriginal ? `<span class="detalhes-jogo__preco-antigo">${dinheiro(jogo.precoOriginal)}</span>` : '';
  const desconto = jogo.desconto ? `<span class="detalhes-jogo__desconto">-${jogo.desconto}%</span>` : '';
  const tags = [...new Set([...jogo.generos, ...jogo.tags])].map((tag) => `<span class="detalhes-jogo__tag">${escapeHTML(tag)}</span>`).join('');
  const plataformas = jogo.plataformas.map((plataforma) => plataforma[0].toUpperCase() + plataforma.slice(1)).join(', ');

  document.title = `${jogo.titulo} | Iara Games`;
  container.innerHTML = `
    <div class="detalhes-jogo__container">
      <a class="detalhes-jogo__voltar" href="./games.html"><i class="fa-solid fa-arrow-left"></i> Voltar para jogos</a>
      <section class="detalhes-jogo__hero" style="--jogo-imagem: url('${jogo.imagem}')" aria-labelledby="jogo-titulo">
        <div class="detalhes-jogo__hero-conteudo">
          <p class="detalhes-jogo__estudio">${escapeHTML(jogo.estudio)}</p>
          <h1 class="detalhes-jogo__titulo" id="jogo-titulo">${escapeHTML(jogo.titulo)}</h1>
          <p class="detalhes-jogo__descricao">${escapeHTML(descricoes[jogo.id] || 'Descubra uma nova experiência criada por desenvolvedores independentes brasileiros.')}</p>
          <div class="detalhes-jogo__avaliacao"><i class="fa-solid fa-star"></i> ${jogo.nota.toFixed(1)} <span>(${jogo.totalVotos} avaliações)</span></div>
          <div class="detalhes-jogo__tags">${tags}</div>
        </div>
      </section>

      <div class="detalhes-jogo__conteudo">
        <div class="detalhes-jogo__coluna">
          <section class="detalhes-jogo__painel"><h2>Sobre o jogo</h2><p>${escapeHTML(descricoes[jogo.id] || 'Uma experiência independente brasileira para descobrir, jogar e compartilhar.')}</p><p>Explore novos desafios, conheça personagens marcantes e mergulhe em um universo construído com criatividade e identidade.</p></section>
          <section class="detalhes-jogo__painel"><h2>Requisitos do sistema</h2><div class="detalhes-jogo__requisitos"><div><h3>Mínimo</h3><p><strong>SO:</strong> Windows 10</p><p><strong>Memória:</strong> 4 GB de RAM</p><p><strong>Armazenamento:</strong> 2 GB disponíveis</p></div><div><h3>Recomendado</h3><p><strong>SO:</strong> Windows 10 ou superior</p><p><strong>Memória:</strong> 8 GB de RAM</p><p><strong>Armazenamento:</strong> 4 GB disponíveis</p></div></div></section>
          <section class="detalhes-jogo__painel"><h2>Comunidade</h2><p><strong>João V.</strong> comentou: “Uma experiência brasileira muito criativa e gostosa de explorar.”</p><p><strong>Marina C.</strong> comentou: “A direção de arte e a trilha sonora fazem toda a diferença.”</p></section>
        </div>
        <aside class="detalhes-jogo__painel detalhes-jogo__compra" aria-label="Comprar jogo">
          <img src="${jogo.imagem}" alt="Capa de ${escapeHTML(jogo.titulo)}" class="w-100 rounded mb-3">
          <div class="detalhes-jogo__precos">${precoAntigo}<span class="detalhes-jogo__preco">${dinheiro(jogo.precoAtual)}</span>${desconto}</div>
          <button class="detalhes-jogo__comprar" type="button"><i class="fa-solid fa-cart-shopping"></i> Comprar agora</button>
          <div class="detalhes-jogo__acoes"><button class="detalhes-jogo__favorito" type="button"><i class="fa-regular fa-heart"></i> Lista de desejos</button></div>
          <div class="detalhes-jogo__lista mt-4"><p><strong>Gêneros</strong>${jogo.generos.join(', ')}</p><p><strong>Plataformas</strong>${plataformas}</p><p><strong>Desenvolvedora</strong>${escapeHTML(jogo.estudio)}</p></div>
        </aside>
      </div>
    </div>`;

  const comprar = container.querySelector('.detalhes-jogo__comprar');
  const favorito = container.querySelector('.detalhes-jogo__favorito');
  comprar.addEventListener('click', () => {
    comprar.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado ao carrinho';
    comprar.disabled = true;
  });
  favorito.addEventListener('click', () => {
    favorito.classList.toggle('ativo');
    favorito.innerHTML = favorito.classList.contains('ativo')
      ? '<i class="fa-solid fa-heart"></i> Na lista de desejos'
      : '<i class="fa-regular fa-heart"></i> Lista de desejos';
  });
})();

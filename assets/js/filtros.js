/**
 * ============================================================
 *  IARA GAMES – Sistema de filtros da página de jogos
 * ============================================================
 *
 *  Responsável por:
 *  - Renderizar cards de jogos dinamicamente a partir de JOGOS_DATA
 *  - Ler query params (?filtro=pausa) e pré-selecionar filtros
 *  - Filtrar por busca, gêneros, preço, momentos, plataformas e tags
 *  - Ordenar por relevância, preço, nome
 *  - Atualizar o contador de resultados
 */

(function () {
  'use strict';

  const gradeContainer = document.querySelector('.biblioteca__grade');
  const contadorTotal = document.querySelector('.biblioteca__total');
  const selectOrdenacao = document.getElementById('ordenacao');
  const inputBusca = document.querySelector('.busca-jogos__input');
  const painelFiltros = document.querySelector('.busca-jogos__painel-filtros');
  const filtroToggle = document.getElementById('filtro-toggle');
  const paginacao = document.querySelector('.paginacao');
  const ordenacaoContainer = document.querySelector('.biblioteca__ordenacao');

  const checkboxesGeneros = painelFiltros.querySelectorAll('[data-filtro-grupo="generos"] input[type="checkbox"]');
  const radiosPreco = painelFiltros.querySelectorAll('[data-filtro-grupo="preco"] input[type="radio"]');
  const checkboxesMomentos = painelFiltros.querySelectorAll('[data-filtro-grupo="momentos"] input[type="checkbox"]');
  const checkboxesPlataformas = painelFiltros.querySelectorAll('[data-filtro-grupo="plataformas"] input[type="checkbox"]');
  const checkboxesTags = painelFiltros.querySelectorAll('[data-filtro-grupo="tags"] input[type="checkbox"]');

  function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function normalizarTexto(texto) {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function valoresSelecionados(checkboxes) {
    return Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.dataset.value);
  }

  function valorRadioSelecionado(radios) {
    const selecionado = Array.from(radios).find((r) => r.checked);
    return selecionado ? selecionado.dataset.value : 'todos';
  }

  function criarCardHTML(jogo) {
    const temDesconto = jogo.desconto !== null && jogo.desconto > 0;
    const seloDesconto = temDesconto
      ? `<span class="secao-lancamentos__selo-desconto badge position-absolute top-0 end-0 m-3 z-2">-${jogo.desconto}%</span>`
      : '';

    const precoAntigoHTML = jogo.precoOriginal
      ? `<span class="preco-antigo">${formatarPreco(jogo.precoOriginal)}</span>`
      : '';

    const classPreco = jogo.precoOriginal ? 'secao-lancamentos__preco-novo' : 'secao-lancamentos__preco-novo';

    return `
      <div class="secao-lancamentos__envolucro-cartao col" data-jogo-id="${jogo.id}">
        <article class="secao-lancamentos__cartao card border-0 h-100 text-light">
          <a href="./game-details.html?jogo=${encodeURIComponent(jogo.id)}" class="link-cobre-card" aria-label="Ver ${jogo.titulo}"></a>
          <div class="secao-lancamentos__imagem-envolucro">
            <img src="${jogo.imagem}" alt="${jogo.titulo}"
              class="secao-lancamentos__imagem card-img-top" loading="lazy" />
            ${seloDesconto}
          </div>
          <div class="secao-lancamentos__info card-body d-flex flex-column">
            <h2 class="secao-lancamentos__titulo-jogo card-title">${jogo.titulo}</h2>
            <p class="secao-lancamentos__estudio card-text">${jogo.estudio}</p>
            <div class="secao-lancamentos__avaliacao">
              <i class="fa-solid fa-star secao-lancamentos__icone-estrela"></i>
              <span class="secao-lancamentos__nota">${jogo.nota.toFixed(1)}</span>
              <span class="secao-lancamentos__total-votos">(${jogo.totalVotos})</span>
            </div>
            <div class="secao-lancamentos__bloco-preco">
              ${precoAntigoHTML}
              <span class="${classPreco}">${formatarPreco(jogo.precoAtual)}</span>
            </div>
          </div>
        </article>
      </div>`;
  }

  function renderizarJogos(jogos) {
    gradeContainer.innerHTML = jogos.map(criarCardHTML).join('');
    contadorTotal.textContent = `${jogos.length} jogo${jogos.length !== 1 ? 's' : ''} encontrado${jogos.length !== 1 ? 's' : ''}`;

    if (paginacao) {
      paginacao.style.display = jogos.length === 0 ? 'none' : '';
    }
    if (ordenacaoContainer) {
      ordenacaoContainer.style.display = jogos.length === 0 ? 'none' : '';
    }
  }

  function filtrarJogos() {
    let resultados = [...JOGOS_DATA];

    const termoBusca = normalizarTexto((inputBusca.value || '').trim());
    if (termoBusca) {
      resultados = resultados.filter(
        (j) =>
          [j.titulo, j.estudio, ...j.generos, ...j.momentos, ...j.plataformas, ...j.tags]
            .some((campo) => normalizarTexto(campo).includes(termoBusca))
      );
    }

    const generosSel = valoresSelecionados(checkboxesGeneros);
    if (generosSel.length > 0) {
      resultados = resultados.filter((j) =>
        generosSel.some((g) => j.generos.includes(g))
      );
    }

    const precoSel = valorRadioSelecionado(radiosPreco);
    switch (precoSel) {
      case 'gratuito':
        resultados = resultados.filter((j) => j.precoAtual === 0);
        break;
      case 'ate-20':
        resultados = resultados.filter((j) => j.precoAtual <= 20);
        break;
      case '20-50':
        resultados = resultados.filter((j) => j.precoAtual >= 20 && j.precoAtual <= 50);
        break;
      case 'acima-50':
        resultados = resultados.filter((j) => j.precoAtual > 50);
        break;
    }

    const momentosSel = valoresSelecionados(checkboxesMomentos);
    if (momentosSel.length > 0) {
      resultados = resultados.filter((j) =>
        momentosSel.some((m) => j.momentos.includes(m))
      );
    }

    const plataformasSel = valoresSelecionados(checkboxesPlataformas);
    if (plataformasSel.length > 0) {
      resultados = resultados.filter((j) =>
        plataformasSel.some((p) => j.plataformas.includes(p))
      );
    }

    const tagsSel = valoresSelecionados(checkboxesTags);
    if (tagsSel.length > 0) {
      resultados = resultados.filter((j) =>
        tagsSel.some((t) => j.tags.includes(t))
      );
    }

    const ordem = selectOrdenacao.value;
    switch (ordem) {
      case 'menor-preco':
        resultados.sort((a, b) => a.precoAtual - b.precoAtual);
        break;
      case 'maior-preco':
        resultados.sort((a, b) => b.precoAtual - a.precoAtual);
        break;
      case 'a-z':
        resultados.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
        break;
      case 'z-a':
        resultados.sort((a, b) => b.titulo.localeCompare(a.titulo, 'pt-BR'));
        break;
      default:
        resultados.sort((a, b) => b.nota - a.nota);
        break;
    }

    renderizarJogos(resultados);
  }

  function aplicarFiltrosDaURL() {
    const params = new URLSearchParams(window.location.search);
    const filtroMomento = params.get('filtro');
    const termoBusca = params.get('search');

    if (termoBusca) inputBusca.value = termoBusca;

    if (filtroMomento) {
      const mapa = {
        pausa: 'pausa',
        calmaria: 'calmaria',
        raizes: 'raizes',
        resenha: 'resenha',
      };

      const valor = mapa[filtroMomento];
      if (valor) {
        checkboxesMomentos.forEach((cb) => {
          if (cb.dataset.value === valor) {
            cb.checked = true;
          }
        });
      }
    }
  }

  const btnPesquisa = document.querySelector('.busca-jogos__btn-pesquisa');
  if (btnPesquisa) {
    btnPesquisa.addEventListener('click', (e) => {
      e.preventDefault();
      filtrarJogos();
    });
  }

  inputBusca.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filtrarJogos();
    }
  });

  if (filtroToggle) {
    filtroToggle.addEventListener('change', () => {
      if (!filtroToggle.checked) {
        filtrarJogos();
      }
    });
  }

  selectOrdenacao.addEventListener('change', filtrarJogos);

  aplicarFiltrosDaURL();
  filtrarJogos();
})();

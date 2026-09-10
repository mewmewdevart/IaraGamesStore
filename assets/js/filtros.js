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

  /* ──────────────────── DOM References ──────────────────── */
  const gradeContainer = document.querySelector('.biblioteca__grade');
  const contadorTotal = document.querySelector('.biblioteca__total');
  const selectOrdenacao = document.getElementById('ordenacao');
  const inputBusca = document.querySelector('.busca-jogos__input');
  const painelFiltros = document.querySelector('.busca-jogos__painel-filtros');
  const filtroToggle = document.getElementById('filtro-toggle');

  // Grupos de filtros
  const checkboxesGeneros = painelFiltros.querySelectorAll('[data-filtro-grupo="generos"] input[type="checkbox"]');
  const radiosPreco = painelFiltros.querySelectorAll('[data-filtro-grupo="preco"] input[type="radio"]');
  const checkboxesMomentos = painelFiltros.querySelectorAll('[data-filtro-grupo="momentos"] input[type="checkbox"]');
  const checkboxesPlataformas = painelFiltros.querySelectorAll('[data-filtro-grupo="plataformas"] input[type="checkbox"]');
  const checkboxesTags = painelFiltros.querySelectorAll('[data-filtro-grupo="tags"] input[type="checkbox"]');

  /* ──────────────────── Utilitários ──────────────────── */

  /** Formata número como moeda BRL */
  function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /** Retorna valores selecionados de um NodeList de checkboxes */
  function valoresSelecionados(checkboxes) {
    return Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.dataset.value);
  }

  /** Retorna o valor selecionado de um NodeList de radios */
  function valorRadioSelecionado(radios) {
    const selecionado = Array.from(radios).find((r) => r.checked);
    return selecionado ? selecionado.dataset.value : 'todos';
  }

  /* ──────────────────── Renderização ──────────────────── */

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
          <a href="#" class="link-cobre-card" aria-label="Ver ${jogo.titulo}"></a>
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
  }

  /* ──────────────────── Filtragem ──────────────────── */

  function filtrarJogos() {
    let resultados = [...JOGOS_DATA];

    // 1) Busca por texto
    const termoBusca = (inputBusca.value || '').trim().toLowerCase();
    if (termoBusca) {
      resultados = resultados.filter(
        (j) =>
          j.titulo.toLowerCase().includes(termoBusca) ||
          j.estudio.toLowerCase().includes(termoBusca) ||
          j.tags.some((t) => t.toLowerCase().includes(termoBusca))
      );
    }

    // 2) Gêneros (OR dentro do grupo)
    const generosSel = valoresSelecionados(checkboxesGeneros);
    if (generosSel.length > 0) {
      resultados = resultados.filter((j) =>
        generosSel.some((g) => j.generos.includes(g))
      );
    }

    // 3) Preço
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
      // 'todos' — sem filtro
    }

    // 4) Momentos (OR dentro do grupo)
    const momentosSel = valoresSelecionados(checkboxesMomentos);
    if (momentosSel.length > 0) {
      resultados = resultados.filter((j) =>
        momentosSel.some((m) => j.momentos.includes(m))
      );
    }

    // 5) Plataformas (OR dentro do grupo)
    const plataformasSel = valoresSelecionados(checkboxesPlataformas);
    if (plataformasSel.length > 0) {
      resultados = resultados.filter((j) =>
        plataformasSel.some((p) => j.plataformas.includes(p))
      );
    }

    // 6) Tags (OR dentro do grupo)
    const tagsSel = valoresSelecionados(checkboxesTags);
    if (tagsSel.length > 0) {
      resultados = resultados.filter((j) =>
        tagsSel.some((t) => j.tags.includes(t))
      );
    }

    // Ordenação
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
      // 'relevancia' — ordem original (por nota decrescente)
      default:
        resultados.sort((a, b) => b.nota - a.nota);
        break;
    }

    renderizarJogos(resultados);
  }

  /* ──────────────────── Query Params ──────────────────── */

  function aplicarFiltrosDaURL() {
    const params = new URLSearchParams(window.location.search);
    const filtroMomento = params.get('filtro');

    if (filtroMomento) {
      // Mapeia valor do URL para o data-value do checkbox
      const mapa = {
        pausa: 'pausa',
        calmaria: 'calmaria',
        raizes: 'raizes',
        resenha: 'resenha',
      };

      const valor = mapa[filtroMomento];
      if (valor) {
        // Marca o checkbox correspondente
        checkboxesMomentos.forEach((cb) => {
          if (cb.dataset.value === valor) {
            cb.checked = true;
          }
        });

        // Abre o painel de filtros
        if (filtroToggle) {
          filtroToggle.checked = true;
        }
      }
    }
  }

  /* ──────────────────── Event Listeners ──────────────────── */

  // Busca por texto (com debounce leve)
  let buscaTimer;
  inputBusca.addEventListener('input', () => {
    clearTimeout(buscaTimer);
    buscaTimer = setTimeout(filtrarJogos, 300);
  });

  // Ordenação
  selectOrdenacao.addEventListener('change', filtrarJogos);

  // Todos os checkboxes e radios dos filtros
  const todosInputsFiltro = painelFiltros.querySelectorAll('input[type="checkbox"], input[type="radio"]');
  todosInputsFiltro.forEach((input) => {
    input.addEventListener('change', filtrarJogos);
  });

  /* ──────────────────── Inicialização ──────────────────── */

  aplicarFiltrosDaURL();
  filtrarJogos();
})();

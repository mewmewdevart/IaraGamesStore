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

  const ITENS_POR_PAGINA = 15;
  const gradeContainer = document.querySelector('.biblioteca__grade');
  const contadorTotal = document.querySelector('.biblioteca__total');
  const selectOrdenacao = document.getElementById('ordenacao');
  const inputBusca = document.querySelector('.busca-jogos__input');
  const painelFiltros = document.querySelector('.busca-jogos__painel-filtros');
  const filtroToggle = document.getElementById('filtro-toggle');
  const paginacaoNav = document.querySelector('.paginacao');
  const ordenacaoContainer = document.querySelector('.biblioteca__ordenacao');
  const biblioteca = document.querySelector('.biblioteca');
  const subtituloEl = document.querySelector('.biblioteca__subtitulo');
  const tituloEl = document.querySelector('.biblioteca__titulo');

  const checkboxesGeneros = painelFiltros.querySelectorAll('[data-filtro-grupo="generos"] input[type="checkbox"]');
  const radiosPreco = painelFiltros.querySelectorAll('[data-filtro-grupo="preco"] input[type="radio"]');
  const checkboxesMomentos = painelFiltros.querySelectorAll('[data-filtro-grupo="momentos"] input[type="checkbox"]');
  const checkboxesPlataformas = painelFiltros.querySelectorAll('[data-filtro-grupo="plataformas"] input[type="checkbox"]');
  const checkboxesTags = painelFiltros.querySelectorAll('[data-filtro-grupo="tags"] input[type="checkbox"]');

  let secaoAtiva = null;

  let resultadosAtuais = [];
  let paginaAtual = 1;

  function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
          <a href="./game-details.html?jogo=${jogo.id}" class="link-cobre-card" aria-label="Ver ${jogo.titulo}"></a>
          <div class="secao-lancamentos__imagem-envolucro">
            <img src="${jogo.imagem}" alt="${jogo.titulo}"
              class="secao-lancamentos__imagem card-img-top" loading="lazy"
              onerror="this.onerror=null; this.src='./assets/img/capa-indisponivel.svg'; this.classList.add('secao-lancamentos__imagem--sem-capa');" />
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
  }


  function totalDePaginas() {
    return Math.max(1, Math.ceil(resultadosAtuais.length / ITENS_POR_PAGINA));
  }

  function criarBotaoPagina(rotulo, opcoes) {
    opcoes = opcoes || {};
    const el = document.createElement(opcoes.tag === 'span' ? 'span' : 'a');
    el.className = 'paginacao__item';
    if (opcoes.ativo) {
      el.classList.add('paginacao__item--ativo');
      el.setAttribute('aria-current', 'page');
    }
    if (opcoes.seta) el.classList.add('paginacao__item--seta');
    if (opcoes.reticencias) el.classList.add('paginacao__item--reticencias');
    if (opcoes.ariaLabel) el.setAttribute('aria-label', opcoes.ariaLabel);
    el.innerHTML = rotulo;

    if (el.tagName === 'A') {
      el.href = '#';
      if (opcoes.desabilitado) {
        el.classList.add('disabled');
        el.setAttribute('aria-disabled', 'true');
        el.tabIndex = -1;
      } else if (typeof opcoes.aoClicar === 'function') {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          opcoes.aoClicar();
        });
      }
    }
    return el;
  }

  function irParaPagina(numero) {
    const total = totalDePaginas();
    paginaAtual = Math.min(Math.max(1, numero), total);
    renderizarPaginaAtual();

        if (biblioteca) biblioteca.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderizarPaginacao() {
    if (!paginacaoNav) return;

    const total = totalDePaginas();
    paginacaoNav.innerHTML = '';

    if (resultadosAtuais.length === 0 || total <= 1) {
      paginacaoNav.style.display = 'none';
      return;
    }
    paginacaoNav.style.display = '';

    paginacaoNav.appendChild(criarBotaoPagina('<i class="fa-solid fa-chevron-left"></i>', {
      seta: true,
      ariaLabel: 'Página anterior',
      desabilitado: paginaAtual === 1,
      aoClicar: function () { irParaPagina(paginaAtual - 1); },
    }));

        const paginasParaMostrar = new Set([1, total, paginaAtual, paginaAtual - 1, paginaAtual + 1]);
    let anteriorMostrada = 0;

    for (let n = 1; n <= total; n++) {
      if (!paginasParaMostrar.has(n)) continue;

      if (n - anteriorMostrada > 1) {
        paginacaoNav.appendChild(criarBotaoPagina('...', { tag: 'span', reticencias: true }));
      }

      paginacaoNav.appendChild(criarBotaoPagina(String(n), {
        ativo: n === paginaAtual,
        aoClicar: function () { irParaPagina(n); },
      }));

      anteriorMostrada = n;
    }

    paginacaoNav.appendChild(criarBotaoPagina('<i class="fa-solid fa-chevron-right"></i>', {
      seta: true,
      ariaLabel: 'Próxima página',
      desabilitado: paginaAtual === total,
      aoClicar: function () { irParaPagina(paginaAtual + 1); },
    }));
  }

  function renderizarPaginaAtual() {
    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fatia = resultadosAtuais.slice(inicio, inicio + ITENS_POR_PAGINA);

    renderizarJogos(fatia);
    contadorTotal.textContent =
      `${resultadosAtuais.length} jogo${resultadosAtuais.length !== 1 ? 's' : ''} encontrado${resultadosAtuais.length !== 1 ? 's' : ''}`;

    if (ordenacaoContainer) {
      ordenacaoContainer.style.display = resultadosAtuais.length === 0 ? 'none' : '';
    }
    renderizarPaginacao();
  }


  function filtrarJogos() {
    let resultados = [...JOGOS_DATA];

    const termoBusca = (inputBusca.value || '').trim().toLowerCase();
    if (termoBusca) {
      resultados = resultados.filter(
        (j) =>
          j.titulo.toLowerCase().includes(termoBusca) ||
          j.estudio.toLowerCase().includes(termoBusca) ||
          j.tags.some((t) => t.toLowerCase().includes(termoBusca))
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

        if (secaoAtiva === 'promocoes') {
      resultados = resultados.filter((j) => j.desconto !== null && j.desconto > 0);
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

    resultadosAtuais = resultados;
    paginaAtual = 1;     renderizarPaginaAtual();
  }


  function aplicarFiltrosDaURL() {
    const params = new URLSearchParams(window.location.search);
    const filtroMomento = params.get('filtro');
    const secao = params.get('secao');
    const termoBusca = params.get('search');

    if (termoBusca && inputBusca) {
      inputBusca.value = termoBusca;
    }

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

        const secoesValidas = {
      'mais-vendidos': { ordenar: 'relevancia', subtitulo: 'Os queridinhos da galera', titulo: 'Mais Vendidos' },
      'lancamentos': { ordenar: 'relevancia', subtitulo: 'Chegou fresquinho', titulo: 'Lançamentos' },
      'promocoes': { ordenar: 'relevancia', subtitulo: 'Ofertas por tempo limitado', titulo: 'Promoções' },
    };

    if (secao && secoesValidas[secao]) {
      secaoAtiva = secao;
      const config = secoesValidas[secao];
      selectOrdenacao.value = config.ordenar;
      if (subtituloEl) subtituloEl.textContent = config.subtitulo;
      if (tituloEl) tituloEl.textContent = config.titulo;
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


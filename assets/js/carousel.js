/**
 * Iara Games – Módulo de Carrosseis
 *
 * 1. CarrosselHero      → hero principal: slides, dots, auto-play, swipe, teclado
 * 2. CarrosselSecao     → scroll-snap horizontal com setas (Lançamentos, etc.)
 * 3. CarrosselDestaque  → destaque rotativo: card grande + fila de miniaturas
 *                         (seção "Dia do Consumidor")
 */

'use strict';

/* ============================================================
   1. CARROSSEL HERO
   ============================================================ */
function CarrosselHero(raiz, opcoes) {
  if (!raiz) return;

  const cfg = Object.assign({ intervalo: 6000, limiarSwipe: 50 }, opcoes);

  const slides      = Array.from(raiz.querySelectorAll('.carrossel-principal__slide-item'));
  const dots        = Array.from(raiz.querySelectorAll('.carrossel-principal__dot'));
  const btnAnterior = raiz.querySelector('.carrossel-principal__btn-anterior');
  const btnProximo  = raiz.querySelector('.carrossel-principal__btn-proximo');

  if (!slides.length || !dots.length) return;

  let indiceAtual  = 0;
  let timer        = null;
  let touchInicioX = 0;

  slides.forEach(function (slide, i) {
    slide.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', (i + 1) + ' de ' + slides.length);
  });

  sincronizarDots(0);

  function irPara(prox, moverFoco) {
    if (prox === indiceAtual) return;
    slides[indiceAtual].setAttribute('aria-hidden', 'true');
    slides[indiceAtual].classList.remove('carrossel-principal__slide-item--ativo');
    indiceAtual = prox;
    slides[indiceAtual].setAttribute('aria-hidden', 'false');
    slides[indiceAtual].classList.add('carrossel-principal__slide-item--ativo');
    sincronizarDots(indiceAtual);
    if (moverFoco) dots[indiceAtual].focus();
  }

  function proximo()   { irPara((indiceAtual + 1) % slides.length, false); }
  function anterior()  { irPara((indiceAtual - 1 + slides.length) % slides.length, false); }

  function sincronizarDots(idx) {
    dots.forEach(function (dot, i) {
      const ativo = i === idx;
      dot.classList.toggle('carrossel-principal__dot--ativo', ativo);
      dot.setAttribute('aria-selected', ativo ? 'true' : 'false');
      dot.setAttribute('tabindex', ativo ? '0' : '-1');
    });
  }

  dots.forEach(function (dot, i) {
    dot.dataset.slideIndex = String(i);
    dot.addEventListener('click', function () { pararAutoPlay(); irPara(i, false); iniciarAutoPlay(); });
  });

  if (btnAnterior) btnAnterior.addEventListener('click', function () { pararAutoPlay(); anterior(); iniciarAutoPlay(); });
  if (btnProximo)  btnProximo.addEventListener('click',  function () { pararAutoPlay(); proximo();  iniciarAutoPlay(); });

  raiz.addEventListener('keydown', function (e) {
    if (!dots.includes(document.activeElement)) return;
    const total = slides.length;
    let prox = indiceAtual, tratado = true;
    switch (e.key) {
      case 'ArrowRight': prox = (indiceAtual + 1) % total;         break;
      case 'ArrowLeft':  prox = (indiceAtual - 1 + total) % total; break;
      case 'Home':       prox = 0;                                  break;
      case 'End':        prox = total - 1;                          break;
      default:           tratado = false;
    }
    if (tratado) { e.preventDefault(); pararAutoPlay(); irPara(prox, true); iniciarAutoPlay(); }
  });

  raiz.addEventListener('touchstart', function (e) { touchInicioX = e.touches[0].clientX; }, { passive: true });
  raiz.addEventListener('touchend',   function (e) {
    const delta = touchInicioX - e.changedTouches[0].clientX;
    if (Math.abs(delta) >= cfg.limiarSwipe) { pararAutoPlay(); delta > 0 ? proximo() : anterior(); iniciarAutoPlay(); }
  }, { passive: true });

  raiz.addEventListener('mouseenter', pararAutoPlay);
  raiz.addEventListener('mouseleave', iniciarAutoPlay);
  raiz.addEventListener('focusin',    pararAutoPlay);
  raiz.addEventListener('focusout',   function (e) { if (!raiz.contains(e.relatedTarget)) iniciarAutoPlay(); });

  function iniciarAutoPlay() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(proximo, cfg.intervalo);
  }
  function pararAutoPlay() { clearInterval(timer); timer = null; }

  slides[0].classList.add('carrossel-principal__slide-item--ativo');
  iniciarAutoPlay();
}


/* ============================================================
   2. CARROSSEL DE SEÇÃO (scroll-snap + setas)
   ============================================================ */
function CarrosselSecao(secao, opcoes) {
  if (!secao) return;

  const cfg = Object.assign({
    seletorTrilho: '[class*="__grade"]',
    seletorCards:  '.col',
    limiarSwipe:   50,
  }, opcoes);

  const trilho = secao.querySelector(cfg.seletorTrilho);
  if (!trilho) return;

  const cards = Array.from(trilho.querySelectorAll(cfg.seletorCards));
  if (cards.length < 2) return;

  const idTrilho = 'carrossel-trilho-' + Math.random().toString(36).slice(2, 7);
  trilho.setAttribute('role', 'region');
  trilho.setAttribute('aria-label', secao.querySelector('h2')?.textContent?.trim() || 'Carrossel');
  trilho.id = idTrilho;

  cards.forEach(function (card, i) {
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', (i + 1) + ' de ' + cards.length);
  });

  const cabecalho = secao.querySelector('[class*="__cabecalho"]');
  const controles = criarControles(idTrilho);
  if (cabecalho) cabecalho.appendChild(controles.wrapper);
  else trilho.before(controles.wrapper);

  function criarControles(idAlvo) {
    const wrapper = document.createElement('div');
    wrapper.className = 'carrossel-secao__controles';
    wrapper.setAttribute('aria-controls', idAlvo);

    const btnAnt  = document.createElement('button');
    btnAnt.className = 'carrossel-secao__btn carrossel-secao__btn--anterior';
    btnAnt.setAttribute('aria-label', 'Slide anterior');
    btnAnt.innerHTML = '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>';

    const btnProx = document.createElement('button');
    btnProx.className = 'carrossel-secao__btn carrossel-secao__btn--proximo';
    btnProx.setAttribute('aria-label', 'Próximo slide');
    btnProx.innerHTML = '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>';

    wrapper.appendChild(btnAnt);
    wrapper.appendChild(btnProx);
    return { wrapper, btnAnt, btnProx };
  }

  function larguraCard() {
    return cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(trilho).gap || 0);
  }
  function cardsPorVista() { return Math.max(1, Math.round(trilho.clientWidth / larguraCard())); }
  function rolarPara(dir)  { trilho.scrollBy({ left: dir * larguraCard() * cardsPorVista(), behavior: 'smooth' }); }

  controles.btnAnt.addEventListener('click', function () { rolarPara(-1); });
  controles.btnProx.addEventListener('click', function () { rolarPara(1); });

  function atualizarBotoes() {
    const noInicio = trilho.scrollLeft <= 4;
    const noFim    = trilho.scrollLeft >= trilho.scrollWidth - trilho.clientWidth - 4;
    controles.btnAnt.disabled = noInicio;
    controles.btnAnt.setAttribute('aria-disabled', String(noInicio));
    controles.btnProx.disabled = noFim;
    controles.btnProx.setAttribute('aria-disabled', String(noFim));
  }

  trilho.addEventListener('scroll', atualizarBotoes, { passive: true });
  atualizarBotoes();

  let touchInicioX = 0;
  trilho.addEventListener('touchstart', function (e) { touchInicioX = e.touches[0].clientX; }, { passive: true });
  trilho.addEventListener('touchend',   function (e) {
    const delta = touchInicioX - e.changedTouches[0].clientX;
    if (Math.abs(delta) >= cfg.limiarSwipe) rolarPara(delta > 0 ? 1 : -1);
  }, { passive: true });

  trilho.setAttribute('tabindex', '0');
  trilho.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); rolarPara(1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); rolarPara(-1); }
  });
}


/* ============================================================
   3. CARROSSEL DESTAQUE — card grande + fila de miniaturas
   ============================================================
   
   Estrutura HTML esperada (seção "Dia do Consumidor"):

     <section class="secao-consumidor" data-carrossel-destaque>
       <header class="secao-consumidor__cabecalho">...</header>
       <div class="secao-consumidor__grade">

         <!-- LINHA SUPERIOR: destaque (col-lg-6) + 3 miniaturas (col-lg-2) -->
         <div class="row g-3 mx-0 mb-3" data-destaque-linha>
           <div class="col-12 col-lg-6" data-destaque-item="0">...</div>
           <div class="col-12 col-md-4 col-lg-2" data-destaque-item="1">...</div>
           <div class="col-12 col-md-4 col-lg-2" data-destaque-item="2">...</div>
           <div class="col-12 col-md-4 col-lg-2" data-destaque-item="3">...</div>
         </div>

         <!-- LINHA INFERIOR: lista de cards pequenos (não rotaciona) -->
         <div class="row row-cols-... g-3 mx-0">...</div>

       </div>
     </section>

   Como funciona:
   - Os 4 itens da linha superior são os "candidatos a destaque".
   - Cada clique numa miniatura (col-lg-2) promove ela para col-lg-6 e
     rebaixa o destaque atual para col-lg-2 com animação suave.
   - Auto-play opcional (desabilitado por padrão para não distrair).
   - Botões ‹ › injetados no cabeçalho.
   ============================================================ */

/**
 * @param {HTMLElement} secao
 * @param {Object}      [opcoes]
 * @param {boolean}     [opcoes.autoPlay=false]
 * @param {number}      [opcoes.intervalo=5000]
 */
function CarrosselDestaque(secao, opcoes) {
  if (!secao) return;

  const cfg = Object.assign({ autoPlay: false, intervalo: 5000 }, opcoes);

  /* ── Encontra a linha com data-destaque-linha ── */
  const linha = secao.querySelector('[data-destaque-linha]');
  if (!linha) return;

  const itens = Array.from(linha.querySelectorAll('[data-destaque-item]'));
  if (itens.length < 2) return;

  const total = itens.length;
  let indiceAtual = 0;   /* índice do item atualmente em destaque */
  let timer = null;

  /* ── Classes que controlam o tamanho ── */
  const CLS_DESTAQUE   = 'secao-consumidor__card--destaque-ativo';   /* ocupa col-lg-6 */
  const CLS_MINIATURA  = 'secao-consumidor__card--miniatura';        /* ocupa col-lg-2 */
  const CLS_SAINDO     = 'secao-consumidor__card--saindo';
  const CLS_ENTRANDO   = 'secao-consumidor__card--entrando';

  /* ── Estado inicial: marca o item 0 como destaque ── */
  itens.forEach(function (item, i) {
    item.setAttribute('aria-label', (i + 1) + ' de ' + total);
    item.setAttribute('role', 'group');
    if (i === 0) {
      item.classList.add(CLS_DESTAQUE);
    } else {
      item.classList.add(CLS_MINIATURA);
      /* Miniaturas são clicáveis para virar destaque */
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
        pararAutoPlay();
        irPara(i);
        iniciarAutoPlay();
      });
      /* Acessibilidade: Enter/Space nas miniaturas */
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pararAutoPlay();
          irPara(i);
          iniciarAutoPlay();
        }
      });
    }
  });

  /* ── Navegação ── */
  function irPara(prox) {
    if (prox === indiceAtual) return;

    const anterior = itens[indiceAtual];
    const entrante = itens[prox];

    /* Animação: destaque atual → saindo */
    anterior.classList.add(CLS_SAINDO);
    anterior.classList.remove(CLS_DESTAQUE);

    /* Animação: miniatura clicada → entrando */
    entrante.classList.add(CLS_ENTRANDO);
    entrante.classList.remove(CLS_MINIATURA);
    entrante.style.cursor = '';
    entrante.removeAttribute('tabindex');

    /* Após a transição CSS (300 ms) consolida os estados */
    setTimeout(function () {
      anterior.classList.remove(CLS_SAINDO);
      anterior.classList.add(CLS_MINIATURA);
      anterior.style.cursor = 'pointer';
      anterior.setAttribute('tabindex', '0');

      entrante.classList.remove(CLS_ENTRANDO);
      entrante.classList.add(CLS_DESTAQUE);

      indiceAtual = prox;
      sincronizarDots();
    }, 300);
  }

  function proximo()  { irPara((indiceAtual + 1) % total); }
  function anterior() { irPara((indiceAtual - 1 + total) % total); }

  /* ── Dots / indicadores ── */
  const dotsWrapper = document.createElement('div');
  dotsWrapper.className = 'destaque-dots';
  dotsWrapper.setAttribute('role', 'tablist');
  dotsWrapper.setAttribute('aria-label', 'Selecionar destaque');

  const dots = itens.map(function (_, i) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'destaque-dot' + (i === 0 ? ' destaque-dot--ativo' : '');
    dot.setAttribute('aria-label', 'Destaque ' + (i + 1) + ' de ' + total);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.setAttribute('tabindex', i === 0 ? '0' : '-1');
    dot.addEventListener('click', function () {
      pararAutoPlay();
      irPara(i);
      iniciarAutoPlay();
    });
    dotsWrapper.appendChild(dot);
    return dot;
  });

  function sincronizarDots() {
    dots.forEach(function (dot, i) {
      const ativo = i === indiceAtual;
      dot.classList.toggle('destaque-dot--ativo', ativo);
      dot.setAttribute('aria-selected', String(ativo));
      dot.setAttribute('tabindex', ativo ? '0' : '-1');
    });
  }

  /* Navegação por teclado nos dots */
  dotsWrapper.addEventListener('keydown', function (e) {
    if (!dots.includes(document.activeElement)) return;
    let prox = indiceAtual, tratado = true;
    switch (e.key) {
      case 'ArrowRight': prox = (indiceAtual + 1) % total;         break;
      case 'ArrowLeft':  prox = (indiceAtual - 1 + total) % total; break;
      case 'Home':       prox = 0;                                  break;
      case 'End':        prox = total - 1;                          break;
      default:           tratado = false;
    }
    if (tratado) { e.preventDefault(); pararAutoPlay(); irPara(prox); iniciarAutoPlay(); dots[prox].focus(); }
  });

  /* ── Botões ‹ › + dots injetados no cabeçalho ── */
  const cabecalho = secao.querySelector('[class*="__cabecalho"]');

  const controles = document.createElement('div');
  controles.className = 'carrossel-secao__controles destaque-controles';

  const btnAnt = document.createElement('button');
  btnAnt.type = 'button';
  btnAnt.className = 'carrossel-secao__btn carrossel-secao__btn--anterior';
  btnAnt.setAttribute('aria-label', 'Destaque anterior');
  btnAnt.innerHTML = '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>';
  btnAnt.addEventListener('click', function () { pararAutoPlay(); anterior(); iniciarAutoPlay(); });

  const btnProx = document.createElement('button');
  btnProx.type = 'button';
  btnProx.className = 'carrossel-secao__btn carrossel-secao__btn--proximo';
  btnProx.setAttribute('aria-label', 'Próximo destaque');
  btnProx.innerHTML = '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>';
  btnProx.addEventListener('click', function () { pararAutoPlay(); proximo(); iniciarAutoPlay(); });

  controles.appendChild(btnAnt);
  controles.appendChild(dotsWrapper);
  controles.appendChild(btnProx);

  if (cabecalho) cabecalho.appendChild(controles);
  else linha.before(controles);

  /* ── Auto-play ── */
  function iniciarAutoPlay() {
    if (!cfg.autoPlay) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(proximo, cfg.intervalo);
  }
  function pararAutoPlay() { clearInterval(timer); timer = null; }

  secao.addEventListener('mouseenter', pararAutoPlay);
  secao.addEventListener('mouseleave', iniciarAutoPlay);
  secao.addEventListener('focusin',    pararAutoPlay);
  secao.addEventListener('focusout',   function (e) {
    if (!secao.contains(e.relatedTarget)) iniciarAutoPlay();
  });

  iniciarAutoPlay();
}


/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* Hero */
  CarrosselHero(document.querySelector('.carrossel-principal'));

  /* Destaque rotativo (Dia do Consumidor) */
  CarrosselDestaque(document.querySelector('[data-carrossel-destaque]'), {
    autoPlay:  true,
    intervalo: 5000,
  });

  /* Scroll-snap horizontal (Lançamentos e outras seções) */
  document.querySelectorAll('[data-carrossel-secao]').forEach(function (secao) {
    CarrosselSecao(secao);
  });

});
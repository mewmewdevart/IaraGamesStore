import './Games.css';
import React, { useRef, useState } from 'react';
import { jogos } from '../../data/catalogo';
import GameCard from '../../components/games/GameCard';
import { filtrarJogos } from './filtrarJogos';

const POR_PAGINA = 15;
const MOMENTOS = ['pausa', 'calmaria', 'raizes', 'resenha'];
const SECOES = new Map([
  ['mais-vendidos', ['Mais Vendidos', 'Os queridinhos da galera']],
  ['lancamentos', ['Lançamentos', 'Chegou fresquinho']],
  ['promocoes', ['Promoções', 'Ofertas por tempo limitado']],
]);

function Paginacao({ total, atual, navegar }) {
  return (
    <nav className="paginacao" aria-label="Paginação de jogos">
      <button type="button" className="paginacao__item paginacao__item--seta" aria-label="Página anterior" disabled={atual === 1} onClick={() => navegar(atual - 1)}>
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
      </button>
      {Array.from({ length: total }, (_, indice) => {
        const numero = indice + 1;
        const selecionada = atual === numero;
        return (
          <button key={numero} type="button" className={selecionada ? 'paginacao__item paginacao__item--ativo' : 'paginacao__item'}
            aria-current={selecionada ? 'page' : undefined} onClick={() => navegar(numero)}>
            {numero}
          </button>
        );
      })}
      <button type="button" className="paginacao__item paginacao__item--seta" aria-label="Próxima página" disabled={atual === total} onClick={() => navegar(atual + 1)}>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  );
}

export default function Games({ parametros }) {
  const momento = parametros.get('filtro');
  const nomeSecao = parametros.get('secao');
  const secao = SECOES.get(nomeSecao) || ['Acervo de Jogos', 'Catálogo completo'];
  const [termo, setTermo] = useState(parametros.get('search') || '');
  const [filtros, setFiltros] = useState({
    generos: [],
    momentos: MOMENTOS.includes(momento) ? [momento] : [],
    plataformas: [],
    tags: [],
  });
  const [preco, setPreco] = useState('todos');
  const [ordem, setOrdem] = useState('relevancia');
  const [pagina, setPagina] = useState(1);
  const acervo = useRef(null);
  const resultados = filtrarJogos(jogos, { termo, preco, ordem, nomeSecao, filtros });
  const totalPaginas = Math.ceil(resultados.length / POR_PAGINA);
  const visiveis = resultados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  function buscar(evento) {
    evento.preventDefault();
    setTermo(new FormData(evento.currentTarget).get('search'));
    setPagina(1);
  }

  function alternarFiltro(grupo, valor) {
    setFiltros((anteriores) => {
      const valores = anteriores[grupo];
      const selecionados = valores.includes(valor)
        ? valores.filter((item) => item !== valor)
        : [...valores, valor];
      return { ...anteriores, [grupo]: selecionados };
    });
    setPagina(1);
  }

  function alterarPreco(valor) {
    setPreco(valor);
    setPagina(1);
  }

  function alterarOrdem(valor) {
    setOrdem(valor);
    setPagina(1);
  }

  function navegar(numero) {
    setPagina(numero);
    acervo.current.scrollIntoView({ block: 'start' });
  }

  return (
    <main>
<section className="busca-jogos">
      <div className="busca-jogos__container w-100">
        <h3 className="busca-jogos__titulo">BUSCAR JOGOS</h3>
        <input type="checkbox" id="filtro-toggle" className="busca-jogos__filtro-toggle apenas-leitor" aria-label="Mostrar ou ocultar filtros" />
        <div className="busca-jogos__acoes d-flex flex-column flex-md-row gap-3 w-100">
          <form className="busca-jogos__input-wrapper flex-grow-1" role="search" onSubmit={buscar}>
            <input type="text" placeholder="Qual jogo você procura?" aria-label="Buscar jogos no catálogo"
              className="busca-jogos__input" name="search" defaultValue={termo} />
            <button type="submit" aria-label="Realizar busca" className="busca-jogos__btn-pesquisa"><i
                className="fa-solid fa-magnifying-glass"></i></button>
          </form>
          <label htmlFor="filtro-toggle"
            className="busca-jogos__btn-filtro d-flex justify-content-center align-items-center">
            <span className="texto-fechado"><i className="fa-solid fa-sliders"></i> Filtros</span>
            <span className="texto-aberto"><i className="fa-solid fa-magnifying-glass"></i> Buscar</span>
          </label>
        </div>
        <div className="busca-jogos__painel-filtros row g-4 w-100 mx-0">
          <div className="busca-jogos__filtro-grupo col-12 col-sm-6 col-lg-auto" data-filtro-grupo="generos">
            <h4 className="busca-jogos__filtro-titulo">Gêneros</h4>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.generos.includes("Estratégia")} onChange={() => alternarFiltro("generos", "Estratégia")} /> Estratégia</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.generos.includes("Horror")} onChange={() => alternarFiltro("generos", "Horror")} /> Horror</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.generos.includes("Indie")} onChange={() => alternarFiltro("generos", "Indie")} /> Indie</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.generos.includes("Aventura")} onChange={() => alternarFiltro("generos", "Aventura")} /> Aventura</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.generos.includes("Ação")} onChange={() => alternarFiltro("generos", "Ação")} /> Ação</label>
          </div>
          <div className="busca-jogos__filtro-grupo col-12 col-sm-6 col-lg-auto" data-filtro-grupo="preco">
            <h4 className="busca-jogos__filtro-titulo">Preço</h4>
            <label className="busca-jogos__filtro-opcao"><input type="radio" name="preco" checked={preco === "todos"} onChange={() => alterarPreco("todos")} /> Todos os
              preços</label>
            <label className="busca-jogos__filtro-opcao"><input type="radio" name="preco" checked={preco === "gratuito"} onChange={() => alterarPreco("gratuito")} /> Gratuito</label>
            <label className="busca-jogos__filtro-opcao"><input type="radio" name="preco" checked={preco === "ate-20"} onChange={() => alterarPreco("ate-20")} /> Até R$ 20,00</label>
            <label className="busca-jogos__filtro-opcao"><input type="radio" name="preco" checked={preco === "20-50"} onChange={() => alterarPreco("20-50")} /> R$ 20,00 a R$
              50,00</label>
            <label className="busca-jogos__filtro-opcao"><input type="radio" name="preco" checked={preco === "acima-50"} onChange={() => alterarPreco("acima-50")} /> Acima de R$
              50,00</label>
          </div>
          <div className="busca-jogos__filtro-grupo col-12 col-sm-6 col-lg-auto" data-filtro-grupo="momentos">
            <h4 className="busca-jogos__filtro-titulo">Momentos</h4>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.momentos.includes("pausa")} onChange={() => alternarFiltro("momentos", "pausa")} /> Na Pausa</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.momentos.includes("calmaria")} onChange={() => alternarFiltro("momentos", "calmaria")} /> Calmaria</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.momentos.includes("raizes")} onChange={() => alternarFiltro("momentos", "raizes")} /> Raízes</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.momentos.includes("resenha")} onChange={() => alternarFiltro("momentos", "resenha")} /> Resenha</label>
          </div>
          <div className="busca-jogos__filtro-grupo col-12 col-sm-6 col-lg-auto" data-filtro-grupo="plataformas">
            <h4 className="busca-jogos__filtro-titulo">Plataforma</h4>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.plataformas.includes("windows")} onChange={() => alternarFiltro("plataformas", "windows")} /> <i className="fa-brands fa-windows"
                style={{ 'width': '16px' }}></i> Windows</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.plataformas.includes("mac")} onChange={() => alternarFiltro("plataformas", "mac")} /> <i className="fa-brands fa-apple"
                style={{ 'width': '16px' }}></i> Mac</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.plataformas.includes("linux")} onChange={() => alternarFiltro("plataformas", "linux")} /> <i className="fa-brands fa-linux"
                style={{ 'width': '16px' }}></i> Linux</label>
            <label className="busca-jogos__filtro-opcao"><input type="checkbox" checked={filtros.plataformas.includes("mobile")} onChange={() => alternarFiltro("plataformas", "mobile")} /> <i
                className="fa-solid fa-mobile-screen" style={{ 'width': '16px' }}></i> Mobile</label>
          </div>
          <div className="busca-jogos__filtro-grupo busca-jogos__filtro-grupo--tags col-12 col-lg" data-filtro-grupo="tags">
            <h4 className="busca-jogos__filtro-titulo">Tags</h4>
            <div className="busca-jogos__filtro-tags-wrapper">
              <label className="busca-jogos__filtro-chip"><input type="checkbox"
                  className="apenas-leitor" checked={filtros.tags.includes("Aventura")} onChange={() => alternarFiltro("tags", "Aventura")} /><span>Aventura</span></label>
              <label className="busca-jogos__filtro-chip"><input type="checkbox"
                  className="apenas-leitor" checked={filtros.tags.includes("Ação")} onChange={() => alternarFiltro("tags", "Ação")} /><span>Ação</span></label>
              <label className="busca-jogos__filtro-chip"><input type="checkbox"
                  className="apenas-leitor" checked={filtros.tags.includes("Indie")} onChange={() => alternarFiltro("tags", "Indie")} /><span>Indie</span></label>
              <label className="busca-jogos__filtro-chip"><input type="checkbox"
                  className="apenas-leitor" checked={filtros.tags.includes("Metroidvania")} onChange={() => alternarFiltro("tags", "Metroidvania")} /><span>Metroidvania</span></label>
              <label className="busca-jogos__filtro-chip"><input type="checkbox"
                  className="apenas-leitor" checked={filtros.tags.includes("Pixel Art")} onChange={() => alternarFiltro("tags", "Pixel Art")} /><span>Pixel Art</span></label>
              <label className="busca-jogos__filtro-chip"><input type="checkbox"
                  className="apenas-leitor" checked={filtros.tags.includes("RPG")} onChange={() => alternarFiltro("tags", "RPG")} /><span>RPG</span></label>
            </div>
          </div>
        </div>
      </div>
    </section>
<div className="secao-banner-xilogravura">
      <section ref={acervo} className="biblioteca" aria-labelledby="biblioteca-titulo">
        <div className="biblioteca__cabecalho">
          <div>
            <p className="biblioteca__subtitulo">{secao[1]}</p>
            <h1 className="biblioteca__titulo" id="biblioteca-titulo">{secao[0]}</h1>
          </div>
          <div className="biblioteca__ordenacao-container">
            <p className="biblioteca__total" role="status">{resultados.length} {resultados.length === 1 ? "jogo encontrado" : "jogos encontrados"}</p>
            <div className="biblioteca__ordenacao">
              <label htmlFor="ordenacao" className="biblioteca__ordenacao-label">Ordenar por:</label>
              <div className="biblioteca__select-wrapper">
                <select id="ordenacao" value={ordem} onChange={(evento) => alterarOrdem(evento.target.value)} className="form-select biblioteca__select" data-bs-theme="dark">
                  <option value="relevancia">Relevância</option>
                  <option value="menor-preco">Menor Preço</option>
                  <option value="maior-preco">Maior Preço</option>
                  <option value="a-z">A - Z</option>
                  <option value="z-a">Z - A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div
          className="biblioteca__grade row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3 mx-0">
          {visiveis.map((jogo) => <GameCard key={jogo.id} jogo={jogo} />)}
        </div>
        {!resultados.length && <p className="text-center">Nenhum jogo encontrado com os filtros selecionados.</p>}
        {totalPaginas > 1 && <Paginacao total={totalPaginas} atual={pagina} navegar={navegar} />}
      </section>
      </div>
    </main>
  );
}


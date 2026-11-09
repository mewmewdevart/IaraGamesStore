import './Ofertas.css';
import React from 'react';
import { formatarPreco } from '../../utils/formatarPreco';
import { jogos } from '../../data/catalogo';
import { urlJogo } from '../../routes/paths';
import { Indicadores } from '../../components/ui/Indicadores';
import { useCarrossel } from '../../hooks/useCarrossel';

const ofertas = [
  'unsighted',
  'arida-backlands-awakening',
  'odallus-the-dark-call',
  'fobia-st-dinfna-hotel',
  'horizon-chase-turbo',
  'knights-of-pen-and-paper',
  'mark-of-the-deep',
  'a-lenda-do-heroi',
  'enigma-do-medo',
].map((slug) => jogos.find(({ id }) => id === slug)).filter(Boolean);

const destaques = ofertas.slice(0, 4);

function OfertaCard({ jogo, destaque = false, ativo = false, selecionar }) {
  const tituloClasse = destaque ? 'secao-consumidor__nome-jogo' : 'secao-consumidor__titulo-lista';
  const imagem = destaque && jogo.id === 'unsighted'
    ? 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1062110/header.jpg?t=1773699619'
    : jogo.imagem;

  function abrir(evento) {
    if (!destaque || ativo || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
    evento.preventDefault();
    selecionar();
  }

  return (
    <article className={destaque
      ? 'secao-consumidor__card card border-0 text-light w-100 ' +
        (ativo ? 'secao-consumidor__card--destaque' : 'secao-consumidor__card--normal')
      : 'secao-consumidor__cartao-lista card border-0 h-100 text-light'}>
      {destaque ? (
        <>
          <div className="secao-consumidor__overlay" />
          <img src={imagem} alt="" loading="lazy"
            className="secao-consumidor__imagem-fundo card-img h-100 object-fit-cover"
            onError={(evento) => {
              const capa = evento.currentTarget;
              if (capa.getAttribute('src') !== jogo.imagem) capa.src = jogo.imagem;
            }} />
        </>
      ) : (
        <div className="secao-consumidor__imagem-envolucro">
          <img src={imagem} alt="" loading="lazy" className="secao-consumidor__imagem-lista" />
        </div>
      )}
      {(jogo.desconto ?? 0) > 0 && (
        <span className="secao-consumidor__selo-desconto badge position-absolute top-0 end-0 m-3 z-2">-{jogo.desconto}%</span>
      )}
      <div className={destaque
        ? 'secao-consumidor__conteudo card-img-overlay d-flex flex-column justify-content-end border-0 z-2 h-100'
        : 'secao-consumidor__info-lista card-body d-flex flex-column'}>
        <h3 className={tituloClasse + ' card-title'}>
          <a href={urlJogo(jogo.id)} className="link-cobre-card" onClick={abrir}
            aria-label={destaque && !ativo ? 'Destacar ' + jogo.titulo : undefined}>{jogo.titulo}</a>
        </h3>
        <p className="secao-consumidor__estudio card-text">{jogo.estudio}</p>
        <div className="secao-consumidor__avaliacao">
          <span className="secao-consumidor__icone-estrela" aria-hidden="true">★</span>
          <span className="secao-consumidor__nota">{jogo.nota.toFixed(1)}</span>
          <span className="secao-consumidor__total-votos">({jogo.totalVotos})</span>
        </div>
        <div className={destaque ? 'secao-consumidor__bloco-compra' : 'secao-consumidor__bloco-preco'}>
          {(jogo.precoOriginal ?? 0) > 0 && <span className="preco-antigo">{formatarPreco(jogo.precoOriginal)}</span>}
          <span className={destaque ? 'secao-consumidor__preco-novo' : 'secao-consumidor__preco-desconto'}>
            {formatarPreco(jogo.precoAtual)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Ofertas() {
  const { ativo, setAtivo, mover, interacao } = useCarrossel(destaques.length, 5000);

  return (
    <section className="secao-consumidor" aria-labelledby="titulo-consumidor" {...interacao}>
      <header className="secao-consumidor__cabecalho">
        <span className="secao-consumidor__subtitulo">Novidades no Rio</span>
        <h2 className="secao-consumidor__titulo" id="titulo-consumidor">Dia do Consumidor</h2>
        <div className="carrossel-secao__controles destaque-controles">
          <button type="button" className="carrossel-secao__btn carrossel-secao__btn--anterior" aria-label="Destaque anterior" onClick={() => mover(-1)}>
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
          <div className="destaque-dots" role="group" aria-label="Selecionar destaque">
            <Indicadores total={destaques.length} ativo={ativo} selecionar={setAtivo} classe="destaque-dot" nome="Destaque" />
          </div>
          <button type="button" className="carrossel-secao__btn carrossel-secao__btn--proximo" aria-label="Próximo destaque" onClick={() => mover(1)}>
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="secao-consumidor__grade">
        <div className="row g-3 mx-0 mb-3" data-destaque-linha="">
          {destaques.map((jogo, indice) => (
            <div key={jogo.id} data-destaque-item={indice}
              className={'col secao-consumidor__card--' + (ativo === indice ? 'destaque-ativo' : 'miniatura')}>
              <OfertaCard jogo={jogo} destaque ativo={ativo === indice} selecionar={() => setAtivo(indice)} />
            </div>
          ))}
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 mx-0">
          {ofertas.slice(4).map((jogo) => (
            <div key={jogo.id} className="secao-consumidor__envolucro-cartao col">
              <OfertaCard jogo={jogo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

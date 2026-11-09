import './GameCard.css';
import React, { useState } from 'react';
import { formatarPreco } from '../../utils/formatarPreco';
import { urlJogo } from '../../routes/paths';

/**
 * @param {{ jogo: import('../../types/jogo.js').Jogo, nivelTitulo?: 2 | 3 }} props
 */
export default function GameCard({ jogo, nivelTitulo = 2 }) {
  const Titulo = nivelTitulo === 3 ? 'h3' : 'h2';
  const [capaIndisponivel, setCapaIndisponivel] = useState(false);

  return (
    <div className="secao-lancamentos__envolucro-cartao col">
      <article className="secao-lancamentos__cartao card border-0 h-100 text-light">
        <a href={urlJogo(jogo.id)} className="link-cobre-card" aria-label={'Ver ' + jogo.titulo} />
        <div className="secao-lancamentos__imagem-envolucro">
          <img
            src={capaIndisponivel ? '/assets/img/capa-indisponivel.svg' : jogo.imagem}
            alt={jogo.titulo}
            className={'secao-lancamentos__imagem card-img-top' + (capaIndisponivel ? ' secao-lancamentos__imagem--sem-capa' : '')}
            loading="lazy"
            onError={() => setCapaIndisponivel(true)}
          />
          {jogo.desconto !== null && jogo.desconto > 0 && <span className="secao-lancamentos__selo-desconto badge position-absolute top-0 end-0 m-3 z-2">-{jogo.desconto}%</span>}
        </div>
        <div className="secao-lancamentos__info card-body d-flex flex-column">
          <Titulo className="secao-lancamentos__titulo-jogo card-title">{jogo.titulo}</Titulo>
          <p className="secao-lancamentos__estudio card-text">{jogo.estudio}</p>
          <div className="secao-lancamentos__avaliacao">
            <i className="fa-solid fa-star secao-lancamentos__icone-estrela" aria-hidden="true" />
            <span className="secao-lancamentos__nota">{jogo.nota.toFixed(1)}</span>
            <span className="secao-lancamentos__total-votos">({jogo.totalVotos})</span>
          </div>
          <div className="secao-lancamentos__bloco-preco">
            {jogo.precoOriginal !== null && jogo.precoOriginal > 0 && <span className="preco-antigo">{formatarPreco(jogo.precoOriginal)}</span>}
            <span className="secao-lancamentos__preco-novo">{formatarPreco(jogo.precoAtual)}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

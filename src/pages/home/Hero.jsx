import './Hero.css';
import React, { useState } from 'react';
import { formatarPreco } from '../../utils/formatarPreco';
import { jogos } from '../../data/catalogo';
import { urlJogo } from '../../routes/paths';
import { destaques } from './destaques';
import { Indicadores } from '../../components/ui/Indicadores';
import { useCarrossel } from '../../hooks/useCarrossel';

export default function Hero() {
  const { ativo, setAtivo, interacao } = useCarrossel(destaques.length, 6000);
  const [carrinho, setCarrinho] = useState([]);
  const destaque = destaques[ativo];
  const jogo = jogos.find(({ id }) => id === destaque.id);
  const adicionado = carrinho.includes(destaque.id);

  return (
    <section className="carrossel-principal" aria-label="Destaque principal" {...interacao}>
      <div className="carrossel-principal__slide carrossel-principal__slide-item carrossel-principal__slide-item--ativo">
        <img className="carrossel-principal__imagem" src={destaque.imagem} alt={destaque.titulo} />
        <div className="carrossel-principal__conteiner">
          <div className="carrossel-principal__conteudo">
            <div className="carrossel-principal__indicadores" role="group" aria-label="Navegar entre ofertas">
              <Indicadores total={destaques.length} ativo={ativo} selecionar={setAtivo} classe="carrossel-principal__dot" nome="Oferta" />
            </div>
            <h1 className="carrossel-principal__titulo">{destaque.titulo}</h1>
            <p className="carrossel-principal__descricao">{destaque.descricao}</p>
            <div className="carrossel-principal__botoes-grupo mt-3">
              <a className="carrossel-principal__botao-comprar d-flex flex-column px-3 py-2 text-decoration-none" href={urlJogo(destaque.id)}>
                <span className="carrossel-principal__rotulo-compra">Ver jogo</span>
                {jogo && <span className="carrossel-principal__preco-destaque">{formatarPreco(jogo.precoAtual)}</span>}
              </a>
              <button type="button" className="carrossel-principal__botao-carrinho" aria-label={adicionado ? 'Adicionado ao carrinho' : 'Adicionar ao carrinho'} disabled={adicionado}
                onClick={() => setCarrinho((atual) => [...atual, destaque.id])}>
                <i className={adicionado ? 'fa-solid fa-check' : 'fa-solid fa-cart-shopping'} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="carrossel-principal__classificacao-indicativa">
            <div><p>{destaque.classificacao}</p><p>{destaque.motivo}</p></div>
            <img className="carrossel-principal__classificacao-indicativa-idade" src={destaque.idade} alt={destaque.idadeAlt} />
          </div>
        </div>
      </div>
      <div className="gradiente-border" />
    </section>
  );
}

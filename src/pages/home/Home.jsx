import './Home.css';
import React from 'react';
import { caminhos, urlCatalogo } from '../../routes/paths';
import Ofertas from './Ofertas';
import GameCard from '../../components/games/GameCard';
import { jogos } from '../../data/catalogo';
import Hero from './Hero';

const lancamentos = [
  'gaucho-and-the-grassland',
  'momodora-reverie-under-the-moonlight',
  'dolmen',
  'mullet-madjack',
  'astrea-six-sided-oracles',
].map((slug) => jogos.find(({ id }) => id === slug)).filter(Boolean);

export default function Home() {

  return (
    <main>
      <Hero />
<section className="secao-momentos" aria-labelledby="titulo-momentos">
      <h2 id="titulo-momentos" className="apenas-leitor">Filtros por estado de espírito</h2>
      <div className="row row-cols-2 row-cols-lg-4 g-3 g-lg-4 mx-0 w-100">
        <div className="col">
          <a href={urlCatalogo({ filtro: 'pausa' })}
            className="card h-100 text-decoration-none card-momento card-momento--pausa card-momento--blob1"
            aria-label="Filtrar jogos para sessões rápidas">
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
              <svg className="card-momento__icone-svg mb-3" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <h3 className="card-title card-momento__titulo mb-1">Na Pausa</h3>
              <p className="card-text card-momento__desc mb-0">Sessões Rápidas & Intervalo BR</p>
            </div>
          </a>
        </div>
        <div className="col">
          <a href={urlCatalogo({ filtro: 'calmaria' })}
            className="card h-100 text-decoration-none card-momento card-momento--calmaria card-momento--blob2"
            aria-label="Filtrar jogos relaxantes">
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
              <svg className="card-momento__icone-svg mb-3" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <path d="M12 22c-4.4 0-8-3.6-8-8 0-4.4 3.6-8 8-8s8 3.6 8 8c0 4.4-3.6 8-8 8z"></path>
                <path d="M12 22c-2.2 0-4-3.6-4-8 0-4.4 1.8-8 4-8s4 3.6 4 8c0 4.4-1.8 8-4 8z"></path>
                <path d="M2 14h20"></path>
              </svg>
              <h3 className="card-title card-momento__titulo mb-1">Calmaria</h3>
              <p className="card-text card-momento__desc mb-0">Cozy Games & Descompressão</p>
            </div>
          </a>
        </div>
        <div className="col">
          <a href={urlCatalogo({ filtro: 'raizes' })}
            className="card h-100 text-decoration-none card-momento card-momento--raizes card-momento--blob3"
            aria-label="Filtrar jogos focados em folclore nacional">
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
              <svg className="card-momento__icone-svg mb-3" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <path d="M11 20A7 7 0 0 1 4 13V4a2 2 0 0 1 2-2h9a7 7 0 0 1 7 7v9a2 2 0 0 1-2 2H11z">
                </path>
                <path d="M11 2v18"></path>
                <path d="M11 11h9"></path>
              </svg>
              <h3 className="card-title card-momento__titulo mb-1">Raízes</h3>
              <p className="card-text card-momento__desc mb-0">Narrativas & Folclore Nacional</p>
            </div>
          </a>
        </div>
        <div className="col">
          <a href={urlCatalogo({ filtro: 'resenha' })}
            className="card h-100 text-decoration-none card-momento card-momento--resenha card-momento--blob4"
            aria-label="Filtrar jogos multiplayer">
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
              <svg className="card-momento__icone-svg mb-3" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <path
                  d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z">
                </path>
              </svg>
              <h3 className="card-title card-momento__titulo mb-1">Resenha</h3>
              <p className="card-text card-momento__desc mb-0">Multiplayer Local & Galera</p>
            </div>
          </a>
        </div>
      </div>
    </section>
      <Ofertas />
      <div className="secao-banner-xilogravura">
        <section className="secao-lancamentos" aria-labelledby="titulo-lancamentos">
          <header className="secao-lancamentos__cabecalho">
            <div>
              <span className="secao-lancamentos__subtitulo">Fresquinhos para você</span>
              <h2 className="secao-lancamentos__titulo" id="titulo-lancamentos">Lançamentos</h2>
            </div>
            <a href={urlCatalogo({ secao: 'lancamentos' })} className="secao-lancamentos__link-ver-todos">
              Ver tudo <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </a>
          </header>
          <div className="secao-lancamentos__grade row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 mx-0">
            {lancamentos.map((jogo) => <GameCard key={jogo.id} jogo={jogo} nivelTitulo={3} />)}
          </div>
        </section>
        <section className="secao-cta-login">
          <div className="cta-login-card">
            <div className="cta-login-info">
              <h2 className="cta-login-title">Desbrave o Melhor do Indie Nacional</h2>
              <p className="cta-login-description">
                Acesse sua conta para conferir recomendações personalizadas, descobrir novos lançamentos brasileiros e apoiar desenvolvedores independentes.
              </p>
            </div>
            <div className="cta-login-botao-wrapper">
              <a href={caminhos.login} className="btn btn-iara-login btn-lg px-5 link-cobre-card">Iniciar sessão</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

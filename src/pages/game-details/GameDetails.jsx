import './GameDetails.css';
import React, { useState } from 'react';
import { caminhos } from '../../routes/paths';
import { formatarPreco } from '../../utils/formatarPreco';
import { jogos } from '../../data/catalogo';

const descricaoPadrao =
  'Descubra uma nova experiência criada por desenvolvedores independentes brasileiros.';

/**
 * @param {URLSearchParams} parametros
 * @returns {import('../../types/jogo.js').Jogo | null}
 */
function obterJogo(parametros) {
  const id = parametros.get('jogo');
  const jogoEncontrado = jogos.find((item) => item.id === id);

  if (jogoEncontrado) return jogoEncontrado;

  const titulo = parametros.get('titulo');
  if (!id || !titulo) return null;

  return {
    id,
    titulo,
    estudio: 'Desenvolvedora independente',
    descricao: parametros.get('descricao') || descricaoPadrao,
    imagem: parametros.get('imagem') || '/assets/img/og-image.png',
    nota: 0,
    totalVotos: 0,
    precoOriginal: null,
    precoAtual: 0,
    desconto: null,
    generos: ['Indie'],
    momentos: [],
    plataformas: ['windows'],
    tags: ['Indie'],
  };
}

function VoltarParaJogos() {
  return (
    <a className="detalhes-jogo__voltar" href={caminhos.jogos}>
      <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Voltar para jogos
    </a>
  );
}

/** @param {{ jogo: import('../../types/jogo.js').Jogo }} props */
function DetalhesJogo({ jogo }) {
  const [noCarrinho, setNoCarrinho] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const descricao = jogo.descricao || descricaoPadrao;
  const tags = [...new Set([...jogo.generos, ...jogo.tags])];
  const plataformas = jogo.plataformas
    .map((plataforma) => plataforma[0].toUpperCase() + plataforma.slice(1))
    .join(', ');

  return (
    <div className="detalhes-jogo__container">
      <VoltarParaJogos />
      <section
        className="detalhes-jogo__hero"
        style={{ '--jogo-imagem': `url("${jogo.imagem}")` }}
        aria-labelledby="jogo-titulo"
      >
        <div className="detalhes-jogo__hero-conteudo">
          <p className="detalhes-jogo__estudio">{jogo.estudio}</p>
          <h1 className="detalhes-jogo__titulo" id="jogo-titulo">
            {jogo.titulo}
          </h1>
          <p className="detalhes-jogo__descricao">{descricao}</p>
          <div className="detalhes-jogo__avaliacao">
            <i className="fa-solid fa-star" aria-hidden="true" /> {jogo.nota.toFixed(1)}
            <span>({jogo.totalVotos} avaliações)</span>
          </div>
          <div className="detalhes-jogo__tags">
            {tags.map((tag) => (
              <span className="detalhes-jogo__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="detalhes-jogo__conteudo">
        <div className="detalhes-jogo__coluna">
          <section className="detalhes-jogo__painel">
            <h2>Sobre o jogo</h2>
            <p>{descricao}</p>
            <p>
              Explore novos desafios, conheça personagens marcantes e mergulhe em um universo
              construído com criatividade e identidade.
            </p>
          </section>
          <section className="detalhes-jogo__painel">
            <h2>Requisitos do sistema</h2>
            <div className="detalhes-jogo__requisitos">
              <div>
                <h3>Mínimo</h3>
                <p><strong>SO:</strong> Windows 10</p>
                <p><strong>Memória:</strong> 4 GB de RAM</p>
                <p><strong>Armazenamento:</strong> 2 GB disponíveis</p>
              </div>
              <div>
                <h3>Recomendado</h3>
                <p><strong>SO:</strong> Windows 10 ou superior</p>
                <p><strong>Memória:</strong> 8 GB de RAM</p>
                <p><strong>Armazenamento:</strong> 4 GB disponíveis</p>
              </div>
            </div>
          </section>
          <section className="detalhes-jogo__painel">
            <h2>Comunidade</h2>
            <p><strong>João V.</strong> comentou: “Uma experiência brasileira muito criativa e gostosa de explorar.”</p>
            <p><strong>Marina C.</strong> comentou: “A direção de arte e a trilha sonora fazem toda a diferença.”</p>
          </section>
        </div>

        <aside className="detalhes-jogo__painel detalhes-jogo__compra" aria-label="Comprar jogo">
          <img
            src={jogo.imagem}
            alt={`Capa de ${jogo.titulo}`}
            className="w-100 rounded mb-3"
          />
          <div className="detalhes-jogo__precos">
            {jogo.precoOriginal && (
              <span className="detalhes-jogo__preco-antigo">
                {formatarPreco(jogo.precoOriginal)}
              </span>
            )}
            <span className="detalhes-jogo__preco">{formatarPreco(jogo.precoAtual)}</span>
            {jogo.desconto && (
              <span className="detalhes-jogo__desconto">-{jogo.desconto}%</span>
            )}
          </div>
          <button
            className="detalhes-jogo__comprar"
            type="button"
            onClick={() => setNoCarrinho(true)}
            disabled={noCarrinho}
          >
            {noCarrinho ? (
              <><i className="fa-solid fa-check" aria-hidden="true" /> Adicionado ao carrinho</>
            ) : (
              <><i className="fa-solid fa-cart-shopping" aria-hidden="true" /> Comprar agora</>
            )}
          </button>
          <div className="detalhes-jogo__acoes">
            <button
              className={`detalhes-jogo__favorito${favorito ? ' ativo' : ''}`}
              type="button"
              aria-pressed={favorito}
              onClick={() => setFavorito((estadoAtual) => !estadoAtual)}
            >
              <i
                className={`fa-${favorito ? 'solid' : 'regular'} fa-heart`}
                aria-hidden="true"
              />{' '}
              {favorito ? 'Na lista de desejos' : 'Lista de desejos'}
            </button>
          </div>
          <div className="detalhes-jogo__lista mt-4">
            <p><strong>Gêneros</strong>{jogo.generos.join(', ')}</p>
            <p><strong>Plataformas</strong>{plataformas}</p>
            <p><strong>Desenvolvedora</strong>{jogo.estudio}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function GameDetails({ parametros }) {
  const jogo = obterJogo(parametros);

  return (
    <main className="detalhes-jogo">
      {jogo ? <DetalhesJogo jogo={jogo} /> : (
        <div className="detalhes-jogo__erro" role="alert">
          <p>Não encontramos esse jogo. Volte à lista e escolha outro título.</p>
          <VoltarParaJogos />
        </div>
      )}
    </main>
  );
}

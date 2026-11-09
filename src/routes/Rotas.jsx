import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Home from '../pages/home/Home';
import Games from '../pages/games/Games';
import Login from '../pages/login/Login';
import GameDetails from '../pages/game-details/GameDetails';
import { jogos } from '../data/catalogo';
import { caminhos, urlCatalogo } from './paths';

const rotas = {
  loja: { Tela: Home, titulo: 'Iara Games | Jogos Indie Brasileiros' },
  jogos: { Tela: Games, titulo: 'Acervo de Jogos | Iara Games' },
  login: { Tela: Login, titulo: 'Acesse sua conta | Iara Games' },
  detalhes: { Tela: GameDetails, titulo: 'Detalhes do jogo | Iara Games' },
  naoEncontrada: { Tela: PaginaNaoEncontrada, titulo: 'Página não encontrada | Iara Games' },
};

const paginasPorCaminho = new Map([
  ...Object.entries(caminhos).map(([pagina, caminho]) => [caminho, pagina]),
  ['/index.html', 'loja'],
  ['/games.html', 'jogos'],
  ['/login.html', 'login'],
]);

function PaginaNaoEncontrada() {
  return (
    <main className="container pt-5 mt-5 pb-5">
      <h1>Página não encontrada</h1>
      <a href={caminhos.loja}>Voltar para a loja</a>
    </main>
  );
}

export function resolverRota(url) {
  const caminho = url.pathname.replace(/\/+$/, '') || '/';
  const parametros = url.searchParams;
  const entrada = paginasPorCaminho.get(caminho);
  const pagina = entrada === 'loja' && parametros.has('jogo')
    ? 'detalhes'
    : entrada || 'naoEncontrada';

  const rota = rotas[pagina];
  let titulo = pagina === 'login' && url.hash === '#cadastro'
    ? 'Crie sua conta | Iara Games'
    : rota.titulo;

  if (pagina === 'detalhes') {
    const id = parametros.get('jogo');
    const nome = jogos.find((jogo) => jogo.id === id)?.titulo || (id && parametros.get('titulo'));
    titulo = nome ? `${nome} | Iara Games` : 'Jogo não encontrado | Iara Games';
  }

  return { ...rota, pagina, parametros, titulo };
}

export default function Rotas() {
  const [endereco, setEndereco] = useState(() => window.location.href);
  const urlAtual = new URL(endereco);
  const { Tela, pagina, parametros, titulo } = resolverRota(urlAtual);

  useEffect(() => {
    document.title = titulo;
  }, [titulo]);

  useEffect(() => {
    const atualizarEndereco = () => setEndereco(window.location.href);
    window.addEventListener('popstate', atualizarEndereco);
    window.addEventListener('hashchange', atualizarEndereco);
    return () => {
      window.removeEventListener('popstate', atualizarEndereco);
      window.removeEventListener('hashchange', atualizarEndereco);
    };
  }, []);

  function navegar(url) {
    if (url.href === window.location.href) return;
    window.history.pushState(null, '', url);
    setEndereco(url.href);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function abrirLink(evento) {
    if (evento.defaultPrevented || evento.button !== 0 || evento.ctrlKey ||
        evento.metaKey || evento.shiftKey || evento.altKey) return;

    const link = evento.target.closest('a[href]');
    if (!link || link.target || link.hasAttribute('download') ||
        link.getAttribute('href').startsWith('#')) return;

    const destino = new URL(link.href);
    if (destino.origin !== urlAtual.origin || resolverRota(destino).pagina === 'naoEncontrada') return;

    evento.preventDefault();
    navegar(destino);
  }

  function pesquisar(evento) {
    evento.preventDefault();
    const search = new FormData(evento.currentTarget).get('search');
    navegar(new URL(urlCatalogo({ search }), urlAtual));
  }

  return (
    <div onClick={abrirLink}>
      <Header
        key={urlAtual.pathname + urlAtual.search}
        pagina={pagina === 'detalhes' ? 'jogos' : pagina}
        termo={parametros.get('search') || ''}
        onBuscar={pesquisar}
      />
      <Tela key={urlAtual.pathname + urlAtual.search} parametros={parametros} />
      <Footer />
    </div>
  );
}

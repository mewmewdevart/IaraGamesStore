import './Header.css';
import React, { useState } from 'react';
import { caminhos } from '../../routes/paths';

export default function Header({ pagina, termo, onBuscar }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const classeLink = (nome) => pagina === nome
    ? 'nav-link active border-bottom border-danger border-3 mx-2'
    : 'nav-link mx-2';

  return (
<header>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom mb-0 fixed-top">
        <div className="container-fluid px-5">
          <a className="navbar-brand me-4" href={caminhos.loja}>
            <img src="/assets/img/logo_1.svg" alt="Iara Games" width="60" />
          </a>
          <button className="navbar-toggler" type="button" onClick={() => setMenuAberto(!menuAberto)}
            aria-controls="navbarNav" aria-expanded={menuAberto} aria-label="Abrir menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse${menuAberto ? " show" : ""}`} id="navbarNav">
            <ul className="navbar-nav text-uppercase fw-bold">
              <li className="nav-item">
                <a className={classeLink("loja")} aria-current={pagina === "loja" ? "page" : undefined}
                  href={caminhos.loja}>Loja</a>
              </li>
              <li className="nav-item">
                <a className={classeLink("jogos")} aria-current={pagina === "jogos" ? "page" : undefined} href={caminhos.jogos}>Jogos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#">Comunidade</a>
              </li>
            </ul>
            <div className="d-flex flex-column flex-lg-row align-items-center gap-3 ms-auto mt-3 mt-lg-0">
              <div className="d-flex align-items-center gap-3">
                <div className="funil-busca">
                  <input type="checkbox" id="funil-busca-toggle" className="funil-busca__controle apenas-leitor" />
                  <label htmlFor="funil-busca-toggle" className="funil-busca__botao botao-icone" aria-label="Abrir barra de busca">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </label>
                  <label htmlFor="funil-busca-toggle" className="funil-busca__backdrop"></label>
                  <form action={caminhos.jogos} onSubmit={onBuscar} role="search" className="funil-busca__container" id="funil-busca-entrada">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" className="funil-busca__entrada" placeholder="Jogos, categorias etc" aria-label="Pesquisar jogos" name="search" defaultValue={termo} />
                  </form>
                </div>
                <button className="botao-icone" aria-label="Carrinho de compras"><i
                    className="fa-solid fa-cart-shopping"></i></button>
                <button className="botao-icone" aria-label="Notificações"><i
                    className="fa-solid fa-bell"></i></button>
              </div>
              <div className="d-flex flex-column flex-lg-row gap-2 w-100 w-lg-auto">
                <a href={caminhos.login} className="btn btn-iara-login fw-bold px-4">Iniciar Sessão</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

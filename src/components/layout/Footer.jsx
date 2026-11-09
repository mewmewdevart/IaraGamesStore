import './Footer.css';
import React, { useEffect, useState } from 'react';
import { caminhos, urlCatalogo } from '../../routes/paths';

export default function Footer() {
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    if (!aviso) return;
    const timer = setTimeout(() => setAviso(null), 2900);
    return () => clearTimeout(timer);
  }, [aviso]);

  function avisar(evento) {
    evento.preventDefault();
    setAviso({ nome: evento.currentTarget.textContent });
  }

  return (
    <>
<footer className="footer-custom bg-dark text-light pt-5 pb-3">
      <div className="container-fluid px-5">
        <div className="row justify-content-between">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h4 className="fw-bold text-uppercase mb-3">Iara Games</h4>
            <p className="small fw-bold text-warning mb-4">JOGOS DO BRASIL • PARA O BRASIL</p>
            <p className="text-secondary pe-lg-5" style={{ 'fontSize': '0.9rem', 'lineHeight': '1.6' }}>
              Plataforma dedicada exclusivamente a desenvolvedores independentes brasileiros.
              Cada jogo aqui é uma expressão autêntica da nossa cultura e criatividade nacional.
            </p>
          </div>
          <div className="col-6 col-md-3 col-lg-2 mb-4">
            <h6 className="fw-bold text-uppercase mb-4">Plataforma</h6>
            <ul className="list-unstyled">
              <li><a href={caminhos.loja} className="footer-link">Loja</a></li>
              <li><a href={urlCatalogo({ secao: 'mais-vendidos' })} className="footer-link">Mais Vendidos</a></li>
              <li><a href={urlCatalogo({ secao: 'lancamentos' })} className="footer-link">Lançamentos</a></li>
              <li><a href={urlCatalogo({ secao: 'promocoes' })} className="footer-link">Promoções</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3 col-lg-2 mb-4">
            <h6 className="fw-bold text-uppercase mb-4">Comunidade</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link" onClick={avisar}>Fórum</a></li>
              <li><a href="#" className="footer-link" onClick={avisar}>Desenvolvedores</a></li>
              <li><a href="#" className="footer-link" onClick={avisar}>Publicar Jogo</a></li>
              <li><a href="#" className="footer-link" onClick={avisar}>Blog</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3 col-lg-2 mb-4">
            <h6 className="fw-bold text-uppercase mb-4">Suporte</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link" onClick={avisar}>Central de Ajuda</a></li>
              <li><a href="#" className="footer-link" onClick={avisar}>Abrir Ticket</a></li>
              <li><a href="#" className="footer-link" onClick={avisar}>Privacidade</a></li>
              <li><a href="#" className="footer-link" onClick={avisar}>Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary my-4 opacity-25" />
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="small text-secondary mb-0 text-uppercase">&copy; 2026 Iara Games • Todos os direitos
              reservados • Made in Brazil <small className="fw-bold">BR</small></p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="small text-secondary mb-0 text-uppercase"
              style={{ 'fontSize': '0.75rem', 'letterSpacing': '1px' }}>Plataforma exclusiva para desenvolvedoras
              brasileiras independentes</p>
          </div>
        </div>
      </div>
    </footer>
      {aviso && (
        <div className="toast-em-breve toast-em-breve--visivel" role="status">
          <i className="fa-solid fa-hammer toast-em-breve__icone" aria-hidden="true" />
          <span>“{aviso.nome}” ainda está em construção. Em breve por aqui!</span>
        </div>
      )}
    </>
  );
}

import './Login.css';
import React, { useEffect, useState } from 'react';

export default function Login() {
  const [cadastro, setCadastro] = useState(() => location.hash === '#cadastro');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    function atualizarModo() {
      setCadastro(location.hash === '#cadastro');
      setMensagem('');
    }

    window.addEventListener('hashchange', atualizarModo);
    return () => window.removeEventListener('hashchange', atualizarModo);
  }, []);

  function enviar(evento) {
    evento.preventDefault();
    setMensagem(cadastro ? 'Cadastro ainda indisponível.' : 'Login ainda indisponível.');
  }

  function recuperar(evento) {
    evento.preventDefault();
    setMensagem('Recuperação de senha ainda indisponível.');
  }

  return (
<div className="secao-banner-xilogravura secao-banner-xilogravura--full">
    <main>
      <section className={cadastro ? "autenticacao autenticacao--cadastro" : "autenticacao"} id="cadastro" aria-label="Seção de Autenticação">
        <div className="autenticacao__container">
          <div className="autenticacao__forms">
            <div className="autenticacao__form autenticacao__form--login" inert={cadastro}>
              <h1 className="autenticacao__titulo">Bem-vindo de volta</h1>
              <p className="autenticacao__subtitulo">Entre para acessar sua biblioteca e apoiar a cena indie
                nacional.</p>
              <form className="autenticacao__corpo" onSubmit={enviar}>
                <div className="autenticacao__grupo mb-3">
                  <label htmlFor="login-email" className="autenticacao__label form-label">E-mail</label>
                  <input type="email" id="login-email" name="email"
                    className="autenticacao__input form-control" placeholder="seu@email.com"
                    autoComplete="email" required />
                </div>
                <div className="autenticacao__grupo mb-3">
                  <label htmlFor="login-password" className="autenticacao__label form-label">Senha</label>
                  <input type="password" id="login-password" name="password"
                    className="autenticacao__input form-control" placeholder="Sua senha"
                    autoComplete="current-password" required />
                </div>
                <div className="autenticacao__opcoes mb-3">
                  <label
                    className="autenticacao__lembrar form-check-label d-flex align-items-center gap-2">
                    <input type="checkbox" name="remember" className="form-check-input mt-0" />
                    Lembrar de mim
                  </label>
                  <a href="#recuperacao" className="autenticacao__link-esqueci" onClick={recuperar}>Esqueceu a senha?</a>
                </div>
                <button type="submit" className="btn btn-iara-login w-100 py-2 mt-3 fs-5">Entrar</button>
              {mensagem && <p className="mt-3 text-light" role="status">{mensagem}</p>}
              </form>
              <div className="autenticacao__alternar">
                Não tem uma conta? <a href="#cadastro" className="autenticacao__link-toggle" onClick={() => setMensagem("")}>Cadastre-se</a>
              </div>
            </div>
            <div className="autenticacao__form autenticacao__form--cadastro" inert={!cadastro}>
              <h1 className="autenticacao__titulo">Crie sua conta</h1>
              <p className="autenticacao__subtitulo">Junte-se à maior comunidade de jogos indie brasileiros.
              </p>
              <form className="autenticacao__corpo" onSubmit={enviar}>
                <div className="autenticacao__grupo mb-3">
                  <label htmlFor="reg-name" className="autenticacao__label form-label">Nome de Usuário</label>
                  <input type="text" id="reg-name" name="name"
                    className="autenticacao__input form-control" placeholder="Seu nickname"
                    autoComplete="username" required />
                </div>
                <div className="autenticacao__grupo mb-3">
                  <label htmlFor="reg-email" className="autenticacao__label form-label">E-mail</label>
                  <input type="email" id="reg-email" name="email"
                    className="autenticacao__input form-control" placeholder="seu@email.com"
                    autoComplete="email" required />
                </div>
                <div className="autenticacao__grupo mb-3">
                  <label htmlFor="reg-password" className="autenticacao__label form-label">Senha</label>
                  <input type="password" id="reg-password" name="password"
                    className="autenticacao__input form-control" placeholder="Sua senha"
                    autoComplete="new-password" required />
                </div>
                <button type="submit"
                  className="btn btn-iara-cadastro w-100 py-2 mt-3 fs-5">Cadastrar</button>
              {mensagem && <p className="mt-3 text-light" role="status">{mensagem}</p>}
              </form>
              <div className="autenticacao__alternar">
                Já tem uma conta? <a href="#" className="autenticacao__link-toggle" onClick={() => setMensagem("")}>Fazer login</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </div>
  );
}

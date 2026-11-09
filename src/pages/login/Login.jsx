import './Login.css';
import React, { useEffect, useState } from 'react';

const API_DUMMYJSON = 'https://dummyjson.com';

async function enviarParaApi(caminho, dados) {
  let resposta;

  try {
    resposta = await fetch(`${API_DUMMYJSON}${caminho}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
  } catch {
    throw new Error('Não foi possível conectar ao serviço. Tente novamente.');
  }

  let resultado;
  try {
    resultado = await resposta.json();
  } catch {
    throw new Error('O serviço retornou uma resposta inválida. Tente novamente.');
  }

  if (!resposta.ok) {
    throw Object.assign(
      new Error(resultado.message || 'Não foi possível concluir a solicitação.'),
      { status: resposta.status },
    );
  }

  return resultado;
}

export default function Login() {
  const [cadastro, setCadastro] = useState(() => location.hash === '#cadastro');
  const [mensagem, setMensagem] = useState('');
  const [saudacao, setSaudacao] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [usuarioCriado, setUsuarioCriado] = useState(null);

  useEffect(() => {
    function atualizarModo() {
      setCadastro(location.hash === '#cadastro');
      setMensagem('');
      setSaudacao('');
    }

    window.addEventListener('hashchange', atualizarModo);
    return () => window.removeEventListener('hashchange', atualizarModo);
  }, []);

  useEffect(() => {
    if (!usuarioCriado) return undefined;

    function fecharComEscape(evento) {
      if (evento.key === 'Escape') setUsuarioCriado(null);
    }

    window.addEventListener('keydown', fecharComEscape);
    return () => window.removeEventListener('keydown', fecharComEscape);
  }, [usuarioCriado]);

  async function enviar(evento) {
    evento.preventDefault();
    setMensagem('');
    setSaudacao('');
    setCarregando(true);

    const campos = new FormData(evento.currentTarget);
    const username = String(campos.get('username')).trim();
    const password = String(campos.get('password'));

    try {
      if (cadastro) {
        const usuario = await enviarParaApi('/users/add', {
          username,
          firstName: username,
          email: String(campos.get('email')).trim(),
          password,
        });
        setUsuarioCriado(usuario);
      } else {
        const usuario = await enviarParaApi('/auth/login', { username, password });
        setSaudacao(`Olá, ${usuario.firstName || usuario.username || username}!`);
      }
    } catch (erro) {
      if (!cadastro && (erro.status === 400 || erro.status === 401)) {
        setMensagem('Usuário ou senha inválidos.');
      } else if (cadastro) {
        setMensagem(`Não foi possível criar a conta. ${erro.message}`);
      } else {
        setMensagem(erro.message);
      }
    } finally {
      setCarregando(false);
    }
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
                  <label htmlFor="login-username" className="autenticacao__label form-label">Nome de usuário</label>
                  <input type="text" id="login-username" name="username"
                    className="autenticacao__input form-control" placeholder="Seu nome de usuário"
                    autoComplete="username" required />
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
                <button type="submit" className="btn btn-iara-login w-100 py-2 mt-3 fs-5" disabled={carregando}>
                  {carregando ? 'Aguarde...' : 'Entrar'}
                </button>
                {mensagem && <p className="autenticacao__mensagem" role="alert">{mensagem}</p>}
                {saudacao && <p className="autenticacao__mensagem autenticacao__mensagem--sucesso" role="status">{saudacao}</p>}
              </form>
              <div className="autenticacao__alternar">
                Não tem uma conta? <a href="#cadastro" className="autenticacao__link-toggle" onClick={() => setMensagem('')}>Cadastre-se</a>
              </div>
            </div>
            <div className="autenticacao__form autenticacao__form--cadastro" inert={!cadastro}>
              <h1 className="autenticacao__titulo">Crie sua conta</h1>
              <p className="autenticacao__subtitulo">Junte-se à maior comunidade de jogos indie brasileiros.
              </p>
              <form className="autenticacao__corpo" onSubmit={enviar}>
                <div className="autenticacao__grupo mb-3">
                  <label htmlFor="reg-name" className="autenticacao__label form-label">Nome de Usuário</label>
                  <input type="text" id="reg-name" name="username"
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
                <button type="submit" className="btn btn-iara-cadastro w-100 py-2 mt-3 fs-5" disabled={carregando}>
                  {carregando ? 'Aguarde...' : 'Cadastrar'}
                </button>
                {mensagem && <p className="autenticacao__mensagem" role="alert">{mensagem}</p>}
              </form>
              <div className="autenticacao__alternar">
                Já tem uma conta? <a href="#" className="autenticacao__link-toggle" onClick={() => setMensagem('')}>Fazer login</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    {usuarioCriado && (
      <div
        className="autenticacao__modal-fundo"
        onMouseDown={(evento) => {
          if (evento.target === evento.currentTarget) setUsuarioCriado(null);
        }}
      >
        <section
          className="autenticacao__modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cadastro-sucesso-titulo"
        >
          <h2 id="cadastro-sucesso-titulo" className="autenticacao__titulo">Bem-vindo(a)!</h2>
          <p className="autenticacao__subtitulo">
            Olá, {usuarioCriado.firstName || usuarioCriado.username || 'jogador(a)'}! Sua conta de demonstração foi criada.
          </p>
          <p className="autenticacao__modal-aviso">
            O cadastro é simulado pelo DummyJSON e não permite entrar com essa conta depois.
          </p>
          <button type="button" className="btn btn-iara-login w-100" onClick={() => setUsuarioCriado(null)}>
            Entendi
          </button>
        </section>
      </div>
    )}
    </div>
  );
}

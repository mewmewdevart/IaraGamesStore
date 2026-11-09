/** @typedef {import('../../types/jogo.js').Jogo} Jogo */

/** @type {Record<string, (valor: number) => boolean>} */
const PRECOS = {
  todos: () => true,
  gratuito: (valor) => valor === 0,
  'ate-20': (valor) => valor <= 20,
  '20-50': (valor) => valor >= 20 && valor <= 50,
  'acima-50': (valor) => valor > 50,
};

/** @type {Record<string, (a: Jogo, b: Jogo) => number>} */
const ORDENACAO = {
  relevancia: (a, b) => b.nota - a.nota,
  'menor-preco': (a, b) => a.precoAtual - b.precoAtual,
  'maior-preco': (a, b) => b.precoAtual - a.precoAtual,
  'a-z': (a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'),
  'z-a': (a, b) => b.titulo.localeCompare(a.titulo, 'pt-BR'),
};

/** @type {Array<'generos' | 'momentos' | 'plataformas' | 'tags'>} */
const GRUPOS = ['generos', 'momentos', 'plataformas', 'tags'];

/**
 * @param {Jogo[]} jogos
 * @param {{
 *   termo: string,
 *   preco: string,
 *   ordem: string,
 *   nomeSecao: string | null,
 *   filtros: Pick<Jogo, 'generos' | 'momentos' | 'plataformas' | 'tags'>
 * }} criterios
 * @returns {Jogo[]}
 */
export function filtrarJogos(jogos, { termo, preco, ordem, nomeSecao, filtros }) {
  const busca = termo.trim().toLocaleLowerCase('pt-BR');
  return jogos.filter((jogo) => {
    const combinaBusca = [jogo.titulo, jogo.estudio, ...jogo.tags].some(
      (texto) => texto.toLocaleLowerCase('pt-BR').includes(busca),
    );
    return combinaBusca &&
      PRECOS[preco](jogo.precoAtual) &&
      (nomeSecao !== 'promocoes' || (jogo.desconto ?? 0) > 0) &&
      GRUPOS.every((grupo) =>
        !filtros[grupo].length || filtros[grupo].some((valor) => jogo[grupo].includes(valor)),
      );
  }).sort(ORDENACAO[ordem]);
}


import './Indicadores.css';
import React from 'react';

export function Indicadores({ total, ativo, selecionar, classe, nome }) {
  return Array.from({ length: total }, (_, indice) => (
    <button
      key={indice}
      type="button"
      className={classe + (ativo === indice ? ' ' + classe + '--ativo' : '')}
      aria-label={nome + ' ' + (indice + 1) + ' de ' + total}
      aria-pressed={ativo === indice}
      onClick={() => selecionar(indice)}
    />
  ));
}

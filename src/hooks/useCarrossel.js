import { useEffect, useState } from 'react';

export function useCarrossel(total, intervalo) {
  const [ativo, setAtivo] = useState(0);
  const [mouse, setMouse] = useState(false);
  const [foco, setFoco] = useState(false);
  const mover = (passo) => setAtivo((atual) => (atual + passo + total) % total);

  useEffect(() => {
    if (mouse || foco || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setAtivo((atual) => (atual + 1) % total), intervalo);
    return () => clearInterval(timer);
  }, [total, intervalo, mouse, foco, ativo]);

  const interacao = {
    onMouseEnter: () => setMouse(true),
    onMouseLeave: () => setMouse(false),
    onFocus: () => setFoco(true),
    onBlur: (evento) => {
      if (!evento.currentTarget.contains(evento.relatedTarget)) setFoco(false);
    },
    onKeyDown: (evento) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(evento.key)) return;
      evento.preventDefault();
      mover(evento.key === 'ArrowLeft' ? -1 : 1);
    },
  };

  return { ativo, setAtivo, mover, interacao };
}

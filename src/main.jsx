import './styles/global.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Rotas from './routes/Rotas';

const raiz = document.getElementById('root');
createRoot(raiz).render(<Rotas />);

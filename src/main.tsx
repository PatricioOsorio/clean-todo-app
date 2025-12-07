import 'reflect-metadata'
import './infrastructure/di/container'

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'primereact/resources/themes/lara-dark-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

import { TodosPage } from './presentation/pages/TodosPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodosPage />
  </StrictMode>
);

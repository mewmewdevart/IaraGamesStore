# 🎨 SPRINT 03 – IDENTIDADE VISUAL E FRONT-END: PLATAFORMA IARA GAMES

Este documento detalha as decisões da **Sprint 03** do projeto **Iara Games**, com foco na concepção da identidade visual, integração do Design System e construção de uma interface imersiva e acessível utilizando Bootstrap.

**Equipe Master3:** Ingrid Silva de Lima, Larissa Cristina Benedito e Mayla Mayumi Motobe.

## 🔗 Acessos e Entregas
- 🌐 **Deploy (Site Hospedado):** https://mewmewdevart.github.io/IaraGamesStore/
- 💻 **Repositório GitHub:** [https://github.com/mewmewdevart/IaraGamesStore](https://github.com/mewmewdevart/IaraGamesStore)
- 📖 **Brandbook (Identidade Visual):** [Visualizar Brandbook no Canva](https://canva.link/brandbook-iaragames-np) ou [PDF](./Iara%20Games%20-%20Brandbook.pdf)

## 1. 📌 Proposta de Identidade Visual (Brandbook)

A identidade visual da Iara Games foi construída sob os pilares: **Jovem, Nacional e Gamer**. O conceito central, **"Noite na Pororoca"**, mescla o misticismo da sereia Iara com o foco em conversão e usabilidade exigidos pelo e-commerce atual.

A identidade visual se fundamenta em:
- **Logotipo de traços orgânicos:** Simbolizando o fluxo da água e a organicidade do folclore brasileiro.
- **Tipografia:** Uso da fonte sem-serifa **Inter**, otimizada para legibilidade em telas.
- **Paleta de Cores:** Estrategicamente dividida em:
  - **Deep Moss (#0F1714):** Base escura de fundo para redução de fadiga ocular.
  - **Terracota Iara (#E34A38):** Cor primária de ação (botões e Call to Actions).
  - **Fogo Fátuo (#FCA311):** Cor secundária para destaques, alertas e descontos.
  - **Off-White (#E8ECEB):** Textos principais, garantindo alto contraste e certificação WCAG.

## 2. 🎨 Justificativas da Aplicação Front-End

A equipe traduziu perfeitamente o Design System estático para o código do ambiente digital interativo:

- **Formas Orgânicas e `border-radius`:** Para eliminar a frieza de sites corporativos retangulares, injetamos a propriedade `border-radius` em botões, modais e cards, remetendo à fluidez da água.
- **Dark Mode Nativo:** O fundo global em **Deep Moss** reduz a fadiga visual e gera forte destaque para as capas dos jogos.
- **Bioluminescência (Efeito Visual):** Utilizando propriedades avançadas de `box-shadow` e `transitions` no CSS, elementos reagem à interação (`:hover`) emitindo um brilho radial, guiando intuitivamente o usuário.
- **Tipografia Web e Fallback:** Implementação da fonte **Inter** via Google Fonts, com variações de peso (Regular para textos, Extra-Bold para preços e títulos). Conta com um sistema de fallback de fontes nativas para garantir estabilidade visual.

## 3. 🏗️ Recursos do Bootstrap 5.3 Utilizados

O framework Bootstrap 5.3 serviu como a **espinha dorsal matemática e estrutural** do nosso projeto. Utilizamos seus recursos avançados para lidar com toda a física da tela (responsividade, dimensionamento e comportamento base de componentes), enquanto o nosso CSS próprio injetava a identidade visual exclusiva da Iara Games. Abaixo estão os principais pontos relevantes dessa integração:

- **Exploração do Grid e Responsividade Dinâmica:** 
  O maior desafio da Home e da vitrine da Loja era exibir e ajustar dezenas de jogos simultâneos para diversas telas.
  - Utilizamos a inteligência matricial do Bootstrap através das classes `row-cols-xl-5` combinada com as calhas dinâmicas `.g-3`. 
  - Na prática, o Bootstrap recalcula o layout do usuário em tempo real: no celular ele empilha **1 card por linha** (evitando temidos cliques acidentais em dispositivos sensíveis ao toque), e em monitores Desktop de alta resolução, ele escala a vitrine revelando **até 5 jogos lado a lado**.

- **Componentes de Interface Estruturais:** 
  Para garantir robustez e agilidade e suporte cross-browser, utilizamos os seguintes componentes vitais do framework como chassi:
  - **Cards (`.card`):** Usados como a base de exibição para as capas dos jogos. Injetamos nosso CSS customizado de cores e `border-radius` por cima do componente Bootstrap para manter a fidelidade ao conceito "Noite na Pororoca".
  - **Navbar:** O componente base permitiu estruturar a navegação superior e a responsividade do menu de forma rápida e eficiente.
  - **Formulários e Filtros (`.form-control` e `.form-select`):** Aplicados de forma exaustiva nas páginas de Catálogo e Autenticação. Isso garantiu inputs de formulário refinados e testados nativamente contra quebras de layout.
  - **Botões e Acessibilidade:** Utilizamos botões nativos do framework perfeitamente integrados ao padrão `aria-label`, concedendo narração em áudio adequada para componentes desenhados puramente através de ícones (como o "Carrinho de Compras" e o "Sino de Notificações").

- **Delegação de Estilos com Classes Utilitárias (Helpers):**
  Para manter o nosso arquivo `style.css` extremamente limpo (apenas com o Design System da marca), delegamos as regras matemáticas ao Bootstrap diretamente nas tags HTML. A equipe aplicou centenas de classes utilitárias de:
  - **Flexbox:** Classes como `.d-flex`, `.flex-column`, e `.justify-content-center` para estruturar blocos e alinhar elementos.
  - **Espaçamentos e Margens (Spacing):** Calibramos o respiro visual dinamicamente via atributos direcionais como `.mt-3`, `.px-4` e `.gap-2`, garantindo precisão milimétrica sem a necessidade de criar regras complexas no arquivo CSS.

## 4. ♿ Acessibilidade (A11y) e Design Universal

- **Semântica HTML5:** Uso correto de tags como `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>` e `<footer>`, orientando leitores de tela com precisão.
- **Conformidade de Contraste (WCAG):** A escolha do texto em **Off-White** contra o fundo **Deep Moss** garante excelente legibilidade, evitando ofuscamento visual.
- **Navegação por Teclado:** Utilização da pseudo-classe `:focus-visible` que injeta um contorno espesso para indicar claramente o elemento em foco, beneficiando usuários que navegam apenas pelo teclado.
- **Ocultação Acessível (`.apenas-leitor`):** Classe própria que oculta visualmente elementos estruturais da tela (como o `<h1>` mestre), mas os mantém detectáveis por leitores de tela.
- **Atributos `alt` e `aria-label`:** Textos alternativos detalhados em todas as capas de jogos e descrição de elementos puramente visuais (como ícones de carrinho e sino).

## 5. 🚀 Criatividade e Inovação na Arquitetura Front-End

- **CSS Centralizado (Design Tokens):** Toda a paleta de cores e espaçamentos foram centralizados em variáveis no `:root` do CSS, permitindo a escalabilidade limpa de toda a interface sem repetição de código (DRY - Don't Repeat Yourself).
- **Interatividade Nativa (Zero JS Footprint):** Transições complexas, como a troca entre as abas de "Login" e "Cadastro" em uma única página, foram implementadas utilizando apenas CSS puro (`:target`), resultando em performance máxima e economia de dados no lado do cliente.

<p align="center">
  <a href="https://github.com/mewmewdevart/IaraGamesStore/blob/main/docs/Sprint%2003%20-%20Iara%20Games_2026%20-%20EAD.pdf">📝 Visualizar documentação completa da Sprint 03</a>
</p>

<p align="center">
  <a href="https://github.com/mewmewdevart/IaraGamesStore/blob/main/docs/Iara%20Games%20-%20Brandbook.pdf">🎨 Visualizar o Brandbook Completo</a>
</p>

[🔙 Voltar para a (Sprint 02)](./02_sprint.md)

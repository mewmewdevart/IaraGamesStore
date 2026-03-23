# 📖 Sprint 01 — Visão Inicial da Plataforma Iara Games

## 1. Introdução e Contexto

Este documento apresenta a primeira etapa de concepção da **Iara Games**, uma plataforma digital de distribuição de jogos brasileiros.

O projeto foi desenvolvido pela equipe da agência simulada **Master3**, composta por:

- Ingrid Silva de Lima  
- Julia Souza Gonçalves  
- Larissa Cristina Benedito
- Mateus Teixeira Ribeiro  
- Mayla Mayumi Motobe  

A Sprint 01 tem como objetivo estruturar as bases do produto, incluindo entendimento do problema, definição visual, decisões de UX e a entrega de um protótipo inicial.

## 2. Objetivo da Sprint

O foco desta sprint não é a construção completa da plataforma, mas sim a definição de seus fundamentos.

### Entregas principais:

- Definição da proposta da plataforma  
- Pesquisa de referências de mercado (Benchmark)
- Decisões de design (GDW)  
- Aplicação de práticas de UX e acessibilidade  
- Desenvolvimento da Home Page estática (HTML + CSS)  
- Organização do projeto no GitHub  

> ⚠️ Esta etapa não contempla uso de JavaScript ou back-end.

## 3. Visão do Produto

A **Iara Games** foi idealizada para atender uma demanda pouco explorada no mercado: uma plataforma dedicada exclusivamente à distribuição de jogos brasileiros independentes.

A proposta conecta:

- 🎮 **Desenvolvedores nacionais (B2B)**: Fomento e vitrine para estúdios locais.
- 🧑‍💻 **Consumidores finais (B2C)**: Acesso direto e valorização da cultura nacional.

Além da venda de jogos, a plataforma também busca fortalecer a comunidade e a identidade cultural brasileira no cenário gamer.

## 4. Pesquisa de Mercado (Benchmark)

Para embasar decisões de design e arquitetura, foram analisadas três plataformas:

### Steam
- Referência global em distribuição digital.
- Destaque para organização de catálogo e visibilidade estrutural.

### Itch.io
- Foco em desenvolvedores independentes e experimentais.
- Flexibilidade total de publicação e precificação ("pay-what-you-want").

### Nuuvem
- A maior plataforma brasileira na América Latina.
- Comunicação localizada e integração nativa com meios de pagamento nacionais.

## 5. Decisões de Design (GDW)

### Paleta de Cores
A escolha das cores foi baseada em identidade cultural e conforto visual (Dark Mode Nativo):

- `#0F1714` (**Deep Moss**) — Fundo principal (reduz a emissão de luz azul e fadiga visual).
- `#E34A38` (**Terracota Iara**) — Cor primária para ações principais e CTAs.
- `#FCA311` (**Fogo Fátuo**) — Cor secundária para estados interativos (hover, foco).
- `#E8ECEB` (**Off-White**) — Tipografia principal para alto contraste.
- `#2C2E30` (**Gray**) — Superfícies secundárias, divisores e ícones neutros.

### Tipografia
Fonte escolhida: **Inter**
- Alta legibilidade em diferentes resoluções.
- Otimizada para interfaces digitais com pesos variando de 400 (Regular) a 700 (Bold).

## 6. UX e Usabilidade

O projeto foi estruturado seguindo as **Heurísticas de Nielsen** para oferecer uma experiência clara e intuitiva.

- **Hierarquia Visual**: Uso de contraste cromático e tipográfico para guiar o olhar (*Eye Tracking*).
- **Redução de Carga Cognitiva**: Interface limpa com caminhos de navegação previsíveis.
- **Feedback Visual**: Respostas táteis imediatas em todos os elementos interativos.
- **Linguagem (Microcopy)**: Tom de voz adaptado à comunidade gamer brasileira.

## 7. Desenvolvimento da Interface (Home Page)

A interface da Home Page foi projetada para ser imersiva e focada em conversão:

- **Hero Carrossel**: Destaque principal para títulos de impacto (ex: *Ruff Ghanor*), com botões de compra rápida integrados.
- **Grades de Conteúdo**: Seções como "Dia do Consumidor" e "Lançamentos" utilizam sistemas de grade flexíveis que se adaptam a diferentes tamanhos de tela.
- **Layout Responsivo**: Implementação que varia de 5 colunas em desktops Ultra-Wide até 1 coluna em dispositivos móveis, garantindo usabilidade em qualquer device.
- **Efeitos de Transição**: Uso de animações suaves e `cubic-bezier` para elevar a percepção de qualidade do produto.

## 8. Estrutura HTML Semântica

O projeto adota os padrões modernos de **HTML5 semântico**, facilitando a indexação e a acessibilidade:

- **Marcos de Página (Landmarks)**: Uso correto de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` e `<footer>`.
- **Títulos Ocultos**: Implementação de `<h1>` visualmente ocultos (via CSS) para estabelecer o contexto da página para tecnologias assistivas sem comprometer o design.
- **Otimização Tech SEO**: Incorporação de marcação estruturada **JSON-LD (Schema.org)** e meta tags **Open Graph/Twitter Cards** para visibilidade em motores de busca e redes sociais.

## 9. Práticas de Acessibilidade (A11Y)

A acessibilidade é tratada como requisito primário (**Accessibility by Design**), alinhada à norma **ABNT NBR 17225**:

- **Navegação Autônoma**: Suporte total a navegação por teclado com estados de `:focus-visible` destacados.
- **Apoio a Leitores de Tela**: Classe `.apenas-leitor` para conteúdos contextuais invisíveis e uso de atributos `aria-label` em botões de ícone.
- **Expansão de Alvos de Toque**: Técnica `.link-cobre-card` via pseudo-elementos (`::after`), garantindo que toda a área do card seja clicável, ideal para acessibilidade motora e mobile.
- **Preferências de Movimento**: Media query `@prefers-reduced-motion` integrada para respeitar usuários com sensibilidade visual.

## 10. Metodologia BEM no CSS

Para um código CSS organizado, escalável e de fácil manutenção, aplicamos a metodologia **BEM** (Block-Element-Modifier):

- **Encapsulamento**: Nomenclatura como `bloco__elemento--modificador` evita a "guerra de seletores" e garante que o estilo de um componente não vaze para outro.
- **Design Tokens**: Uso de **CSS Custom Properties** (`:root`) para centralizar todas as decisões de design (cores, pesos, espaçamentos).
- **CSS Avançado**: Uso de `clamp()` para fontes resilientes e `content-visibility: auto` para otimização de performance durante a renderização.

## 11. Roadmap e Futuro

Próximas etapas do projeto:

- 🏗️ Implementação de Back-end e Banco de Dados.
- 🔐 Sistema de Autenticação e Área do Usuário.
- 🛒 Marketplace funcional e Carrinho de Compras.
- 📚 Módulo de Biblioteca e Comunidade (Fóruns).

<p align="left">
  <a href="../README.md">🏠 Voltar à Home</a>
</p>
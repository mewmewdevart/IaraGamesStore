# 📖 Sprint 01 - Visão Inicial da Plataforma Iara Games

Este README formaliza a primeira etapa de concepção da **Iara Games**, uma plataforma digital de distribuição focada no ecossistema de jogos independentes brasileiros. O desenvolvimento é conduzido pela equipe da agência ficticia Master3.

Nesta Sprint 01, o escopo foca no levantamento de requisitos, definição do Design Visual (GDW), arquitetura de informação e entrega do protótipo estático (HTML/CSS) da Home Page.

## 1. Visão do Produto e Posicionamento
A Iara Games visa suprir uma lacuna no mercado de distribuição digital, oferecendo infraestrutura de e-commerce e comunidade exclusivamente para estúdios emergentes do Brasil. O produto final atuará como um modelo de negócio B2C e B2B, conectando desenvolvedores locais diretamente ao consumidor final.

**O projeto baseia-se em três pilares operacionais:**
- **Curadoria 100% Nacional**: Restrição de catálogo. Algoritmo de descoberta direcionado exclusivamente à indústria brasileira.
- **Identidade Visual e Cultural**: Aplicação de diretrizes de design que remetem ao folclore nacional, traduzindo o conceito de "brasilidade" para o nicho gamer.
- **Distribuição Digital (MVP)**: Versão focada na venda de licenças e distribuição de pacotes de dados para instalação local (download direto).

## 2. Pesquisa de Plataformas (Referências)
Para fundamentar as decisões de arquitetura e usabilidade da Iara Games, conduzimos uma análise competitiva de três plataformas referenciais:
- **Steam**: A maior plataforma para PC no mundo, excelente visibilidade estrutural. Focado em produtos premium.
- **Itch.Io**: Foco em indies e experimentais, modelo "pay-what-you-want", ótimo para game jams e autores independentes.
- **Nuuvem**: Referência nacional na América Latina, serve de inspiração pela comunicação localizada e integração com formas de pagamento brasileiras.

## 3. Requisitos Funcionais e Módulos Principais
A arquitetura do Produto Mínimo Viável (MVP) contempla cinco módulos principais (com a "Área Inicial" entregue nesta Sprint):
- **Área Inicial (Sprint 01)**: Interface de conversão principal, com vitrine de destaque e navegação global.
- **Área do Usuário**: Gestão de contas, privacidade (LGPD), histórico de transações e configurações da sessão.
- **Módulo Loja (Marketplace)**: Catálogo com ordenação, volume de vendas, notas e categorização por gênero.
- **Módulo Biblioteca**: Gestão de licenças adquiridas pelo consumidor, com filtros de ordenação.
- **Módulo Fórum (Comunidade)**: Tópicos, indexação cronológica e por nível de engajamento da publicações.
- **Módulo Central de Suporte**: Diretório de contatos técnicos e ticketing (sistema de chamados).

## 4. Decisões de Design (GDW)
A identidade visual adota uma postura **Dark-first**, essencial para o conforto visual de jogadores durante a imersão na plataforma:
- **Padrão Dark Mode Nativo**: Fundo principal focado em reduzir a fadiga ocular.
- **Paleta de Cores**:
  - `Deep Moss (#0F1714)`: Fundo imersivo escuro sem ser preto absoluto.
  - `Terracota Iara (#E34A38)`: Cor primária, usada em Call-to-actions principais ("Jogar", "Comprar").
  - `Fogo Fátuo (#FCA311)`: Cor secundária (amarelo vibrante) usada em hovers, foco e alertas.
  - `Off-White (#E8ECEB)` / `Gray (#2C2E30)`: Cores de leitura geral e elementos desativados.
- **Tipografia**: `Inter`, selecionada por sua excelente legibilidade digital. Tipografia variando em pesos sistemáticos em títulos (Hero 700) e textos de interface (Medium 500 / Regular 400).

## 5. Usabilidade (UX) e Acessibilidade
A interface foi projetada para otimizar a navegação, balancear a carga cognitiva e guiar o fluxo transacional:
- **Hierarquia Visual (UX)**: Contraste rigoroso indicando *affordance* para conversão.
- **Acessibilidade by Design**: Desenvolvimento universal conforme ABNT NBR 17225. A estrutura considera leitores de tela e navegação por teclado como primordiais.
- **Microcopy**: Linguagem adequada à comunidade gamer BR, abandonando o jargão técnico excessivamente corporativo.
- **Feedback Constante**: Respostas táteis ou visuais baseadas em modais de confirmação na deleção de dados, atendo às heurísticas de Nielsen.

## 6. Diferencial Técnico: Arquitetura, SEO e Performance
A estruturação fundamentou-se nos indicadores *Core Web Vitals* para garantir a qualidade de entrega:
- **Technical SEO e AOM**: Aplicação rigorosa de *landmarks* semânticos HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`), facilitando o acesso da árvore de acessibilidade (AOM) e os crawlers do Google. Incorporação de Rich Snippets e Open Graph.
- **Performance de Renderização**: Uso de `loading="lazy"` para o que fica de fora da primeira dobra (*below the fold*), priorizando a LCP. Link `preconnect` para font-faces visando prevenir *FOIT*.
- **Estruturação CSS Escalonável**: Isolamento tático do CSS via metodologia de nomenclatura inspirada no BEM, com Design Tokens unificados usando varíaveis globais `:root`.

## 7. Roadmap e Visão de Futuro
A infraestrutura proposta é a fundação tecnológica da Iara Games. A longo prazo, a plataforma escalará essa arquitetura para absorver volume expansivo de dados B2B/B2C, transformando algo concebido como "loja" na **comunidade definitiva e indispensável** dos estúdios locais.

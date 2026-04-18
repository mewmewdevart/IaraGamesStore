# 📖 SPRINT 01 – VISÃO ESTRUTURADA: PLATAFORMA IARA GAMES

Este documento apresenta uma visão estruturada da **Sprint 01** do projeto **Iara Games**.  
Para especificações técnicas aprofundadas, diagramas de arquitetura e mapeamento completo de requisitos, consulte a documentação detalhada ao final deste material.

A Iara Games é uma **plataforma digital de distribuição de jogos indie brasileiros**, desenvolvida como projeto acadêmico do curso de **Tecnólogo em Web Design da FIAP**.

Nesta etapa, o foco está na **fundação da experiência do usuário (UX)**, **definição do design visual (GDW)** e na **estruturação da arquitetura de front-end estático**.



## 🔗 Acessos
- 🌐 **Deploy:** https://mewmewdevart.github.io/IaraGamesStore/  
- 💻 **Repositório:** https://github.com/mewmewdevart/IaraGamesStore  

## 1. 📌 Introdução e Escopo

O desenvolvimento é conduzido pela agência simulada **Master3**, composta por:
- Ingrid Silva de Lima  
- Julia Souza Gonçalves  
- Larissa Cristina Benedito  
-  ̶M̶a̶t̶e̶u̶s̶ ̶T̶e̶i̶x̶e̶i̶r̶a̶ ̶R̶i̶b̶e̶i̶r̶o̶  (O integrante participou da Sprint 01, porém desistiu do curso.)
- Mayla Mayumi Motobe  

Sob gestão da **Scrum Master fictícia Lu Easy**, o escopo desta sprint contempla:

- Levantamento de requisitos e definição do **Design Visual (GDW)**  
- Estruturação da **Arquitetura de Informação**  
- Desenvolvimento do **protótipo estático (HTML5/CSS3)** da Home Page  

> ⚠️ **Nota:** Nesta etapa, o projeto não contempla implementações de back-end.


## 2. 🎯 Visão do Produto (Product Vision)
A **Iara Games** visa suprir a lacuna na distribuição digital nacional, oferecendo:

- Infraestrutura de **e-commerce**
- Ambiente de **comunidade**
- Suporte a **estúdios independentes brasileiros**

O projeto atua em dois modelos:

- **B2C (Consumidor)**
- **B2B (Desenvolvedor)**

Com foco na valorização da **cultura e produção nacional**.

## 3. 📊 Benchmark (Referências de Mercado)
- **Steam** → Referência em visibilidade estrutural e ecossistema robusto  
- **Itch.io** → Referência em liberdade criativa e precificação flexível  
- **Nuuvem** → Referência nacional em localização e métodos de pagamento  


## 4. 🎨 Identidade Visual e Design (GDW)
A identidade visual baseia-se no conceito:

> 🌊 **"Noite na Pororoca"** — fusão entre tecnologia e a fluidez da natureza brasileira

### 🎨 Paleta de Cores (Dark-first)
- **Deep Moss (#0F1714)** → Fundo principal (redução de fadiga visual)  
- **Terracota Iara (#E34A38)** → Cor primária (CTAs)  
- **Fogo Fátuo (#FCA311)** → Estados de hover e alertas  
- **Off-White (#E8ECEB)** → Tipografia de alto contraste  

### 🔤 Tipografia
- **Inter** → Otimizada para interfaces digitais e múltiplas resoluções  

## 5. 🧠 Experiência do Usuário (UX) e Usabilidade
A interface foi projetada com base nas **Heurísticas de Nielsen**:

- **Visibilidade do Status** → Feedback imediato em interações  
- **Consistência** → Navegação previsível e padronizada  
- **Prevenção de Erros** → Uso de *friction by design* em ações críticas  
- **Hierarquia Visual** → Contraste térmico guiando o olhar do usuário  


## 6. ♿ Acessibilidade (Accessibility by Design)
Alinhada à **ABNT NBR 17225:2025**, a plataforma implementa:

- **Marcos semânticos** → `<main>`, `<nav>`, `<header>`, `<footer>`  
- **Conteúdo acessível** → Classe `.apenas-leitor` para leitores de tela  
- **Navegação por teclado** → Destaque com `:focus-visible`  
- **Alvos de toque ampliados** → Melhor usabilidade motora  

## 7. ⚙️ Arquitetura Front-end e Performance
- **SEO Técnico**  
  - JSON-LD (Schema.org)  
  - Meta Tags (Open Graph)  

- **Core Web Vitals**  
  - Lazy Loading de imagens  
  - Pré-conexão de fontes  
  - Otimização do LCP  

- **CSS Escalável**  
  - Design Tokens (variáveis CSS)  
  - Estrutura inspirada em **BEM (Block, Element, Modifier)**  

## 8. 🚀 Roadmap de Evolução

- Implementação de **Banco de Dados** e **Autenticação**  
- Desenvolvimento do **Marketplace** e **Carrinho de Compras**  
- Criação de **Comunidade e Fóruns**  

<p align="center">
  <a href="https://github.com/mewmewdevart/IaraGamesStore/blob/main/docs/Sprint%2001%20-%20Iara%20Games_2026%20-%20EAD%20.pdf">📝 Visualizar documentação completa</a>
</p>


[🏠 Voltar à Home](../README.md) | [➡️ Avançar para (Sprint 02)](./02_sprint.md)

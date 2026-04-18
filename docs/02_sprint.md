# 🚀 SPRINT 02 – EVOLUÇÃO E UX: PLATAFORMA IARA GAMES

Este documento detalha as decisões da **Sprint 02** do projeto **Iara Games**, com foco na maturação da jornada do usuário, nas personas e na usabilidade técnica das páginas, estruturando o ecossistema e rotas essenciais da plataforma.

**Equipe Master3:** Ingrid Silva de Lima, Julia Souza Gonçalves, Larissa Cristina Benedito e Mayla Mayumi Motobe.

## 🔗 Acessos e Entregas
- 🌐 **Deploy (Site Hospedado):** https://mewmewdevart.github.io/IaraGamesStore/
- 💻 **Repositório GitHub:** [https://github.com/mewmewdevart/IaraGamesStore](https://github.com/mewmewdevart/IaraGamesStore)
- 🎥 **Vídeo-Pitch (Evolução V1 para V2):** https://www.youtube.com/watch?v=LhesmyS9t1c

## 1. 📌 Evolução da Plataforma (Sprint 01 ➔ Sprint 02)

Na Sprint 01, consolidamos a infraestrutura inicial e uma interface estática da vitrine. Na Sprint 02, promovemos uma maturação robusta e funcional:

- **Identidade Visual Aprimorada:** O design evoluiu para fixar o conceito "Noite na Pororoca". As formas e silhuetas pesadas ganharam suavidade, introduzindo botões retangulares, cantos levemente arredondados e efeitos estéticos de bioluminescência.
- **Arquitetura de Informação Expandida:** Saímos do escopo inicial de homepage única (`index.html`), aprofundando o ecossistema com o **Catálogo** (`games.html`) e a interface de **Autenticação** (`login.html`).

## 2. 👥 Usuário e Contexto: Ecossistema de Personas (B2C e B2B)

Mapeando o público duplo que uma loja de indie games brasileira demanda, definimos três perfis, sendo do "Entusiasta de Raízes" o núcleo da nossa atual conversão.

### 🎮 Persona 01: A Streamer "Voz da Comunidade" (B2C)
> *"Cansada de entrar em lobby de jogo famoso e ser xingada por ser quem eu sou. Quero conteúdo que me represente em um lugar que eu me sinta segura."*

- **Perfil:** Beatriz (Bia), 19 anos, estudante de Design e micro-influenciadora LGBTQIA+ em São Paulo. Foca na construção da sua identidade e formação de comunidade.
- **Dores & Necessidades:** Ambientes altamente tóxicos em games de grande porte a frustram. Busca curadoria criativa e esteticamente agradável no Brasil para streamar de forma segura ("Safe-Zone"), porém com orçamentos restritos.
- **Impacto ESG (Social):** Bia sustenta embaixadores genuínos da representatividade, inclusão das minorias.

### 🍃 Persona 02: O Comprador "Entusiasta de Raízes" (B2C) - *[PRIORIDADE DE FLUXO]*
> *"Quero que o jogo que eu jogue tenha a minha cara, não a de um estúdio estrangeiro genérico."*

- **Perfil:** Tiago Santos, 26, educador formato em História de Belém (PA). Ama sua ancestralidade e busca ver sua bagagem cultural no núcleo narrativo de RPGs, em vez de jogos eurocêntricos/estrangeiros habituais.
- **Dores & Necessidades:** Possui um orçamento contido e teme gastar sua cota de jogos semestral com produções inacabadas. Precisa de qualidade técnica e filtro folclórico curatorial profundo que celebre a identidade de sua região.
- **Impacto ESG (Social):** O consumo dele alimenta o fomento da economia criativa regional.

### 🏢 Persona 03: A "Fundadora de Estúdio Profissional" (B2B)
> *"Produzir jogos no Brasil é um ato de resistência. Precisamos profissionalizar a nossa distribuição para sermos sustentáveis."*

- **Perfil:** Helena Cavalcanti, 38 anos, CEO de pequeno/médio estúdio do RS. Sofre com taxas altas das multinacionais e a desvalorização do trabalho de talentos brasileiros.
- **Dores & Necessidades:** Foge de caciques de algoritmo em grandes repositórios. Quer dados sólidos para CAC e um hub forte de marketing indie que evite as altas comissões estrangeiras.
- **Impacto ESG (Governança):** Garantia de transparência em métricas, respeito legal, não complacência à pirataria e compliance nos repasses da Iara Games.

## 3. 🏗️ Estrutura e Layout (Grid e Semântica)
Refatoração considerável para otimização cross-device e SEO.

- **HTML5 Acessível e Rigoroso:** Aplicação cirúrgica das tags semânticas da especificação HTML5 (`<main>`, `<article>`, `<section>`, `<aside>`) para que Screen Readers (APIs leitoras e SEO) transitem com facilidade no conteúdo.
- **CSS Grid Layout:** A transição de displays na listagem de jogos (catálogo e vitrines): 
  - O conteúdo adota `grid` por ser imensamente robusto em dimensionamento dinâmico. Reduzimos de 4 colunas em Desktop até quadros flexíveis para `2x2` no Mobile/Médio usando `w-full` nos cards iterativos a fim de maximizar as Hitboxes em touch devices. 

## 4. 🖱️ Formulários e Interação Front-end
Para testificarmos o mapeamento entre design da rota de usuários, criamos e lapidamos `login.html`:

- **Transição No-JS:** Substituímos condicionantes complexas pelo "Hack" de Pseudo-Classes como o `:target`. Dependendo do hash mapeado na URL, expomos em tela de modo perfeitom sem load server-side ou requisições complexas, a transição exata entre as telas de Logar e Fazer Casdastro.
- **Tratamento Focado em Acessibilidade de Teclado:** Utilização obrigatória de labels para click areas invisíveis expandidas, pseudo `:focus-visible` em todos os inputs para não tirar quem não utiliza o mouse da localização, e `type` input para mobile browsers armarem teclados nativos exatos (@email, numeric etc.).

## 5. 🎨 Decisões de UI e Arquitetura de Navegação

A curadoria reduz a carga cognitiva da vitrine por agrupamento misto (Técnico X Emocional). 

### Eixo 1: A Descoberta Emocional (Home)
Ao invés de mostrar os games somente com nomenclaturas velhas e difíceis, fomos à essência:
- ⚡ **Na Pausa** (10-20 mins jogatinas casuais)
- 🧘 **Calmaria** (*Cozy* games e relaxamento pro final do expediente)
- 🌿 **Raízes** (Folclore vivo e RPGs que dialogam com nossa persona nordestina/nortista)
- 🔥 **Resenha** (Party games entre amigos)

### Eixo 2: Utilitário do Catálogo (games.html)
Para compras definitivas, priorizamos o controle rígido (filtragem utilitária de UX convencional que traz previsibilidade a conversão veloz): 
- **Ordens restritivas:** Alfabeto, Categorias técnicas (RPG/Plataforma)
- **Financeiros e Promoções:** Limites em "Até R$20" e "Grátis", permitindo que as Personas controlem as carteiras restritas de forma inteligente.

O ambiente respira a base cromática **`Deep Moss`**, mas qualquer superfície engajante da tela dispara feedbacks luminosos utilizando sombreados com **`Terracota Iara`** e energia do **`Fogo Fátuo`**. 

<p align="center">
  <a href="https://github.com/mewmewdevart/IaraGamesStore/blob/main/docs/Sprint%2002%20-%20Iara%20Games_2026%20-%20EAD.pdf">📝 Visualizar documentação completa</a>
</p>


[🔙 Ver Sprint 01](./01_sprint.md)

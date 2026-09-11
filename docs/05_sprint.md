# 🛠️ SPRINT 05 – INTERAÇÃO DINÂMICA E MANIPULAÇÃO DO DOM: PLATAFORMA IARA GAMES

Este documento detalha as decisões da Sprint 05 do projeto Iara Games, com foco na evolução da plataforma através de JavaScript, tornando a navegação mais intuitiva, dinâmica e acessível, baseando-se na manipulação do DOM e lógica de programação.


**Equipe Master3:** Ingrid Silva de Lima, Larissa Cristina Benedito e Mayla Mayumi Motobe.



## 🔗 Acessos e Entregas

- 🌐 **Deploy (Site Hospedado):** https://mewmewdevart.github.io/IaraGamesStore/

- 💻 **Repositório GitHub:** [https://github.com/mewmewdevart/IaraGamesStore](https://github.com/mewmewdevart/IaraGamesStore)

- 📖 **Documentação de Interação:** [Visualizar Documentação Completa](./docs/Sprint%2005%20-%202ºSemestre%20-%20Iara%20Games_2026%20-%20EAD.pdf)




## 1. 📌 Análise Crítica e UX Research



Nesta sprint, o foco foi transformar a interface estática em um ambiente interativo, eliminando barreiras de uso e otimizando a localização de conteúdo. Os principais problemas de interação identificados foram:

- **Barreira Linguística e Inclusão:** A plataforma era predominantemente textual, o que dificultava o acesso de usuários surdos que utilizam a Libras como primeira língua.

- **Fricção no Fluxo de Busca:** O usuário precisava navegar manualmente até a página de jogos para iniciar uma pesquisa, gerando um caminho desnecessariamente longo.

- **Filtros sem Contexto de Uso:** A categorização tradicional (gênero/preço) não atendia à necessidade de encontrar jogos para situações específicas (ex: jogos rápidos para pausas).

- **Limitação de Profundidade:** Os cards de jogos funcionavam apenas como visualização, sem permitir que o usuário explorasse detalhes técnicos ou descritivos antes da compra.



## 2. 🎨 Propostas de Reformulação e Soluções



A equipe implementou interações dinâmicas via JavaScript para criar uma experiência de e-commerce moderna:



- **Integração Assistiva VLibras:** Implementamos o widget fixo com o avatar Ícaro, permitindo a tradução de conteúdos textuais, títulos e menus para a Língua Brasileira de Sinais.

- **Search Engine no Navbar:** Desenvolvemos um script que captura a busca no cabeçalho e redireciona o usuário para a página de jogos já com os resultados filtrados via `URLSearchParams`.

- **Filtros Dinâmicos (Client-Side):** Criamos o filtro exclusivo "Momentos" (Na Pausa, Calmaria, Raízes, Resenha). A lógica processa os dados em tempo real sem recarregar a página, atualizando a grade de jogos instantaneamente.

- **Hero/Carrossel Automático:** Implementamos um componente dinâmico que alterna jogos em destaque a cada 6 segundos, com suporte a gestos swipe e navegação por teclado (setas, Home e End).

- **Arquitetura de Detalhes:** Criamos uma página de detalhes dinâmica que lê o ID do jogo pela URL e renderiza todas as informações (requisitos, nota, tags) de forma automatizada.



## 3. 🏗️ Padrões de Interação e Limitações Técnicas



O desenvolvimento desta sprint focou na lógica de programação para gerenciar estados de interface e persistência de dados.


- **Estado Atual:** Utilizamos `URLSearchParams` para que os filtros sejam persistentes e compartilháveis via link. A renderização é controlada pelas funções `filtrarJogos()` e `renderizarJogos()`, centralizadas no arquivo `data.js`.

- **Feedback de Interação:** Implementamos mudanças de estado em botões (ex: "Comprar" muda para "Adicionado ao Carrinho" e é desativado) para evitar ações redundantes e fornecer confirmação visual imediata.

- **Gerenciamento de Foco:** O carrossel automático é pausado quando recebe foco ou quando o usuário passa o mouse, respeitando o controle do usuário sobre a interface e evitando interrupções na navegação.




## 4. ♿ Evolução em Acessibilidade

A evolução tecnológica reafirma o compromisso com a inclusão digital:

- A integração do **VLibras** permite que a plataforma seja consumida por uma base maior de usuários, reduzindo a exclusão comunicativa.

- O sistema de carrossel respeita a diretriz `prefers-reduced-motion`, garantindo que usuários com sensibilidade a movimentos não tenham o auto-play ativado sem necessidade.

- A paginação e a organização semântica dos filtros garantem que usuários de tecnologias assistivas consigam navegar pelo catálogo de forma estruturada.



<p align="center">

  <a href="https://github.com/mewmewdevart/IaraGamesStore/blob/main/docs/Sprint%2005%20-%202%C2%BASemestre%20-%20Iara%20Games_2026%20-%20EAD.pdf">📝 Visualizar documentação completa da Sprint 05</a>

</p>



<p align="center">

  <a href="https://github.com/mewmewdevart/IaraGamesStore">💻 Acessar código-fonte no GitHub</a>

</p>



[🔙 Voltar para a (Sprint 04)](./04_sprint.md)

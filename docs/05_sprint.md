🛠️ SPRINT 05 – INTERAÇÃO DINÂMICA E ACESSIBILIDADE: PLATAFORMA IARA GAMES
Este documento detalha as decisões da Sprint 05 do projeto Iara Games, com foco na evolução da plataforma através de JavaScript para criar uma navegação intuitiva, dinâmica e acessível, utilizando a manipulação do DOM e lógica de programação para solucionar problemas reais de interação.
Equipe Master3: Ingrid Silva de Lima, Larissa Cristina Benedito e Mayla Mayumi Motobe.
🔗 Acessos e Entregas
🌐 Deploy (Site Hospedado): https://mewmewdevart.github.io/IaraGamesStore/
💻 Repositório GitHub: https://github.com/mewmewdevart/IaraGamesStore
📖 Documentação de Interação (PDF): Visualizar Sprint 05 no GitHub

1. 📌 Análise Crítica e UX Research
Nesta sprint, o objetivo foi transformar a experiência estática em uma jornada fluida, focando em como o JavaScript poderia reduzir a fricção e aumentar a inclusão. Os principais problemas de interação identificados foram:
Barreira de Acessibilidade: Usuários surdos enfrentavam exclusão em uma plataforma predominantemente textual, dependendo exclusivamente da leitura para compreensão.
Fricção na Localização (Search Journey): A busca era desconectada; o usuário precisava navegar manualmente até a página de jogos para encontrar títulos específicos.
Exposição Estática de Conteúdo: O "Hero" da página inicial não aproveitava o potencial de descoberta, limitando a visibilidade do catálogo crescente de jogos.
Sobrecarga Visual: Com o aumento da curadoria, a exibição de muitos cards simultaneamente sem uma paginação eficiente gerava fadiga cognitiva no usuário.
2. 🎨 Propostas de Interação e Soluções
A equipe implementou melhorias fundamentadas em Design de Interação e acessibilidade para tornar a plataforma viva e responsiva:
Acessibilidade Assistiva (VLibras): Integração do widget VLibras com o avatar "Ícaro" em todas as páginas, permitindo que usuários surdos acessem descrições, títulos e menus via tradução para Libras.
Busca Global e Persistente: Implementamos um script que escuta o evento keydown no navbar. Ao pressionar Enter, o usuário é redirecionado para a página de jogos com os parâmetros de busca já aplicados via URLSearchParams.
Filtros Multifacetados e Dinâmicos: Criamos uma lógica que filtra o catálogo por Gênero, Preço, Plataforma e "Momentos" (Na Pausa, Calmaria, Raízes, Resenha) sem recarregar a página, atualizando a grade de cards instantaneamente.
Hero/Carrossel Automatizado: Implementamos um sistema de rotação automática (6s) com suporte a navegação por teclado, gestos swipe em dispositivos móveis e pausa automática ao passar o mouse para não interromper o foco do usuário.
Página de Detalhes Orientada a Dados: Desenvolvimento de uma estrutura dinâmica que lê o ID do jogo na URL (?jogo=<id>) e renderiza informações completas do data.js, incluindo requisitos de sistema e estados interativos de botões.
3. 🏗️ Padrões de Interação e Bastidores Técnicos
O desenvolvimento focou na criação de uma interface que responde às ações do usuário de forma coerente e performática:
Lógica Client-Side: Toda a filtragem e renderização ocorre no lado do cliente, utilizando o arquivo data.js para garantir rapidez na resposta sem novas requisições ao servidor.
Normalização de Busca: O motor de busca realiza o tratamento de strings (remoção de acentos e lowercase), garantindo que buscas por "Ação" ou "acao" tragam os mesmos resultados precisos.
Interatividade de Estado: Botões de "Comprar" e "Lista de Desejos" agora possuem estados visuais confirmados (mudança de texto e ícones preenchidos) para fornecer feedback imediato.
Arquitetura de Navegação: A implementação da paginação organiza o acervo em conjuntos gerenciáveis, mantendo a consistência visual e o desempenho da página.
4. ♿ Evolução em Acessibilidade
A Sprint 05 consolida o compromisso da Iara Games com o Design Universal:
Ao integrar o VLibras, reduzimos drasticamente a barreira linguística, tornando a plataforma acessível para a comunidade surda que utiliza a Libras como primeira língua.
A implementação do carrossel respeita a configuração de "movimento reduzido" (prefers-reduced-motion) do sistema operacional do usuário, prevenindo desconforto para pessoas com sensibilidade a animações.
Garantimos que todas as novas funcionalidades interativas (buscas, filtros e carrosséis) sejam operáveis via teclado e tecnologias assistivas.
<p align="center">
<a href="https://github.com/mewmewdevart/IaraGamesStore/blob/main/docs/Sprint%2005%20-%20Iara%20Games.pdf">📝 Visualizar documentação completa da Sprint 05</a>
</p>
🔙 Voltar para a (Sprint 04)

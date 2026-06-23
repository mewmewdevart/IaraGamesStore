# 🛠️ SPRINT 04 – REFORMULAÇÃO DE UX E E-COMMERCE: PLATAFORMA IARA GAMES



Este documento detalha as decisões da Sprint 04 do projeto Iara Games, com foco na avaliação crítica e reformulação da interface para otimização de conversão e Design de Interação, baseando-se nos princípios de Cooper (2014).


**Equipe Master3:** Ingrid Silva de Lima, Larissa Cristina Benedito e Mayla Mayumi Motobe.



## 🔗 Acessos e Entregas

- 🌐 **Deploy (Site Hospedado):** https://mewmewdevart.github.io/IaraGamesStore/

- 💻 **Repositório GitHub:** [https://github.com/mewmewdevart/IaraGamesStore](https://github.com/mewmewdevart/IaraGamesStore)

- 📖 **Brandbook (Identidade Visual):** [Visualizar Brandbook no Canva](https://canva.link/brandbook-iaragames-np) ou [PDF](./Iara%20Games%20-%20Brandbook.pdf)




## 1. 📌 Análise Crítica e UX Research



Nesta sprint, realizamos um benchmark comparativo com plataformas líderes (Epic Games e Steam) para identificar barreiras na jornada do usuário. Os principais problemas de interação identificados foram:

- **Excise (Esforço Desnecessário): O processo de busca apresentava fricção cognitiva, exigindo cliques manuais extras para ativar o foco no campo de digitação.

- **Sobrecarga Cognitiva: A exibição simultânea de botões de "Login" e "Cadastrar" impunha uma carga de decisão desnecessária ao usuário no topo da página.

- **Falta de Semântica e Acessibilidade: Informações críticas, como a "Classificação Indicativa", eram renderizadas apenas via CSS, tornando-as invisíveis para tecnologias assistivas.
  
- **Habitos Desleixados: Ausência de feedbacks visuais de estado (ex: adição ao carrinho) e botões com áreas de toque insuficientes para dispositivos móveis.



## 2. 🎨 Propostas de Reformulação e Soluções



A equipe aplicou correções fundamentadas em Design de Interação para tornar a experiência fluida e acessível:



- **Otimização do Funil de Busca: Implementamos a expansão/retração automática via CSS, eliminando o atrito no fluxo de descoberta de produtos.

- **Consolidação da Autenticação: Unificamos os fluxos de acesso em um único botão "Iniciar Sessão", simplificando o cabeçalho e focando a atenção no catálogo.

- **Semântica de Dados: Convertemos a classificação indicativa para elementos <img> com atributos alt descritivos, garantindo que usuários com deficiência visual recebam a informação.

- **Ergonomia Mobile: Ajustamos os alvos de clique para o padrão de 44x44px e implementamos animações CSS de feedback ("piscar") para confirmar interações de compra.

- **Navegação Acessível: Transformamos indicadores de carrossel de <span> estáticos para <button> interativos, permitindo navegação via teclado.



## 3. 🏗️ Padrões de Interação e Limitações Técnicas



O desenvolvimento desta sprint focou na gestão de foco inteligente e micro-interações de e-commerce, mantendo o alinhamento com a identidade visual moderna.


- Estado Atual: As interações operam via CSS avançado, garantindo performance e acessibilidade imediata.
- Roadmap Futuro: Funcionalidades de sincronização dinâmica em tempo real (como a contagem do ícone do carrinho) e automação complexa de focus management estão mapeadas para a integração com a camada de lógica JavaScript na próxima etapa.
- Filosofia de Design: Adotamos o Progressive Disclosure, exibindo as ferramentas de navegação de forma estruturada e semântica para evitar a sobrecarga de informações.




## 4. ♿ Evolução em Acessibilidade

A reformulação reafirma o compromisso da Iara Games com a inclusão digital:

- Ao garantir que dados críticos sejam entregues via HTML semântico e não apenas por recursos visuais de CSS, reduzimos a exclusão de usuários que dependem de leitores de tela.

- O ajuste dos elementos interativos em dispositivos móveis melhora a usabilidade para uma parcela maior da base de usuários, seguindo os princípios de Design Universal.



<p align="center">

  <a href="https://github.com/mewmewdevart/IaraGamesStore/blob/main/docs/Sprint 04 - Iara Games_2026 - EAD.pdf">📝 Visualizar documentação completa da Sprint 04</a>

</p>



<p align="center">

  <a href="https://github.com/mewmewdevart/IaraGamesStore/blob/main/docs/Iara%20Games%20-%20Brandbook.pdf">🎨 Visualizar o Brandbook Completo</a>

</p>



[🔙 Voltar para a (Sprint 03)](./03_sprint.md) 


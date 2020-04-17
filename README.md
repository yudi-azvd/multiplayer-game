<h1 align="center">Multiplayer Game</h1>

<p align="center">
  <img align="center" src="/.github/multiplayer-game.gif" alt="multiplayer game gif" width="400">
</p>


## Node
Esse projeto usa a versão 13.13 do Node.js, mais especificamente as funcionalidades experimentais que dão suporte à sintaxe `import/export`.

## Minha implementação

### Regras
- acho que só tem uma: faça a maior quantidade de pontos
(Sim, meio tosco mesmo. Mas por enquanto é só isso mesmo.)

### 🕷 Bugs
- Quando o servidor é reiniciado devido a alguma alteração no código, o jogador se move "duplicadamente" ou "triplamente" dependendo do número de vezes que o servidor foi reiniciado.
- Às vezes o placar dos clientes podem ficar desatualizados com o placar que está no servidor. É mais fácil observar isso acontecer com mais de três clientes.


### ☑ A fazer
- Sistema de pontuação (corrigir)
- Limite de pontos
- Verificar desconexão de socket
- Fim de jogo


## 😀 Inspiração
Dá uma olhada nessa [playlist](https://www.youtube.com/watch?v=0sTfIZvjYJk&list=PLMdYygf53DP5SVQQrkKCVWDS0TwYLVitL) do [Filipe Deschamps](https://github.com/filipedeschamps/meu-primeiro-jogo-multiplayer) que você vai ter uma ideia de como implementar o jogo.


### ℹ Conteúdo da Playlist
- Desgin Patterns (Observer, Factory)
- Arquitetura de Software
- Separation of Concerns
- e mais umas paradas aí

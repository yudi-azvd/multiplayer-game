export default function createGame() {
  /* Tudo o que está aqui é da camada de Jogo */
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10,
    }
  }

  const observers = []

  function start() {
    const period = 200

    setInterval(addFruit, period);
  }

  // Adicionar inscrição por tópico
  function subscribe(obserFunction) {
    observers.push(obserFunction)
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command)
    }
  }

  function setState(newState) {
    Object.assign(state, newState)
  }

  function addPlayer(command) {
    const playerId = command.playerId
    const playerX = command.playerX ? command.playerX : Math.floor(Math.random()*state.screen.width)
    const playerY = command.playerY ? command.playerY : Math.floor(Math.random()*state.screen.height)

    state.players[playerId] = {
      x: playerX,
      y: playerY,
      score: 0,
    }

    notifyAll({
      type: 'add-player',
      playerId,
      playerX,
      playerY,
    })
  }

  function removePlayer(command) {
    const { playerId } = command

    delete state.players[playerId]

    notifyAll({
      type: 'remove-player',
      playerId,
    })
  }

  function updatePlayerScore(command) {
    const playerId = command.playerId
    const ammount = 1
    const previousScore = state.players[playerId].score
    state.players[playerId].score += ammount 
    const score = state.players[playerId].score

    // deveria mandar também o playerId?
    notifyAll({
      type: 'update-score',
      players: state.players,
      playerId,
      previousScore,
      score,
    })
  }

  function addFruit(command) {
    const fruitId = command ? command.fruitId : Math.floor(Math.random()*100000)
    const fruitX = command ? command.fruitX : Math.floor(Math.random()*state.screen.width)
    const fruitY = command ? command.fruitY : Math.floor(Math.random()*state.screen.height)

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY,
    }

    notifyAll({
      type: 'add-fruit',
      fruitId,
      fruitX,
      fruitY,
    })
  }

  function removeFruit(command) {
    const { fruitId } = command

    delete state.fruits[fruitId]

    notifyAll({
      type: 'remove-fruit',
      fruitId
    })
  }

  function movePlayer(command) {
    // console.log(`${command.playerId}, ${command.keyPressed}`)
    notifyAll(command)

    /* Usar Math.min, Math.max pra tirar mais IFs */
    const acceptedMoves = {
      ArrowUp(player) {
        if (player.y - 1 >= 0)
          player.y--
        // player.y = Math.max(player.y-1, 0)
      },
      ArrowDown(player) {
        if (player.y + 1 < state.screen.height)
          player.y++
      },
      ArrowLeft(player) {
        if (player.x - 1 >= 0)
          player.x--
      },
      ArrowRight(player) {
        if (player.x + 1 < state.screen.width)
          player.x++
        // player.x = Math.min(player.x+1, screen.width-1)
      },
    }

    const playerId = command.playerId
    const keyPressed = command.keyPressed
    const player = state.players[playerId]
    const moveFunction = acceptedMoves[keyPressed]

    /* pode vir um moviemnto que se refere a um jogador 
    que não existe mais devido à natureza assíncrona do 
    código */
    if (player && moveFunction) {
      moveFunction(player)
      checkForFruitCollision(playerId)
    }
  }
  
  function checkForFruitCollision(playerId) {
    const player = state.players[playerId]

    for (const fruitId in state.fruits) {
      const fruit = state.fruits [fruitId]

      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({ fruitId })
        updatePlayerScore({playerId})
      }
    }

  }

  return {
    state,
    start,
    setState,
    movePlayer,
    addPlayer,
    removePlayer,
    updatePlayerScore,
    addFruit,
    removeFruit,
    subscribe,
  }
}

/** transformei em módulo */
export default function createKeyboardListener(document) {
  /* Tudo o que está aqui é da camada de Input */
  /* Só escuta os eventos do Teclado, nem chega a fazer filtro */

  document.addEventListener('keydown', handleKeydown)
  
  const state = {
    observers : [],
    playerId: null,
  }

  function registerPlayerId(playerId) {
    state.playerId = playerId
  }

  function subscribe(obserFunction) {
    state.observers.push(obserFunction)
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command)
    }
  }

  function handleKeydown(event) {
    // camada de Input
    const keyPressed = event.key
    
    const command = {
      type: 'move-player',
      playerId: state.playerId,
      keyPressed
    }

    notifyAll(command)
  }

  return {
    subscribe,
    registerPlayerId
  }
}


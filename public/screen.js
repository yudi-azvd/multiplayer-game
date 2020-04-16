export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {
  /** @type {CanvasRenderingContext2D} */
  const context = screen.getContext('2d')
  context.fillStyle = '#fff'
  context.clearRect(0, 0, 10, 10)

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    context.fillStyle = '#000'
    context.fillRect(player.x, player.y, 1, 1)
  }

  for (const fruitId in game.state.fruits) {
    const player = game.state.fruits[fruitId]
    context.fillStyle = '#0f0'
    context.fillRect(player.x, player.y, 1, 1)
  }

  const currentPlayer = game.state.players[currentPlayerId]

  if (currentPlayer) {
    context.fillStyle = '#f0db4f'
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
  }

  requestAnimationFrame(() => 
    renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
  )
}

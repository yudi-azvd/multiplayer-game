export default function createRanking(currentPlayerId, document) {
  const state = {
    players: []
  }

  // Tenho que fazer o ranking ser formado só com o 
  // adicionar de novos jogadores

  function update(command) {
    if (command.type === 'update-score') {
      const players = command.players
      const playersArray = Object.keys(players).map(playerId => {
        return {playerId, score: players[playerId].score}
      })

      state.players = playersArray

      state.players.sort((p1, p2) => {
        return p2.score - p1.score
      })
    }
  }

  function getRanking() {
    return state.players
  }

  function getDomRanking() {
    const div = document.createElement('div')
    let innerHTML = '<ol>'

    state.players.forEach(player => {
      innerHTML += `<li class=${currentPlayerId === player.playerId ? 'currentPlayer' : ''} >`
      innerHTML += `<span>${player.playerId.slice(0, 5)}...</span>`
      innerHTML += `: ${player.score}`
      innerHTML += '</li>'
    })

    innerHTML += '</ol>'
    div.innerHTML = innerHTML

    return div
  }

  // function getDomRanking() {
  //   const div = document.createElement('div')
  //   const ol = document.createElement('ol')
  //   const lis = state.players.map(player => {
  //     const li = document.createElement('li')
  //     li.innerText = `${player.playerId.slice(0, 5)}...: ${player.score}`
  //     li.classList.add('currentPlayer')
  //     return li
  //   })

  //   console.log(lis)

  //   ol.append(lis)
  //   div.append(ol)

  //   return div
  // }

  return {
    update,
    getRanking,
    getDomRanking
  }
}
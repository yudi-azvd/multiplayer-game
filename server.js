// se usar isso aqui, tem que colocar "type": "module" no package.json
import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

// const express = require('express')
// const http = require('http')
// const createGame = require('./public/game')

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

game.start()

game.subscribe((command) => {
  sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
  const playerId = socket.id 

  game.addPlayer({playerId})

  socket.emit('setup', game.state)
  // socketS.emit('setup', game.state) atualizaria TODOS os soquetes

  // console.table(game.state.players)
  // console.log(Object.keys(sockets.sockets.sockets).length)
  
  socket.on('disconnect', () => {
    game.removePlayer({playerId})
  })

  socket.on('move-player', command => {
    command.playerId = playerId
    command.type = 'move-player'

    game.movePlayer(command)
  })
})

server.listen(3000, () => {
  console.log('ta rodando !')
})

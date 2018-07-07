// src/games/controller.ts
import { JsonController, Get, Param, NotFoundError, Put, Body, HttpCode, Post } from 'routing-controllers'
import Game from './entity'
import {moves, colors} from './logic'

@JsonController()
export default class GameController {

  @Get('/games/:id')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOne(id)
  }

  @Get('/games')
  async allGames() {
    const games = await Game.find()
    return { games }
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    if (update.color) {
      if (!colors.includes(update.color)) throw new NotFoundError('cant change color like that')
    }
    if (update.board) {
      if (moves(game.board,update.board)>=2) throw new NotFoundError('dont cheat fool!')
    }
    return Game.merge(game, update).save()
    console.log(typeof update)
  }

  @Post('/games')
  @HttpCode(201)
  createGame(
    @Body() game: Game
  ) {
    return game.save()
  }

}
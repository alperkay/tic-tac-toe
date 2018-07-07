// src/games/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import {randomColor, colors} from './logic'

export type BoardType = [
  [string, string, string],
  [string, string, string],
  [string, string, string]
]

const defaultBoard: BoardType = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string

  @Column('enum', {enum: colors})
  color: string = randomColor()

  @Column('json', {default: defaultBoard})
  board: BoardType
  

}
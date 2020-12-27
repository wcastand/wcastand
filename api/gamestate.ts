import RoomService from '@roomservice/node'
import { NowRequest, NowResponse } from '@vercel/node'

import { clean } from '../utils'

const wincombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export default async (request: NowRequest, response: NowResponse) => {
  const rs = RoomService(process.env.ROOMSERVICE || '')
  const checkpoint = await rs.checkpoint('tic-tac-toe')
  const gamestate = await checkpoint.map('state')
  const score = (gamestate.get('score') || [0, 0]) as [number, number]
  const playerturn = (gamestate.get('turn') || 0) as number
  const state = (gamestate.get('board') || []) as []
  const playercells = state.reduce<number[]>((acc, x, idx) => (x === playerturn ? [...acc, idx] : acc), [])
  console.log(
    gamestate.toObject(),
    playercells,
    wincombination.some((x) => x.every((y) => playercells.includes(y)))
  )
  const svg = `
    <svg viewBox="0 0 130 50" width="130" height="50" xmlns="http://www.w3.org/2000/svg">
      <rect width="130" height="50" x="0" y="0" rx="6" ry="6" fill="#fff" stroke="#171718" stroke-width="2"/>
      <text x="10" y="20" font-size="14px">Player's turn: ${playerturn === 0 ? 'Cross' : 'Circle'}</text>
      <text x="10" y="38" font-size="14px">Cross: ${score[0]}</text>
      <text x="70" y="38" font-size="14px">Circle: ${score[1]}</text>
    </svg>
    `
  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

import RoomService from '@roomservice/node'
import { NowRequest, NowResponse } from '@vercel/node'

import { clean } from '../utils'

export default async (_: NowRequest, response: NowResponse) => {
  const rs = RoomService(process.env.ROOMSERVICE || '')
  const checkpoint = await rs.checkpoint('tic-tac-toe')
  const gamestate = await checkpoint.map('state')
  const score = (gamestate.get('score') || [0, 0]) as [number, number]
  const playerturn = (gamestate.get('turn') || 0) as number
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

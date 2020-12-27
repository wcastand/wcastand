import RoomService from '@roomservice/node'
import { NowRequest, NowResponse } from '@vercel/node'

import { clean, Board } from '../utils'

export default async (request: NowRequest, response: NowResponse) => {
  const { cell } = request.query
  const rs = RoomService(process.env.ROOMSERVICE || '')
  const checkpoint = await rs.checkpoint('tic-tac-toe')
  const gamestate = await checkpoint.map('state')
  const state = (gamestate.get('board') || []) as Board
  const svg = `
    <svg viewBox="0 0 30 30" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" x="0" y="0" fill="#fff" stroke="#171718" stroke-width="2"/>
      ${
        state[cell as string] === 0
          ? `
        <circle r="12" cx="15" cy="15" fill="#8DCCAD"/>
        <circle r="10" cx="15" cy="15" fill="#fff"/>
      `
          : null
      }
      ${
        state[cell as string] === 1
          ? `
            <line x1="3" y1="3" x2="27" y2="27" stroke="#FF5475" stroke-width="2"/>
            <line x1="27" y1="3" x2="3" y2="27" stroke="#FF5475" stroke-width="2"/>
          `
          : null
      }
    </svg>
    `
  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

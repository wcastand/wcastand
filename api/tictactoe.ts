import qs from 'querystring'
import fetch from 'node-fetch'
import { NowRequest, NowResponse } from '@vercel/node'

import { clean, getGameState } from '../utils'

export default async (request: NowRequest, response: NowResponse) => {
  const params = request.query
  const x = parseInt(params.x.toString(), 10)
  const y = parseInt(params.y.toString(), 10)

  const gamestate = await getGameState()
  const svg = `
  <svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <a href="https://wcastand.vercel.app/api/game?${qs.encode({ x, y, p: gamestate[3] })}">
      <rect x="0" y="0" fill="#fff" height="32" width="32" />
      ${
        gamestate[x][y] === 'circle'
          ? `
          <circle cx="16" cy="16" r="14" fill="#000" />
          <circle cx="16" cy="16" r="12" fill="#fff" />
          `
          : null
      }
      ${
        gamestate[x][y] === 'cross'
          ? `
            <line x1="4" y1="4" x2="28" y2="28" stroke="#000" />
            <line x1="28" y1="4" x2="4" y2="28" stroke="#000" />
          `
          : null
      }
    </a>
  </svg>
  `

  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

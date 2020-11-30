import qs from 'querystring'
import { NowRequest, NowResponse } from '@vercel/node'

import { clean, getGameState, State } from '../utils'

function Cell(cell: number, p: State) {
  if (p !== null)
    return `
    <g>
        <rect x="0" y="0" fill="#fff" height="31" width="31" stroke="#000" stroke-width="1"  />
        ${
          p
            ? `
              <line x1="4" y1="4" x2="28" y2="28" stroke="#000" stroke-width="2" />
              <line x1="28" y1="4" x2="4" y2="28" stroke="#000" stroke-width="2" />
            `
            : `<circle cx="15" cy="15" r="13" fill="#fff" stroke="#000" stroke-width="2" />`
        }
    </g>
    `
  else
    return `
    <g>
      <a href="http://localhost:3000/api/game?cell=${cell}">
        <rect x="0" y="0" fill="#fff" height="31" width="31" stroke="#000" stroke-width="1"  />
      </a>
    </g>
    `
}

export default async (request: NowRequest, response: NowResponse) => {
  const params = request.query
  const cell = parseInt(params.cell.toString(), 10)
  const gamestate = await getGameState()
  // { state: [true, null, false, null, null, null, null, null, null], turn: true, cross: 2, circle: 0 }
  const svg = `
  <svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    ${Cell(cell, gamestate.state[cell])}
  </svg>
  `

  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

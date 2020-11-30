import qs from 'querystring'
import { NowRequest, NowResponse } from '@vercel/node'

import { clean, getGameState, State } from '../utils'

function Cell(x: number, y: number, cell: number, p: State) {
  const posx = 31 * x
  const posy = 31 * y
  if (p !== null)
    return `
    <g transform="translate(${posx}, ${posy})">
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
    <g transform="translate(${posx}, ${posy})">
      <a href="http://localhost:3000/api/game?cell=${cell}">
        <rect x="0" y="0" fill="#fff" height="31" width="31" stroke="#000" stroke-width="1"  />
      </a>
    </g>
    `
}

export default async (request: NowRequest, response: NowResponse) => {
  const gamestate = await getGameState()
  // { state: [true, null, false, null, null, null, null, null, null], turn: true, cross: 2, circle: 0 }

  const svg = `
  <svg viewBox="0 0 96 96" width="96" height="96" xmlns="http://www.w3.org/2000/svg">
    ${Cell(0, 0, 0, gamestate.state[0])}
    ${Cell(1, 0, 1, gamestate.state[1])}
    ${Cell(2, 0, 2, gamestate.state[2])}
    ${Cell(0, 1, 3, gamestate.state[3])}
    ${Cell(1, 1, 4, gamestate.state[4])}
    ${Cell(2, 1, 5, gamestate.state[5])}
    ${Cell(0, 2, 6, gamestate.state[6])}
    ${Cell(1, 2, 7, gamestate.state[7])}
    ${Cell(2, 2, 8, gamestate.state[8])}
  </svg>
  `

  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

import qs from 'querystring'
import { NowRequest, NowResponse } from '@vercel/node'

import { clean, getGameState } from '../utils'

function Cell(x: number, y: number, p: string) {
  const posx = 31 * x
  const posy = 31 * y
  if (p !== null)
    return `
    <g transform="translate(${posx}, ${posy})">
        <rect x="0" y="0" fill="#fff" height="31" width="31" stroke="#000" stroke-width="1"  />
        ${p === 'circle' ? `<circle cx="16" cy="16" r="13" fill="#fff" stroke="#000" stroke-width="2" />` : null}
        ${
          p === 'cross'
            ? `
              <line x1="4" y1="4" x2="28" y2="28" stroke="#000" />
              <line x1="28" y1="4" x2="4" y2="28" stroke="#000" />
            `
            : null
        }
    </g>
    `
  else
    return `
    <g transform="translate(${posx}, ${posy})">
      <a href="https://wcastand.vercel.app/api/game?${qs.encode({ x, y })}">
        <rect x="0" y="0" fill="#fff" height="31" width="31" stroke="#000" stroke-width="1"  />
      </a>
    </g>
    `
}

export default async (request: NowRequest, response: NowResponse) => {
  const gamestate = await getGameState()
  const cells = [[], [], []]
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) cells[i][j] = Cell(i, j, gamestate[i][j])

  const svg = `
  <svg viewBox="0 0 96 96" width="96" height="96" xmlns="http://www.w3.org/2000/svg">
    ${cells.join('')}
  </svg>
  `

  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

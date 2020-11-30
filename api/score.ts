import { NowRequest, NowResponse } from '@vercel/node'

import { clean, getGameState } from '../utils'

export default async (request: NowRequest, response: NowResponse) => {
  const gamestate = await getGameState()
  const svg = `
  <svg viewBox="0 0 150 75" width="150" height="75" xmlns="http://www.w3.org/2000/svg">
    <style>
      .small { font: normal 12px sans-serif; fill:#171718; }
      .bold { font: bold 14px sans-serif; fill:#171718; }
    </style>
    <text x="4" y="14" class="bold">Score</text>
    <text x="4" y="32" class="small">Circle: ${gamestate.circle || 0}</text>
    <text x="4" y="48" class="small">Cross: ${gamestate.cross || 0}</text>
    <text x="4" y="64" class="small">Cross: ${gamestate.turn ? 'Cross' : 'Circle'}'s turn</text>
  </svg>
  `

  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

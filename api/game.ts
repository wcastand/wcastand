import { NowRequest, NowResponse } from '@vercel/node'

import fetch from 'node-fetch'

import { getGameState, initState } from '../utils'

// true = cross
// false = circle

const winc: [number, number, number][] = [
  // horizontal win
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical win
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagomal win
  [0, 4, 8],
  [2, 4, 6],
]

export default async (request: NowRequest, response: NowResponse) => {
  const params = request.query
  const cell = parseInt(params.cell.toString(), 10)
  const gamestate = await getGameState()

  let g = gamestate
  g.state[cell] = g.turn

  const isWon = winc.some((c) => c.every((v) => g.state[v] === gamestate.turn))
  if (isWon)
    g = initState(gamestate.turn ? gamestate.cross + 1 : gamestate.cross, !gamestate.turn ? gamestate.circle + 1 : gamestate.circle)
  else g.turn = !gamestate.turn

  await fetch(`https://api.thisdb.com/v1/${process.env.bucketid}/gamestate`, {
    method: 'POST',
    headers: { 'X-Api-Key': process.env.thisdb },
    body: JSON.stringify(g),
  }).then(() => response.status(301).redirect(request.headers.referer || request.headers.origin || 'https://github.com/wcastand/wcastand'))
}

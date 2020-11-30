import { NowRequest, NowResponse } from '@vercel/node'

import fetch from 'node-fetch'

import { getGameState } from '../utils'

export default async (request: NowRequest, response: NowResponse) => {
  const params = request.query
  const x = parseInt(params.x.toString(), 10)
  const y = parseInt(params.y.toString(), 10)
  const gamestate = await getGameState()

  console.log(params)
  console.log(gamestate)

  let newG = gamestate
  if (gamestate[x][y] === null) {
    newG[x][y] = gamestate[3]
    newG[3] = gamestate[3] === 'circle' ? 'cross' : 'circle'
  }

  await fetch(`https://api.thisdb.com/v1/${process.env.bucketid}/gamestate`, {
    method: 'POST',
    headers: { 'X-Api-Key': process.env.thisdb },
    body: JSON.stringify(newG),
  }).then(() => response.status(301).redirect(request.headers.origin || 'https://github.com/wcastand/wcastand'))
}

import RoomService from '@roomservice/node'
import { NowRequest, NowResponse } from '@vercel/node'

import { wincombination, Board } from '../utils'

export default async (request: NowRequest, response: NowResponse) => {
  const { cell } = request.query
  const rs = RoomService(process.env.ROOMSERVICE || '')
  const checkpoint = await rs.checkpoint('tic-tac-toe')
  let gamestate = await checkpoint.map('state')
  const state = (gamestate.get('board') || []) as Board
  if (!state[cell as string]) {
    const playerturn = gamestate.get('turn') || (0 as 0 | 1)
    state[cell as string] = playerturn
    const playercells = state.reduce<number[]>((acc, x, idx) => (x === playerturn ? [...acc, idx] : acc), [])
    if (wincombination.some((x) => x.every((y) => playercells.includes(y)))) {
      gamestate = gamestate.set('board', [null, null, null, null, null, null, null, null, null])
      gamestate = gamestate.set('turn', 0)
      const [cross, circle] = (gamestate.get('score') as [number, number]) || [0, 0]
      gamestate = gamestate.set('score', [playerturn === 1 ? cross + 1 : cross, playerturn === 0 ? circle + 1 : circle])
    } else {
      gamestate = gamestate.set('board', state)
      gamestate = gamestate.set('turn', playerturn === 0 ? 1 : 0)
    }
  } else console.log('already played')

  console.log(gamestate.toObject())
  await checkpoint.save(gamestate)

  response.status(301).redirect('https://github.com/wcastand')
}

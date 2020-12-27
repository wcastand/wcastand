import RoomService, { MapClient } from '@roomservice/node'
import { NowRequest, NowResponse } from '@vercel/node'

const wincombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

type Cell = null | number
type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]

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
    if (wincombination.includes(playercells)) {
      console.log('wind')
      gamestate = gamestate.set('board', [null, null, null, null, null, null, null, null, null])
      gamestate = gamestate.set('turn', 0)
      const [cross = 0, circle = 0] = gamestate.get('score') as [number, number]
      gamestate = gamestate.set('score', [playerturn === 0 ? cross + 1 : cross, playerturn === 1 ? circle + 1 : circle])
    } else {
      console.log('keep going')
      gamestate = gamestate.set('board', state)
      gamestate = gamestate.set('turn', playerturn === 0 ? 1 : 0)
    }
  } else console.log('already played')

  console.log(gamestate.toObject())
  await checkpoint.save(gamestate)

  response.status(301).redirect(request.headers.referer || request.headers.origin || 'https://github.com/wcastand')
}

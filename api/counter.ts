import { NowRequest, NowResponse } from '@vercel/node'

import { getClient, clean } from '../utils'

export default async (_: NowRequest, response: NowResponse) => {
  const { get, set } = getClient()
  const counter = parseInt(await get('counter'), 10) || 0
  await set('counter', counter + 1)
  const svg = `
    <svg viewBox="0 0 180 30" width="180" height="30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="25" x="0" y="0" fill="#ED834E" />
      <rect width="40" height="25" x="60" y="0" fill="#FFFFFF" />
      <text x="5" y="16" font-size="14px" font-family="Courier New" fill="#FFFFFF">Visits</text>
      <text x="65" y="16" font-size="14px" font-family="Courier New" fill="#171718">${counter + 1}</text>
    </svg>
    `
  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

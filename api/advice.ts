import fetch from 'node-fetch'
import { NowRequest, NowResponse } from '@vercel/node'

import { clean } from '../utils'

export default async (_: NowRequest, response: NowResponse) => {
  const advice = await fetch('https://api.adviceslip.com/advice')
    .then((res) => res.json())
    .then((json) => json.slip.advice)
  const svg = `
    <svg viewBox="0 0 320 100" width="320" height="100" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background-color:white;
      ">
        <style>
        .text {
          color: #171718;
          padding: 16px;
          font-family: 'Roboto Condensed';
          font-size: 16px;
          line-height: 1em;
          position: relative;
          text-align:center;
        }
        </style>
        <div class="text">${advice}</div>
      </div>
    </foreignObject>
    </svg>
    `
  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

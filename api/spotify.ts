import fetch from 'node-fetch'
import { NowRequest, NowResponse } from '@vercel/node'

import { getAccessToken } from '../utils'

function clean(str: string) {
  return str.replace('&', '&amp;')
}

export default async (request: NowRequest, response: NowResponse) => {
  const token = await getAccessToken()
  const opts = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  }
  const info = await fetch('https://api.spotify.com/v1/me/player/currently-playing', opts)
    .then((res) => res.json())
    .then((json) => ({
      artists: json.item?.artists?.map((artist) => artist?.name ?? 'Unknown').join(', '),
      title: json.item?.name ?? 'Unknown',
      img: json.item?.album?.images[0] ?? null,
      year: new Date(json.item?.album?.release_date).getFullYear(),
    }))
    .catch(() =>
      fetch('https://api.spotify.com/v1/me/player/recently-played', opts)
        .then((res) => res.json())
        .then((json) => ({
          artists: json.items[0]?.track?.artists?.map((artist) => artist?.name ?? 'Unknown').join(', '),
          title: json.items[0]?.track?.name ?? 'Unknown',
          img: json.items[0]?.track?.album?.images[0] ?? null,
          year: new Date(json.items[0]?.track?.album?.release_date).getFullYear(),
        }))
    )
  const svg = `
    <svg viewBox="0 0 290 90" width="290" height="90" xmlns="http://www.w3.org/2000/svg">
      <style>
        .medium { font: normal 16px sans-serif; fill: #fff;  }
        .small { font: normal 16px sans-serif; fill: #fff;  }
      </style>
      <clipPath id="clip1">
        <rect x="90" y="10" width="180" height="26"/>
      </clipPath>
      <rect x="0" y="0" fill="#171718" height="90" width="290" rx="2" />
      <image x="13" y="13" href="${info.img.url}" height="64" width="64" preserveAspectRatio="xMidYMid meet" />
      <g x="90" y="13" width="100" height="26" clip-path="url(#clip1)">
        <text x="90" y="26" class="medium">
        <title>${info.title}</title>
        ${info.title}
        </text>
      </g>
      <text x="90" y="48" class="small">${info.artists}</text>
      <text x="90" y="68" class="small">${info.year}</text>
    </svg>
    `
  response.setHeader('Content-Type', 'image/svg+xml')
  response.status(200).send(clean(svg))
}

import redis from 'redis'
import fetch from 'node-fetch'
import { promisify } from 'util'
import { URLSearchParams } from 'url'

const state = 'my-readme'
const token_uri = 'https://accounts.spotify.com/api/token'
const authorize_uri = 'https://accounts.spotify.com/authorize'

const scopes = ['user-read-currently-playing', 'user-read-playback-state', 'user-read-recently-played']

export const wincombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export type Cell = null | number
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]

export function getClient() {
  const client = redis.createClient({ url: process.env.REDIS_URL })
  const get = promisify(client.get).bind(client)
  const set = promisify(client.set).bind(client)
  return { get, set, client }
}

export function buildAuthorizeURI() {
  return `${authorize_uri}?response_type=code&client_id=${encodeURI(process.env.clientid || '')}&redirect_uri=${encodeURI(
    process.env.redirecturi || ''
  )}&state=${encodeURI(state)}&scope=${encodeURI(scopes.join(' '))}`
}

export async function getAccessToken() {
  const { get } = getClient()
  const token = JSON.parse(await get('spotify'))
  const params = new URLSearchParams()
  params.append('client_id', process.env.clientid || '')
  params.append('client_secret', process.env.clientsecret || '')
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', token.refresh_token)

  const newToken = await fetch(token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params,
  })
    .then((res) => res.json())
    .then((json) => json.access_token)
    .catch((err) => console.error(err))

  return newToken
}

export function clean(str: string) {
  return str.replace(/&/gim, '&amp;')
}

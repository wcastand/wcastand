import fetch from 'node-fetch'

const client_id = process.env.clientid
const client_secret = process.env.clientsecret
const redirecturi = process.env.redirecturi

const state = 'my-readme'
const token_uri = 'https://accounts.spotify.com/api/token'
const authorize_uri = 'https://accounts.spotify.com/authorize'

const scopes = ['user-read-currently-playing', 'user-read-playback-state', 'user-read-recently-played']

export function buildAuthorizeURI() {
  return `${authorize_uri}?response_type=code&client_id=${encodeURI(client_id)}&redirect_uri=${encodeURI(redirecturi)}&state=${encodeURI(
    state
  )}&scope=${encodeURI(scopes.join(' '))}`
}

export async function getAccessToken() {
  const token = await fetch(`https://api.thisdb.com/v1/${process.env.bucketid}/token`, {
    method: 'GET',
    headers: { 'X-Api-Key': process.env.thisdb },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err))
  // console.log('token', token)
  const params = new URLSearchParams()

  params.append('client_id', client_id)
  params.append('client_secret', client_secret)
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

export async function getGameState() {
  return (
    (await fetch(`https://api.thisdb.com/v1/${process.env.bucketid}/gamestate`, {
      method: 'GET',
      headers: { 'X-Api-Key': process.env.thisdb },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err)
        return null
      })) ?? [[null, null, null], [null, null, null], [null, null, null], 'cross', 0, 0]
  )
}

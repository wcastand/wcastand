import fetch from 'node-fetch'
import { URLSearchParams } from 'url'
import { NowRequest, NowResponse } from '@vercel/node'

import { getClient } from '../utils'

const token_uri = 'https://accounts.spotify.com/api/token'

type Token = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export default async (request: NowRequest, response: NowResponse) => {
  const { error, code, state } = request.query as { code: string; error: string; state: string }
  if (state !== 'my-readme' || typeof code === 'undefined') response.status(500).send('state error')
  else if (error === 'access_denied') response.status(500).send('access denied')
  else {
    const { set } = getClient()
    const params = new URLSearchParams()
    params.append('client_id', process.env.clientid || '')
    params.append('client_secret', process.env.clientsecret || '')
    params.append('grant_type', 'authorization_code')
    params.append('redirect_uri', process.env.redirecturi || '')
    params.append('code', code)

    await fetch(token_uri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params,
    })
      .then((res) => res.json())
      .then((json: Token) => {
        console.log('token', json)
        return set('spotify', JSON.stringify(json))
      })
      .then(() => response.status(200).send('Logged'))
      .catch((err) => {
        console.log(err)
        response.status(500).send('Error')
      })
  }
}

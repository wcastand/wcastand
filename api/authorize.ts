import { NowRequest, NowResponse } from '@vercel/node'

import { buildAuthorizeURI } from '../utils'

export default (request: NowRequest, response: NowResponse) => {
  response.status(301).redirect(buildAuthorizeURI())
}

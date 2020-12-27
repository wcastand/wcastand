import { NowRequest, NowResponse } from '@vercel/node'

import { buildAuthorizeURI } from '../utils'

export default (_: NowRequest, response: NowResponse) => {
  response.status(301).redirect(buildAuthorizeURI())
}

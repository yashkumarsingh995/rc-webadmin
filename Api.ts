import axios from 'axios'
import { env } from './env'
import { getHeaders } from './services/Aws'

const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'

export default class Api {
  async request(
    url: string,
    method: string,
    data: any = {},
    authenticate = true,
    traceResult = true,
  ): Promise<any> {
    const headers = await getHeaders()
    const params: any = { method, headers }
    console.log(`Starting ${method} request at ${url}...`)
    if ([POST, PUT].indexOf(method) > -1) {
      params['body'] = JSON.stringify(data)
      console.log(`With data ${params['body']}`)
    }
    let response
    try {
      response = await fetch(url, params)
      if (!response.ok) {
        console.log(`${url} returned ${response.status}`)
        console.log(await response.text())
      } else {
        const resp_json = await response.json()
        if (traceResult) console.log('Response JSON:', resp_json)
        return resp_json
      }
    } catch (error) {
      return { error: error?.message ? error.message : 'Fetch error' }
    }
  }
  //   async getDashboardData() {}

  async getResource(imgPath) {
    try {
      const resp = await this.request(`${env.rcApiUrl}/download/object`, POST, { object_name: imgPath, })
      return resp
    } catch (error) {
      console.log(`error getting resource ${error}`)
      return { error }
    }
  }

  async submitUserCertification(id: string, update: any) {
    try {
      const resp = await this.request(`${env.rcApiUrl}/installer/${id}/certification`, PUT, {
        update,
      })
      return resp
    } catch (e) {
      console.log('newfoundry update error', e)
    }
  }

  async updateUser(id: string, update: any) {
    try {
      const resp = await this.request(`${env.rcApiUrl}/installers/${id}`, PUT, { update })
      return resp
    } catch (e) {
      console.log('newfoundry update error', e)
      // this.navigate('/login')
    }
  }
}

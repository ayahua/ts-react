import { BaseApi } from '../utils/axios'

export const testReq = (params: any) => BaseApi.post('/testReq', params)
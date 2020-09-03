import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
// import { env } from '@/env'
// import * as Sentry from '@sentry/browser'
// import {
//   API_CODE_NEED_LOGIN,
// } from '@/constants'
// import store from '@/store'

const errorMessageMap = {
  401: '需要登录',
  403: '用户没有权限',
  404: '请求地址有误',
  500: '服务器错误',
  502: '网关错误',
}

type errorMessageMapKey = keyof typeof errorMessageMap

function dispatchErrorMessage (desc: string) {
  // do somethings
  console.log(`network error! ${desc}`)
}

function beforeRequestInterceptor (request: AxiosRequestConfig) {
  return request
}

function errorRequestInterceptor (error: AxiosError) {
  throw error
}

function successResponseInterceptor (response: AxiosResponse) {
  const {
    data: {
      data,
      success,
      msg = null,
      code = null,
    },
  } = response

  if (!success) {
    switch (code) {
      case '403':
        dispatchErrorMessage('请登录')
        break
      default:
        dispatchErrorMessage(msg)
        break
    }

    // eslint-disable-next-line no-throw-literal
    throw { message: msg, code }
  }

  return data
}

function errorResponseInterceptor (error: AxiosError) {
  if (error.code === 'ECONNABORTED') {
    dispatchErrorMessage('请求超时')
  }
  if (error.response) {
    if (error.response.status === 401) {
      dispatchErrorMessage('请登录')
    }
    dispatchErrorMessage(errorMessageMap[error.response.status as errorMessageMapKey])
  } else {
    dispatchErrorMessage(error.message)
  }

  throw error
}

function ApiInstanceFactory (baseURL: string) {
  // create instance
  const instance = axios.create({
    baseURL,
    timeout: 120000,
    headers: { Accept: '*/*' },
    withCredentials: true,
  })

  // add request interceptors
  instance.interceptors.request.use(
    beforeRequestInterceptor,
    errorRequestInterceptor,
  )

  // add response interceptors
  instance.interceptors.response.use(
    successResponseInterceptor,
    errorResponseInterceptor,
  )

  return instance
}

const BaseApi = ApiInstanceFactory('/')

export {
  BaseApi,
}

export default BaseApi

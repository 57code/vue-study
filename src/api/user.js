import axios from '@/utils/request'

export function login(data) {
  return axios.post('/user/login', data)
}

export function getInfo() {
  return axios.get('/user/info')
}
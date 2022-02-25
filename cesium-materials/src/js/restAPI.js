import axios from 'axios'

export default new axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})
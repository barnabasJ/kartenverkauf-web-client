import fetch from 'isomorphic-unfetch'
import config from '../components/config'

export const makeGetRequest = async path => {
  const res = await fetch(`${config.api}${path}`)
  return res.json()
}

export const makePostRequest = async (path, data) => {
  const res = await fetch(`${config.api}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

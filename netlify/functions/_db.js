import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'

let client
export async function getDb() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
  }
  return client.db('chefPortfolio')
}

export const json = (status, data) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export function isAdmin(req) {
  try {
    const token = (req.headers.get('authorization') || '').replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_SECRET)
    return true
  } catch {
    return false
  }
}

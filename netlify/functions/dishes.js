import { getDb, json, isAdmin } from './_db.js'

export default async (req) => {
  const col = (await getDb()).collection('dishes')
  const id = new URL(req.url).searchParams.get('id')

  if (req.method === 'GET') {
    return json(200, await col.find({}, { projection: { _id: 0 } }).toArray())
  }

  if (!isAdmin(req)) return json(401, { error: 'Unauthorized' })

  if (req.method === 'POST') {
    const dish = await req.json()
    await col.insertOne({ ...dish })
    return json(201, { ok: true })
  }
  if (req.method === 'PUT') {
    const { id: _ignore, ...rest } = await req.json()
    await col.updateOne({ id }, { $set: rest })
    return json(200, { ok: true })
  }
  if (req.method === 'DELETE') {
    await col.deleteOne({ id })
    return json(200, { ok: true })
  }
  return json(405, { error: 'Method not allowed' })
}

export const config = { path: '/api/dishes' }

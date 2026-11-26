import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { dishes, recipes } from '../src/data/config.js'

const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()
const db = client.db('chefPortfolio')

for (const [name, data] of [['dishes', dishes], ['recipes', recipes]]) {
  const col = db.collection(name)
  if ((await col.countDocuments()) > 0) {
    console.log(`${name}: already has data, skipped`)
    continue
  }
  await col.insertMany(data.map((d) => ({ ...d })))
  console.log(`${name}: inserted ${data.length}`)
}
await client.close()

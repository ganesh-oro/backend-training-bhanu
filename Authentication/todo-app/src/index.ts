import {Hono, type Context} from 'hono';
import {serve} from '@hono/node-server';
import { db } from './db/dbConnection.js';
import { users } from './db/schemas/user.js';
import { authrouter } from './routes/authRoutes.js';
const app = new Hono();


app.route('/auth',authrouter);
// app.get('/',async(c:Context)=>{
//   const res = await db.select().from(users);
//   if(res){
//     return c.json(res);
//   }
// })

app.onError((e, c) => {
  // console.error(`${err}`)
  return c.json({ error: e.message }, 500)
})

const port = 3000;

serve({
  fetch:app.fetch,
  port
})

import {Hono, type Context} from 'hono';
import {serve} from '@hono/node-server';
import { db } from './db/dbConnection.js';
import { users } from './db/schemas/user.js';
import { auth } from 'hono/utils/basic-auth';
import { authrouter } from './routes/authRoutes.js';
const app = new Hono();


app.route('/auth',authrouter);

app.get('/',async(c:Context)=>{
  const res = await db.select().from(users);
  if(res){
    return c.json(res);
  }
})


const port = 21071

serve({
  fetch:app.fetch,
  port
})

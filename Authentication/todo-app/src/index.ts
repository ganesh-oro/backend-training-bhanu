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

app.onError((error:any, c) => {
  c.status(error.status || 500);
   return c.json({
    success:false,
    message: error.message || 'Internal Server Error', //if u get 500 you are the worst person on earth
    statusCode: error.status || 500,
    errorData: error.errData
  });
})

const port = 3000;

serve({
  fetch:app.fetch,
  port
})

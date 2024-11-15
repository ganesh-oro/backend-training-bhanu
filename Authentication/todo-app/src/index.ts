import {Hono} from 'hono';
import {serve} from '@hono/node-server';
import { authrouter } from './routes/authRoutes.js';
const app = new Hono();


app.route('/auth',authrouter);

app.onError((error:any, c) => {
  c.status(error.status || 500);
   return c.json({
    success:false,
    message: error.message || 'Internal Server Error', //if u get 500 you are the poor developer on earth
    statusCode: error.status || 500,
    errorData: error.errData
  });
})

const port = 3000;

serve({
  fetch:app.fetch,
  port
})

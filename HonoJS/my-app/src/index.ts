// import { Hono } from 'hono'
// import { serve, type HttpBindings } from '@hono/node-server'
// // or `Http2Bindings` if you use HTTP2

// type Bindings = HttpBindings & {
//   /* ... */
// }

// const app = new Hono<{ Bindings: Bindings }>()

// app.get('/', (c) => {
//   return c.json({
//     remoteAddress: c.env.incoming.socket.remoteAddress,
//   })
// })

// serve({
//   fetch:app.fetch,
//   port:5000
// })

import {Hono} from 'hono'
import {serve} from '@hono/node-server'
import { basicAuth } from 'hono/basic-auth';
import { serveStatic } from '@hono/node-server/serve-static';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono()
app.use(prettyJSON())
//Provides Authentication while trying to access this endpoint -- As a middleware 
app.use('/api/*',
  basicAuth(
  {
    username:'bhanu',
    password:'bhanu668',
  },
  {
    username:'admin',
    password:'admin'
  }
)
)

//Add Static folder 
app.use('*', serveStatic({ root: './static' })) 
app.get('/user',(c)=> c.json({message:'This is User Page'}));

app.post('/sports',
  async(c)=>{
    let body = await c.req.parseBody();
    let sports = body["sports"];
    return c.json({country:`I like ${sports}`});

  }
)


app.get('/user/profile/:start/:end',async(c)=>{

    let {start,end} = await c.req.param()
    return c.text(`Starting Page is ${start} and ending page is ${end}`)}


)

//app.get('/h',serveStatic({path:'./index.html'}));

app.get('/api/auth',(c)=>{


 return c.json({"method":"You are authorized"})
})







serve({
  fetch:app.fetch,
  port:5000
}); 




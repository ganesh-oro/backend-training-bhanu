import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRouter from './routes/authRoutes.ts'

const app = new Hono()

app.route('/auth', authRouter)

app.onError((err:any, c) => {
  c.status(err.status || 500);
  return c.json({
    success: false,
    message: err.message || 'Internal Server Error',  // 500 -----> You no need to do this job!!!
    StatusCode: err.status || 500,
    errorData: err.errData
  })
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

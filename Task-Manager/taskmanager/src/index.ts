import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import taskRoute  from './routes/taskRoute.ts';
import { logger } from 'hono/logger';
import appRoute from './routes/auth.ts';

const app = new Hono();
app.route('/tasks',taskRoute);
app.route('/auth',appRoute)
// app.use(logger());

app.onError((err, c) => {
  return c.json({
    success: false,
    message: err.message, 
    error: err.message 
  })
})

serve({
  fetch:app.fetch,
  port:21071
})

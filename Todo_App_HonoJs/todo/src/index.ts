import { Hono } from "hono";
import { serve } from "@hono/node-server";
// import { todo } from "node:test";


const app = new Hono();
const todos = new Hono();

interface Todo{
  id : string | number,
  title : string,
  completed : boolean
};

const todo_list: Todo[] = [];
app.get('/',(c)=>{
  return c.text('Welcome to Hono!');
})


todos.get('/',(c)=>{
  return c.json(todo_list);
})

todos.post('/add',async(c)=>{
  const body = await c.req.json();
  const res = {
    status:"Success",
    message:"task added successfully"
  }
  todo_list.push(body);
  return c.json(res);
})

todos.put('/:id',async(c)=>{
  let idx = parseInt(c.req.param('id'))
  const {title,completed} = await c.req.json();
  const todo = todo_list.find(t=>t.id===idx);
  // if(!todo){
  //   const err = [{message:"todo not found"}]
  //   return c.json(err);
  // }
  // todo.title = title
  // todo.completed = completed
  return c.json(todo);
})  

todos.delete('/delete/:id',async(c)=>{
  const id = parseInt(c.req.param('id'))
  const todo = todo_list.find(t=>t.id===id)

  //const idx = todo_list.findIndex(todo)
  return c.json(todo)
})

app.route('/api/todos',todos)
serve({
  fetch:app.fetch,
  port:3000
})
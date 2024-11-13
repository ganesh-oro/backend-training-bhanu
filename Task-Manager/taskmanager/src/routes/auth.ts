import {Hono} from 'hono';
import {register} from '../controllers/authController.ts';
const appRoute = new Hono()

appRoute.post('/register',register);
// appRoute.post('/login',login);

export default appRoute;



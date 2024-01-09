import express from 'express';
import { SignUp, SignIn, SignOut } from '../CONTROLLER/AUTH.js';

const route = express.Router();

route.post('/signup', SignUp);
route.post('/signin', SignIn);
route.get('/signout', SignOut);


export default route;
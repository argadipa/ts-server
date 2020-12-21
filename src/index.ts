/**
 * Express app using typescript
 */

import express, { Request, Response } from 'express';
import bodyPaser from 'body-parser';
import cookieSession from 'cookie-session'; 
import { AppRouter } from './AppRouter';

import './controllers/LoginControllers';
import './controllers/RootController';

const app = express();

// use bodyParser middleware so express can parse the form for us
// Order is important!
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['myrandomsessionkey'] }));
app.use(AppRouter.getInstance());


app.listen(3000, () => {
	console.log('Listening on port 3000');
});
/**
 * Express app using typescript
 */

import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyPaser from 'body-parser';
import cookieSession from 'cookie-session'; 
import { router as controllerRouter } from './controllers/decorators/controller';

import './controllers/LoginControllers';

const app = express();

// use bodyParser middleware so express can parse the form for us
// Order is important!
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['myrandomsessionkey'] }));
app.use(router);
app.use(controllerRouter);


app.listen(3000, () => {
	console.log('Listening on port 3000');
});
/**
 * Express app using typescript
 */

import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyPaser from 'body-parser';

const app = express();

// use bodyParser so express can parse the form for us
app.use(bodyPaser.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
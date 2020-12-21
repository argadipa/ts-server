import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: Record<string, string | undefined>;
}

function requireAuth(req:Request, res:Response, next:NextFunction): void {
	if(req.session && req.session.loggedIn) {
		next();
		return;
	}

	res.status(403);
	res.send('Not permitted.');
}

const router = Router();

router.get('/', (req:Request, res:Response) => {
	if(req.session && req.session.loggedIn) {
		res.send(`
			<div>
				<div>You are logged in</div>
				<a href='/logout'>Log out?</a>
			</div>
		`);
	} else {
		res.send(`
			<div>
				<div>You are logged out</div>
				<a href='/login'>Log in?</a>
			</div>
		`);
	}
});





router.get('/logout', (req: Request, res: Response) => {
	req.session = {
		loggedIn: false
	};

	res.send(`
	<div>Log in</div>
	<a href='/login'>Log In?</a>
	`);
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
	res.send('Welcome to protected auth!');
});

export { router };

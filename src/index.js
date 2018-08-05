import express from 'express';
import { NotFound } from 'http-errors';
import rescue from 'express-rescue';

const wait  = () => new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve();
	}, 500); // Wait 3s then resolve.
});

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.locals.rmWhitespace = true;
// app.locals.compileDebug = true;

app.get(
	'/',
	rescue(async (req, res) => {
		// await wait();
		res.render('index', {
			title: 'ti-',
			message: 'message'
		}, {compileDebug: true});
	})
);

app.get(
	'/home',
	rescue(async (req, res) => {
		// await wai  t();
		res.render('home', {
			title: 'title---',
			message: 'message'
		});
	})
);

app.get(
	'/ping',
	rescue(async (req, res) => {
		res.json({
			hello: 100,
		});
	})
);

app.get(
	'*',
	rescue(async () => {
		throw new NotFound();
	})
);

// Error handling
app.use(function (err, req, res, next) {
	let { stack, message = 'Internal Server Error', status } = err;
	console.error(stack || err);
	status = (typeof status == 'number') ? status : 500;
	res.status(status);
	res.format({
		default: () => res.send(message),
		html: () => res.send(message),
		json: () => res.json({
			status,
			message,
		}),
	});
});

app.listen(8001, () => {
	console.log('Server started');
});

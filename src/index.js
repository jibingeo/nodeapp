import express from 'express';
import { NotFound } from 'http-errors';
import rescue from 'express-rescue';

const app = express();

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

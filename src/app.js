import express from 'express';

const router = express.Router();

//Wrapper to catch exception
let wrap = fn => (...args) => fn(...args).catch(args[2]);

router.get(
  '*',
  wrap(async (req, res) => {
    let data = await new Promise((resolve, reject) => {
      setTimeout(resolve.bind(null, 'Hello'), 1000);
    });
    throw new Error('Hello');
    res.send(data);
  })
);

router.use(function(err, req, res, next) {
  let status = typeof err.status == 'number' ? err.status : 500;
  let message = err.message || 'Internal Server Error';
  res.status(status);
  res.format({
    default: () => res.send(message),
    html: () => res.send(message),
    json: () => res.status(status).json({
        status,
        message,
      }),
  });
});

export default router;

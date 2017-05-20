import express from 'express';

const router = express.Router();

//Wrapper to catch exception
let wrap = fn => (...args) => fn(...args).catch(args[2]);

router.get(
  '*',
  wrap(async (req, res) => {
    res.json({
      status: 0,
      data: {},
    });
  })
);

// Error handling
router.use(function(err, req, res, next) {
  let status = typeof err.status == 'number' ? err.status : 500;
  let message = err.message || 'Internal Server Error';
  res.status(status);
  res.format({
    default: () => res.send(message),
    html: () => res.send(message),
    json: () =>
      res.status(status).json({
        status,
        message,
      }),
  });
});

export default router;

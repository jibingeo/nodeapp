import express from 'express';
import { NotFound } from 'http-errors';

import { wrap } from './utils';

const router = express.Router();

router.get(
  '/ping',
  wrap(async (req, res) => {
    res.json({
      hello: 100,
    });
  })
);

router.get(
  '*',
  wrap(async () => {
    throw new NotFound();
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

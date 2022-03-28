import express from 'express';
import eventRouter from './event.route';
import userRouter from './user.route';

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json('Welcome to API');
});

router.use('/', userRouter);
router.use('/', eventRouter);

router.all('*', (req, res) => {
  res.status(404);
  throw new Error('404 route not found.');
});

export default router;

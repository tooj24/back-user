import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/users', (req: Request, res: Response) => {
  return res.send('users');
})
router.post('/users', (req: Request, res: Response) => {
  return res.send('create user');
})

export { router as UserRouter };
import express, { Request, Response } from 'express';
import { User } from '../models/user';

const router = express.Router();

// list users
router.get('/users', async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).send(users);
})

// get by id
router.get('/users/:id', async (req: Request, res: Response) => {
  const {id} = req.params;
  const user = await User.findById(id);
  return res.status(200).send(user);
})

// create user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { lastname, firstname, email } = req.body;

    const user = User.build({ lastname, firstname, email })
    await user.save();

    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
})

// delete user
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.remove({ _id: id });

    return res.status(200).send({
      'message': 'User deleted'
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
})

// update user
router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { updatedAt: Date.now, ...req.body });

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
})

export { router as UserRouter };
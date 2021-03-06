import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/user';
import { userValidation } from '../validation/user';

const router = express.Router();

// list users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
})

// get by id
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
})

// create user
router.post('/users', userValidation, async (req: Request, res: Response) => {
  try {
    const { lastname, firstname, email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
router.put('/users/:id', userValidation, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByIdAndUpdate(id, { updatedAt: Date.now, ...req.body });

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
})

export { router as UserRouter };
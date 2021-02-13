import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import User from '../models/userModel';
import { generateToken } from '../utils';

const userRouter = express.Router();

userRouter.get('/createadmin', expressAsyncHandler(async (req, res) => {
  try {
    const user = new User({
      name: 'admin',
      email: 'admin@example.com',
      password: 'jsamazona',
      isAdmin: true,
    });
    const createdUser = await user.save();
    res.send(createdUser);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}));
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!signinUser) {
    res.status(401).send({
      message: 'Invalid Email or Password'
    })
  } else {
    res.send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: generateToken(signinUser),
    });
  }
}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  const createUser = await user.save()
  if (!createUser) {
    res.status(401).send({
      message: 'Invalid User Data'
    })
  } else {
    res.send({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      isAdmin: createUser.isAdmin,
      token: generateToken(createUser),
    });
  }
}));
export default userRouter;

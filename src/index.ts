import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user';
import { DATABASE_URL } from './config/mongo';

const app = express();
app.use(json());

/**
 * Database
 */
mongoose.connect(DATABASE_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to database');
})

/**
 * Routes
 */
app.use(UserRouter);

/**
 * Start server
 */
app.listen(7000, () => {
  console.log('server is listening on port 7000');
})
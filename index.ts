import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import { UserRouter } from './src/routes/user';
import { DATABASE_URL } from './src/config/mongo';

const app = express();
const port = 8000;
app.use(cors());
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
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
})
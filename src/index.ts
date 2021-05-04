import express from 'express';
import { json } from 'body-parser';
import { UserRouter } from './routes/user';

const app = express();
app.use(json());

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
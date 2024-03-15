import 'dotenv/config';
import cors from 'cors';
import express, { json } from 'express';

import { setupMongo } from './database';
import { expressErrorHandler } from './middlewares/error-handler';
import { routes } from './routes';

const app = express();

setupMongo().then(() => {
  app.use(
    cors({
      origin: process.env.FRONT_URL,
    }),
  );
  app.use(json());
  app.use(routes);
  app.use(expressErrorHandler);

  app.listen(3333, () => console.log(`🚀 App is running at port ${3333}!`));
});

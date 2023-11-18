import cors, { CorsOptions } from 'cors';
import { Express } from 'express';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:5000'],
};

export const setupCors = (app: Express) => {
  app.use(cors(corsOptions));
};

import { dbServer, env, morgan, routes } from '@src/config';
import { globalErrorHandler } from '@src/middlewares';
import cors from 'cors';
import express, { type Express } from 'express';
import path from 'path';

const app: Express = express();

dbServer.pgConnect();
app.use(express.json());
// Enable cors
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(`/api/v${env.apiVersion ?? 1}`, routes);

// Global error handler => Handle uncaught errors
app.use(globalErrorHandler);
export default app;

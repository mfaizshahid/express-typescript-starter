import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { morgan, dbServer, routes, env } from "@src/config";
import { globalErrorHandler } from "@src/middlewares";
const app: Express = express();

void dbServer.pgConnect();
app.use(express.json());
// Enable cors
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(`/api/v${env.apiVersion ?? 1}`, routes);

// Global error handler => Handle uncaught errors
app.use(globalErrorHandler);
export default app;

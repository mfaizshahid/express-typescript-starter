import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { morgan, dbServer } from "@src/config";
import { globalErrorHandler } from "@src/middlewares";
const app: Express = express();

void dbServer.pgConnect();
app.use(express.json());
// Enable cors
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use("/api", (req, res) => {
  res.send("Hello World");
});

// Global error handler => Handle uncaught errors
app.use(globalErrorHandler);
export default app;

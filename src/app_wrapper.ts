import express, { type Express } from "express";
import cors from "cors";
import path from "path";
const app: Express = express();

app.use(express.json());
// Enable cors
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, "public")));

export default app;

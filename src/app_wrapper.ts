import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { morgan } from "@src/config";
const app: Express = express();

app.use(express.json());
// Enable cors
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use("/api", (req, res) => {
  res.send("Hello World");
});
export default app;

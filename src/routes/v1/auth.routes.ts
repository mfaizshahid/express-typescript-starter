import { validate } from "@src/middlewares";
import { AuthValidators } from "@src/validators";
import { Router } from "express";

const authRouter = Router();
authRouter.post("/register", validate(AuthValidators.register), (req, res) => {
  return res.send(req.body);
});
export default authRouter;

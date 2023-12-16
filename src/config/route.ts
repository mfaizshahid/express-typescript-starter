import { Router } from "express";
import { authRouter } from "@src/routes";
import { ApiResponse } from "@src/utils";
const router = Router();

router.get("/", (req, res) => {
  return new ApiResponse({}, "Hello World").send(res);
});
router.use("/auth", authRouter);

export default router;

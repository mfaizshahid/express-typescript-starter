import { Router } from "express";
import { adminRouter, authRouter } from "@src/routes";
import { ApiResponse } from "@src/utils";
import { adminMiddleware } from "@src/middlewares";
const router = Router();

router.get("/", (req, res) => {
  return new ApiResponse({}, "Hello World").send(res);
});
router.use("/auth", authRouter);
router.use("/admin", adminMiddleware.appendAdmin, adminRouter);
export default router;

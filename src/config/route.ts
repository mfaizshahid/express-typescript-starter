import { adminMiddleware } from '@src/middlewares';
import { adminRouter, authRouter } from '@src/routes';
import { ApiResponse } from '@src/utils';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return new ApiResponse({}, 'Hello World').send(res);
});
router.use('/auth', authRouter);
router.use('/admin', adminMiddleware.appendAdmin, adminRouter);
export default router;

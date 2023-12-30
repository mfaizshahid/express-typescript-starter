import adminMiddleware from '@/middlewares/admin.middleware';
import authenticate from '@/middlewares/authenticate.middleware';
import globalErrorHandler from '@/middlewares/error.middleware';
import validate from '@/middlewares/validate.middleware';

export { adminMiddleware, authenticate, globalErrorHandler, validate };

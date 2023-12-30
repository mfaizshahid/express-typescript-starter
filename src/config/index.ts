import env from '@/config/env';
import logger from '@/config/logger';
import morgan from '@/config/morgan';
import router from '@/config/route';
import dbServer from '@/config/server';

export { dbServer, env, logger, morgan, router as routes };

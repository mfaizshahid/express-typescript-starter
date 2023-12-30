import app from '@src/app_wrapper';
import { env, logger } from '@src/config';

app.listen(env.port, () => {
  logger.info(`Server running on port: ${env.port}`);
});

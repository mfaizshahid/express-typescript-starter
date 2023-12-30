import { IApp } from '@src/interfaces';
import { utils } from '@src/utils';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import env from '@/config/env';

const publicDir = './public';
const tmpDir = './tmp';
const logsDir = './tmp/logs';

utils.ensureDirectoryExists(publicDir);
utils.ensureDirectoryExists(tmpDir);
utils.ensureDirectoryExists(logsDir);

const unhandledExceptionOptions = {
  file: {
    level: 'info',
    filename: `${logsDir}/uncaught-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '14d',
  },
};
const logger = winston.createLogger({
  level: env.env === IApp.AppEnvTypes.DEVELOPMENT ? 'debug' : 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: `${logsDir}/application-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      json: false,
      level: 'info',
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(unhandledExceptionOptions.file)], // For uncaught exception
  exitOnError: false,
});

if (env.env === IApp.AppEnvTypes.DEVELOPMENT) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
export default logger;

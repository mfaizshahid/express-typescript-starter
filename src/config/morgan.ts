import morgan from "morgan";
import logger from "@/config/logger";

const successHandler = morgan("combined", {
  skip: (req, res) => res.statusCode >= 400,
  stream: {
    write: (message) => {
      logger.info(message.trim());
    },
  },
});

const errorHandler = morgan("combined", {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: (message) => {
      logger.error(`${message.trim()}`);
    },
  },
});

export default {
  successHandler,
  errorHandler,
};

import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";

// Define the log format
const logFormat = winston.format.combine(
  winston.format.errors({ stack: true }), // Include error trace
  winston.format.timestamp({
    format: "DD-MM-YYYY hh:mm:ss.SSS A",
  }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] ${level} - ${message} (${stack || "unknown"})`;
  })
);

// Create the logger
const logger = winston.createLogger({
  // logging levels - {error: 0,warn: 1,info: 2,http: 3,verbose: 4,debug: 5,silly: 6}
  level: "info", // Set the default log level
  format: logFormat,
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join("logs", "combined-%DATE%.log"),
      datePattern: "YYYY-MM",
      maxSize: "20m",
      zippedArchive: true,
      maxFiles: "14d",
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join("logs", "error-%DATE%.log"),
      level: "error",
      datePattern: "YYYY-MM",
      maxSize: "20m",
      zippedArchive: true,
      maxFiles: "14d",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: path.join("logs", "exceptions-%DATE%.log"),
      datePattern: "YYYY-MM",
      maxSize: "20m",
      zippedArchive: true,
      maxFiles: "14d",
    }),
  ],
  rejectionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: path.join("logs", "rejections-%DATE%.log"),
      datePattern: "YYYY-MM",
      maxSize: "20m",
      zippedArchive: true,
      maxFiles: "14d",
    }),
  ],
});

winston.add(
  new winston.transports.Console({ format: winston.format.simple() })
);

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console());
}

export default logger;

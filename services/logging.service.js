import winston from "winston";

// Define the log format
const logFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp({
    format: "DD-MM-YYYY hh:mm:ss.SSS A",
  }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

// Create the logger
const logger = winston.createLogger({
  // logging levels - {error: 0,warn: 1,info: 2,http: 3,verbose: 4,debug: 5,silly: 6}
  level: "info", // Set the default log level
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: "combined.log",
    }),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "info.log",
      level: "info",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exception.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console()
  );
}

export default logger;

import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";
// google logger
// import bunyan from "bunyan";
// Imports the Google Cloud client library for Bunyan
// import { LoggingBunyan } from "@google-cloud/logging-bunyan";
// Creates a Bunyan Cloud Logging client
// const loggingBunyan = new LoggingBunyan();

// Create a Bunyan logger that streams to Cloud Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
// const logger = bunyan.createLogger({
//   // The JSON payload of the log as it appears in Cloud Logging
//   // will contain "name": "my-service"
//   name: "ap-service",
//   streams: [
//     // Log to the console at 'info' and above
//     { stream: process.stdout, level: "info" },
//     // And log to Cloud Logging, logging at 'info' and above
//     loggingBunyan.stream("info"),
//   ],
// });

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  // console.log(message, ' cast error');

  return new HttpException(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `${value} is already in use. Please enter another value!`;
  return new HttpException(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  let errArr: Array<{}> = [];
  Object.keys(err.errors).forEach((key, index) => {
    errArr.push({ [key]: { message: err.errors[key]["message"] } });
  });
  return new HttpException("validation error", 422, errArr);
};

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    error: err,
    errors: err.errors,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  if (err.isOperationalError) {
    // logger.error(err.details);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.details,
      errors: err.errors,
    });
  } else {
    // logger.error("An error has occured!");
    res.status(500).json({
      status: false,
      errors: err.errors,
      message: "An error occurred!",
    });
  }
};

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.errors = error.errors || null;
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, response);
  } else if (process.env.NODE_ENV === "production") {
    let err = JSON.parse(JSON.stringify(error));
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);

    sendErrorProd(err, response);
  }
};

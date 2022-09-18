/**
 * Required External Modules
 */
import express, { Express, Request, Response } from "express";
import cors from "cors";
import sanitizer from "express-mongo-sanitize";
import xss from "xss-clean";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { TodoRouter } from "./routes";
const app: Express = express();
var allowlist = ["http://localhost:3000", process.env.FRONT_END_URL];
var corsOptionsDelegate = function (
  req: Request,
  callback: (err: any, corsOptions: any) => void
) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizer());
app.use(xss());
app.use(express.static("public"));
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "You have reached Todo api home page", success: true });
});
app.use("/todos", TodoRouter);
app.all("*", notFoundHandler);
app.use(errorHandler);

export default app;

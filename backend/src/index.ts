import dotenv from "dotenv";
dotenv.config();
// Uncaught Exceptions
process.on("uncaughtException", (err) => {
  process.exit(1);
});
/**
 * Configure App Variables
 */
import app from "./app";
import { connection } from "./config";
const config_1 = require("./config");
//db connection
connection();
if (!process.env.PORT) {
  process.exit(1);
}
exports.PORT = parseInt(process.env.PORT, 10);
const server = app.listen(exports.PORT, () => {
  console.log(`🚀 Server ready at port: ${exports.PORT}`);
});
process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});

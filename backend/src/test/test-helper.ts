import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

global.Promise = require("q").Promise;
mongoose.Promise = global.Promise;
const MONGO_DB_URL = process.env.MONGO_DB_TEST_URL;
mongoose.connect(MONGO_DB_URL);
mongoose.connection
  .once("open", () => console.log("Connected!"))
  .on("error", (error) => {
    console.warn("Error : ", error);
  });

// runs before each test. This empties the database before each test.
beforeEach(function (done) {
  mongoose.connection.db
    .listCollections({ name: "todos" })
    .next(function (err, collinfo) {
      if (collinfo) {
        mongoose.connection.collections.todos.drop((err) => {
          if (err) return done(err);
          done();
        });
      } else {
        done();
      }
    });
});

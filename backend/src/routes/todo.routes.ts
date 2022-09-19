import express from "express";
import { TodoController } from "../controllers";
import { catchAsync } from "../helpers";
import {
  ValidateCreateToDoRequest,
  ValidateUpdateToDoRequest,
} from "../middlewares/validators";

const TodoRouter = express.Router();
/* get all todos */
TodoRouter.route("/")
  .get(catchAsync(TodoController.getAllTodos))
  .post(ValidateCreateToDoRequest, catchAsync(TodoController.createTodo));
TodoRouter.route("/:id")
  .get(catchAsync(TodoController.getTodoById))
  .patch(ValidateUpdateToDoRequest, catchAsync(TodoController.updateTodo))
  .delete(catchAsync(TodoController.deleteTodo));
TodoRouter.route("/update-status/:id").patch(
  catchAsync(TodoController.updateStatus)
);
export default TodoRouter;

import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import { getOne, deleteOne, QueryHelper } from "../helpers";
import { Todo } from "../models";

class TodoController {
  constructor() {
    this.createTodo = this.createTodo.bind(this);
    this.getAllTodos = this.getAllTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }
  async createTodo(req: Request, res: Response, next: NextFunction) {
    let todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(200).json({
      success: true,
      results: 1,
      data: {
        todo,
      },
    });
  }
  async getAllTodos(req: Request, res: Response, next: NextFunction) {
    let query = new QueryHelper(Todo.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const todos = await (await query).query;
    res.status(200).json({
      success: true,
      results: todos.length,
      data: {
        todos,
      },
    });
  }
  async getTodoById(req: Request, res: Response, next: NextFunction) {
    getOne(Todo)(req, res, next);
    // const todo = await Todo.findById(req.params.id);
    // if (!todo) {
    //   return next(
    //     new HttpException("A Task with that Id does not exist!", 404)
    //   );
    // }
    // res.status(200).json({
    //   success: true,
    //   data: {
    //     todo,
    //   },
    // });
  }
  async updateTodo(req: Request, res: Response, next: NextFunction) {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return next(new HttpException("Task with that Id does not exist!", 404));
    }
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.status = req.body.status;
    await todo.save();

    res.status(200).json({
      success: true,
      data: {
        todo,
      },
    });
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    const todo = await Todo.findByIdAndUpdate(req.params.id);
    if (!todo) {
      return next(new HttpException("Task with that Id does not exist!", 404));
    }
    await todo.update({ status: "Completed" });
    res.status(200).json({
      success: true,
      data: {
        todo,
      },
    });
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    deleteOne(Todo)(req, res, next);
  }
}

export default new TodoController();

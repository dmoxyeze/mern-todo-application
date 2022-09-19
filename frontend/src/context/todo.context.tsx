import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Todo } from "../interfaces/todo";
import {
  deleteTodoService,
  getAllTodos,
  updateTodoService,
  updateTodoStatusService,
} from "../services";

type TodoContextInterface = {
  getTodos: () => void;
  todos: Todo[];
  deleteTodo: (id: string) => void;
  addTodo: (todo: Todo) => void;
  markAsCompleted: (id: string) => void;
  updateTodo: (todo: Todo) => void;
};

const defaultValues: TodoContextInterface = {
  getTodos: () => {},
  todos: [],
  deleteTodo: () => {},
  addTodo: () => {},
  markAsCompleted: () => {},
  updateTodo: () => {},
};

export const TodoContext = createContext<TodoContextInterface>(defaultValues);

type Props = {
  children?: ReactNode;
};

export const TodoContextProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const sortedTodos = todos.sort((t, f) => {
    let td = new Date(t.createdAt).getTime(),
      fd = new Date(f.createdAt).getTime();
    return fd - td;
  });
  const [refresh, setRefresh] = useState(false);
  const addTodo = (data: Todo) => {
    setTodos([...todos, data]);
    setRefresh(!refresh);
  };
  const deleteTodo = async (id: string) => {
    try {
      const { data } = await deleteTodoService(id);
      const filter = todos.filter((todo) => todo._id !== id);
      setTodos(filter);
      setRefresh(!refresh);
    } catch (error: any) {
      alert(error.message);
    }
  };
  const markAsCompleted = async (id: string) => {
    try {
      const { data } = await updateTodoStatusService(id);
      let index = todos.findIndex((todo) => todo._id === id);
      const todo = Object.assign({}, todos[index]);
      todo.status = "Completed";
      todos[index] = todo;
      setRefresh(!refresh);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateTodo = (data: Todo) => {
    let index = todos.findIndex((todo) => todo._id === data._id);
    todos[index] = data;
    setRefresh(!refresh);
  };

  const getTodos = async () => {
    try {
      const { data } = await getAllTodos();
      setTodos([...todos, ...data.data.todos]);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {}, [refresh]);
  return (
    <TodoContext.Provider
      value={{
        getTodos,
        todos: sortedTodos,
        addTodo,
        deleteTodo,
        markAsCompleted,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

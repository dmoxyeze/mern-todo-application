import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { TodoContext } from "../../context/todo.context";
import { Todo } from "../../interfaces/todo";
import Modal from "../Modal";
import { TodoItem } from "../TodoItem";
const Container = styled.div`
  ${tw`w-full md:(w-1/2)`}
`;
type Props = {
  todos: Todo[];
};
const TodoList = () => {
  const { todos, getTodos } = useContext(TodoContext);
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Container>
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItem todo={todo} key={todo._id} />)
      ) : (
        <div className="w-full p-4 bg-white mb-3 shadow relative rounded">
          You Todo list is empty.
        </div>
      )}
    </Container>
  );
};

export default TodoList;

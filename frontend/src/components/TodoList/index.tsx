import React, { useContext, useEffect } from "react";
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
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo._id} />
      ))}
      <Modal />
    </Container>
  );
};

export default TodoList;

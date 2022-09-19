import React, { useContext, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { TodoContext } from "../../context/todo.context";
import { Todo } from "../../interfaces/todo";
import Modal from "../Modal";

const Container = styled.div`
  ${tw`w-full p-4 bg-white mb-3 shadow relative rounded`}
`;
const HeaderContainer = styled.div`
  ${tw`flex justify-between items-center`}
`;
const IconSection = styled.div`
  ${tw`absolute top-5 right-2 `}
`;
const Svg = styled.svg`
  ${tw`h-5 w-5 mb-2`}
`;
const Header = styled.h3`
  ${tw`pb-3 font-bold text-sm`}
`;
const Status = styled.span`
  font-family: "Open Sans", sans-serif;
  ${tw`text-[12px] flex items-center lowercase px-2 py-1 rounded text-white capitalize`}
`;
const Description = styled.div`
  font-size: 13px;
  line-height: 20px;
  ${tw`text-gray-700 mb-3`}
`;
type Props = {
  todo: Todo;
};
export const TodoItem = ({ todo }: Props) => {
  const { markAsCompleted, deleteTodo } = useContext(TodoContext);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleVisibility = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <>
      <Container>
        <HeaderContainer>
          <Header>{todo.title}</Header>
        </HeaderContainer>
        <Description>{todo.description}</Description>
        <div className="flex items-center gap-x-2">
          {todo.status === "Completed" ? (
            <Status className="bg-green-400">{todo.status}</Status>
          ) : (
            <>
              <Status className="bg-orange-400">{todo.status}</Status>
              <Status
                className="bg-green-400 !capitalize cursor-pointer"
                onClick={() => markAsCompleted(todo._id)}
              >
                Mark as completed
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                  className="h-[20px] text-white fill-current"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
              </Status>
            </>
          )}
        </div>
        <IconSection>
          <Svg
            onClick={toggleVisibility}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
            className=" text-gray-500 fill-current"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
          </Svg>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
            className=" text-red-700 fill-current"
            onClick={() => deleteTodo(todo._id)}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
          </Svg>
        </IconSection>
      </Container>
      <Modal
        visibility={modalVisible}
        todo={todo}
        setVisibility={toggleVisibility}
      />
    </>
  );
};

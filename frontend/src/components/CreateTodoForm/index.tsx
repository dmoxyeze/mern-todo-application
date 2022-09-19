import { ChangeEvent, useContext, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { TodoContext } from "../../context/todo.context";
import { createTodoService } from "../../services";
import CustomButton from "../CustomButton";
import { FormContainer } from "../FormContainer";
import { FormLabel } from "../FormLabel";
import TextInput from "../TextInput";

const FormWrapper = styled.div`
  ${tw`w-full relative h-[fit-content] bg-white rounded p-4 shadow-md md:(w-1/2)`}
`;
const CreateTodoForm = () => {
  const { addTodo } = useContext(TodoContext);
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e: ChangeEvent, field: string) => {
    setErrors({ ...errors, [field]: "" });
    setData({ ...data, [field]: (e.target as HTMLInputElement).value });
  };
  const createTodo = async () => {
    const payload = data;
    try {
      const { data } = await createTodoService({ ...payload });
      //validation error occured
      if (data.error) {
        let response = data.error.error;
        setErrors(response);
      } else {
        addTodo(data.data.todo);
        setData({
          title: "",
          description: "",
        });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <FormWrapper>
      <FormContainer>
        <FormLabel title="Title" />
        <TextInput
          hasError={errors.title !== ""}
          error={errors.title}
          value={data.title}
          placeholder="Enter a title for the task"
          onChange={(e: ChangeEvent) => handleChange(e, "title")}
        />
      </FormContainer>
      <FormContainer>
        <FormLabel title="Description" />
        <TextInput
          hasError={errors.description !== ""}
          error={errors.description}
          value={data.description}
          placeholder="Enter a small description for the task"
          onChange={(e: ChangeEvent) => handleChange(e, "description")}
        />
      </FormContainer>
      <FormContainer>
        <CustomButton text="Submit" onClick={createTodo} />
      </FormContainer>
    </FormWrapper>
  );
};

export default CreateTodoForm;

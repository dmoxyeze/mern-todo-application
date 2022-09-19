import React, { ChangeEvent, ReactNode, useContext, useState } from "react";
import { TodoContext } from "../../context/todo.context";
import { Todo } from "../../interfaces/todo";
import { updateTodoService } from "../../services";
import CustomButton from "../CustomButton";
import { FormContainer } from "../FormContainer";
import { FormLabel } from "../FormLabel";
import TextInput from "../TextInput";

type Props = {
  todo: Todo;
  setVisibility: () => void;
  visibility: boolean;
};
const Modal = ({ todo, setVisibility, visibility }: Props) => {
  const { updateTodo } = useContext(TodoContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: todo.title,
    description: todo.description,
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e: ChangeEvent, field: string) => {
    setErrors({ ...errors, [field]: "" });
    setData({ ...data, [field]: (e.target as HTMLInputElement).value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    const payload: any = { ...data };
    payload.id = todo._id;
    try {
      const { data } = await updateTodoService({ ...payload });
      //validation error occured
      if (data.error) {
        let response = data.error.error;
        setErrors(response);
      } else {
        updateTodo(data.data.todo);
        setVisibility();
      }
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      {visibility ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all">
            <div className="flex items-center my-6 mx-auto w-full md:max-w-xl absolute inset-0">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
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
                      onChange={(e: ChangeEvent) =>
                        handleChange(e, "description")
                      }
                    />
                  </FormContainer>
                  <FormContainer>
                    <CustomButton
                      isLoading={loading}
                      text="Submit"
                      onClick={handleSubmit}
                    />
                  </FormContainer>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white bg-red-600 font-bold capitalize px-6 py-2 text-sm outline-none rounded focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={setVisibility}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="bg-[rgb(0,0,0)] inset-0 z-[-1] opacity-75 fixed"></div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;

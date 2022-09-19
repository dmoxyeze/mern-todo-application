import React, { ChangeEvent } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  font-family: "Open Sans", sans-serif;
  ${tw`mb-2 w-full`}
`;
const BaseInput = styled.textarea`
  border: 1px solid rgba(19, 4, 34, 0.2);
  ${tw`rounded text-sm bg-[#fbfeff] w-full py-2 px-4 md:(py-3 px-6)`}
`;
const ErrorComponent = styled.div`
  font-family: "Open Sans", sans-serif;
  ${tw`px-2 text-red-700 text-sm`}
`;
type Props = {
  className?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: ChangeEvent) => void;
  id?: string;
  name?: string;
  hasError?: boolean;
  error?: string;
};
const CustomTextArea = ({
  className,
  value,
  placeholder,
  type = "text",
  onChange,
  id,
  name,
  hasError,
  error,
}: Props) => {
  return (
    <Container>
      <BaseInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        rows={3}
      >
        {value}
      </BaseInput>
      {hasError && <ErrorComponent>An error has occured</ErrorComponent>}
    </Container>
  );
};

export default CustomTextArea;

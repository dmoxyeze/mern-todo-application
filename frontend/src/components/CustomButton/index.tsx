import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const BaseButton = styled.button`
  ${tw`w-full py-2 px-4 !bg-green-500 rounded text-white text-sm`}
`;
type Props = {
  text?: string;
  type?: "submit" | "button";
  onClick?: () => void;
};
const CustomButton = ({ text, type = "button", onClick }: Props) => {
  return (
    <BaseButton type={type} onClick={onClick}>
      {text}
    </BaseButton>
  );
};

export default CustomButton;

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
  isLoading?: boolean;
};
const CustomButton = ({
  text,
  type = "button",
  onClick,
  isLoading = false,
}: Props) => {
  return (
    <BaseButton type={type} onClick={onClick} disabled={isLoading}>
      {isLoading ? "processing ..." : text}
    </BaseButton>
  );
};

export default CustomButton;

import styled from "styled-components";
import tw from "twin.macro";

const BaseLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  ${tw`mb-1 text-gray-700`}
`;
type Props = {
  title?: string;
};
export const FormLabel = ({ title }: Props) => {
  return <BaseLabel>{title}</BaseLabel>;
};

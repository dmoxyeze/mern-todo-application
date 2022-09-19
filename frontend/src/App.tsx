import "./App.css";
import styled from "styled-components";
import CreateTodoForm from "./components/CreateTodoForm";
import TodoList from "./components/TodoList";
import "styled-components/macro";
import tw from "twin.macro";

const Container = styled.div`
  ${tw``}
`;
const TodoWrapper = styled.div`
  ${tw`md:(flex justify-center)`}
`;
const Header = styled.h1`
  font-family: "Open Sans", sans-serif;
  ${tw`text-center text-xl font-bold mt-4 mb-4 md:(font-extrabold text-4xl mt-12)`}
`;
const Row = styled.div`
  ${tw`p-2 relative flex flex-col gap-y-4 w-full md:(flex-row gap-x-4  p-4 justify-center w-2/3)`}
`;
const FormColumn = styled.div``;
const ListColumn = styled.div``;

function App() {
  return (
    <Container>
      <Header>My Todo List</Header>
      <TodoWrapper>
        <Row>
          <CreateTodoForm />
          <TodoList />
        </Row>
      </TodoWrapper>
    </Container>
  );
}

export default App;

import "mocha";
import { Todo } from "../models";
import { ITodo } from "../interfaces/todo.interface";

//require chai and use should() assertions
let chai = require("chai");
chai.should();

describe("Creating a New Todo", () => {
  describe("Creates a Todo successfully", () => {
    it("Returns the newly created Todo", () => {
      //todo object
      let todo: ITodo = {
        title: "My Todo Title",
        description: "Lorem Ipsum",
      };
      //create Todo and return promise
      return new Todo(todo).save().then((result) => {
        //verify _id property exists
        result._id.should.exist;

        //verify title
        result.title.should.equal(todo.title);

        //verify descriptiom
        result.description.should.equal(todo.description);

        //verify status
        result.status.should.equal("Pending");
      });
    });
  });
  describe("Throws an error when fields are invalid or contains error", () => {
    it("Returns an error if title is less than 5", () => {
      //todo object
      let data: ITodo = {
        title: "My",
        description: "Lorem Ipsum",
      };
      //create Todo and return promise
      return new Todo(data)
        .save()
        .catch((error: any) => console.log(error.message));
    });
    it("Returns an error if description is less than 10", () => {
      //todo object
      let data: ITodo = {
        title: "My Todo Title",
        description: "Lorem",
      };
      return new Todo(data)
        .save()
        .catch((error: any) => console.log(error.message));
    });
  });
});
describe("Reading Todos", () => {
  let todo;
  let data: ITodo = {
    title: "My Todo Title",
    description: "Lorem Ipsum",
  };
  beforeEach(() => {
    return new Todo(data).save().then((res) => (todo = res));
  });
  it("Return all todos", () => {
    return Todo.find().then((result) => {
      result.should.have.length(1);
    });
  });
  it("Returns a matching Todo By ID", () => {
    return Todo.findById(todo.id).then((result) => {
      result.id.should.equal(todo.id);
    });
  });
  it("should throw an error for an invalid ID", () => {
    return Todo.findById(12345).catch((error) => {
      console.log(error.message);
    });
  });
});

describe("Deleting Todo", () => {
  let todo;
  let data: ITodo = {
    title: "My Todo Title",
    description: "Lorem Ipsum",
  };
  beforeEach(() => {
    return new Todo(data).save().then((res) => (todo = res));
  });
  it("Removes a user using its id", () => {
    return Todo.findByIdAndDelete(todo.id).then((res) => {
      Todo.findById(res.id).then((todo) => {
        todo.should.equals(null);
      });
    });
  });
});

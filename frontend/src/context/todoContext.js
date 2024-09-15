import React from "react";

const TodoContext = React.createContext({
  todoList: [],
  handlePostRequest: () => {},
  handleDeleteRequest: () => {},
  handlePutRequest: () => {},
  statusUpdateRequest: () => {},
});

export default TodoContext;

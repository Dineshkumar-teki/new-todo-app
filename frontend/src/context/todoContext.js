import React from "react";

const TodoContext = React.createContext({
  todoList: [],
  profileData: {},
  handlePostRequest: () => {},
  handleDeleteRequest: () => {},
  handlePutRequest: () => {},
  statusUpdateRequest: () => {},
  handleProfileData: () => {},
});

export default TodoContext;

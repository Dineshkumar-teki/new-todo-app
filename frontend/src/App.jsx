import { useState, useEffect } from "react";
import TodoContext from "./context/todoContext.js";
import axios from "axios";
import Home from "./components/Home.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);

  const fetchTodosList = async () => {
    await axios
      .get("http://localhost:3000/todos")
      .then((response) => setTodoList(response.data.todoItems))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTodosList();
  }, []);

  const handlePostRequest = async (todo) => {
    await axios
      .post("http://localhost:3000/todos", todo)
      .then((response) => {
        console.log(response.data);
        fetchTodosList();
      })
      .catch((error) => console.log(error.message));
  };

  const handlePutRequest = async (id, todo) => {
    await axios
      .put(`http://localhost:3000/todos/${id}`, todo)
      .then((response) => {
        console.log(response.data);
        fetchTodosList();
      })
      .catch((error) => console.log(error.message));
  };

  const handleDeleteRequest = async (id) => {
    await axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchTodosList();
      })
      .catch((error) => console.log(error.message));
  };

  const statusUpdateRequest = async (id, todo) => {
    await axios
      .put(`http://localhost:3000/todos/${id}`, todo)
      .then((response) => {
        console.log(response.data);
        fetchTodosList();
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        handlePostRequest: handlePostRequest,
        handlePutRequest: handlePutRequest,
        handleDeleteRequest: handleDeleteRequest,
        statusUpdateRequest: statusUpdateRequest,
      }}
    >
      <Home />
    </TodoContext.Provider>
  );
}

export default App;

import { useState, useEffect } from "react";
import TodoContext from "./context/todoContext.js";
import axios from "axios";
import Home from "./components/Home.jsx";
import { useSnackbar } from "notistack";

function App() {
  const [todoList, setTodoList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar("Todo created successfully", { variant: "success" });
        fetchTodosList();
      })
      .catch((error) =>
        enqueueSnackbar(`${error.message}`, { variant: "failure" })
      );
  };

  const handlePutRequest = async (id, todo) => {
    await axios
      .put(`http://localhost:3000/todos/${id}`, todo)
      .then((response) => {
        enqueueSnackbar("Todo updated successfully", { variant: "success" });
        fetchTodosList();
      })
      .catch((error) =>
        enqueueSnackbar(`${error.message}`, { variant: "failure" })
      );
  };

  const handleDeleteRequest = async (id) => {
    await axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((response) => {
        enqueueSnackbar("Todo deleted successfully", { variant: "success" });
        fetchTodosList();
      })
      .catch((error) =>
        enqueueSnackbar(`${error.message}`, { variant: "failure" })
      );
  };

  const statusUpdateRequest = async (id, todo) => {
    await axios
      .put(`http://localhost:3000/todos/${id}`, todo)
      .then((response) => {
        todo.status && enqueueSnackbar("Great Job", { variant: "success" });
        fetchTodosList();
      })
      .catch((error) =>
        enqueueSnackbar(`${error.message}`, { variant: "failure" })
      );
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

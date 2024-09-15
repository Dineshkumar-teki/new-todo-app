import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import TodoContext from "../context/todoContext";
import Popup from "reactjs-popup";
import EditTodoItem from "./EditTodoTab";

const taskTypes = [
  { id: "WORK", type: "work", color: "#D2CEFF", active: false },
  { id: "STUDY", type: "study", color: "#D1E5F7", active: false },
  {
    id: "ENTERTAINMENT",
    type: "entertainment",
    color: "#FFCECE",
    active: false,
  },
  { id: "FAMILY", type: "family", color: "#DAF2D6", active: false },
];

const TodoCard = ({ eachTask }) => {
  const [displayEditAndDeleteCard, setDisplayEditAndDeleteCard] =
    useState(false);

  const { _id, title, description, tags, status } = eachTask;
  const typeOfTasks = taskTypes.filter((eachTask) =>
    tags.includes(eachTask.id)
  );

  const eAndDCard = displayEditAndDeleteCard ? null : "hideCard";
  const isTaskDone = status ? "taskDone" : null;
  return (
    <TodoContext.Consumer>
      {(props) => {
        const { statusUpdateRequest, handleDeleteRequest } = props;
        const onClickThreeDots = () => {
          setDisplayEditAndDeleteCard(!displayEditAndDeleteCard);
        };

        const onChangeTaskStatus = () => {
          const todo = { _id, title, description, tags, status: !status };
          statusUpdateRequest(_id, todo);
        };

        const onTodoDelete = () => {
          setDisplayEditAndDeleteCard(!displayEditAndDeleteCard);
          handleDeleteRequest(_id);
        };

        return (
          <li className="bg-yellow-200 p-3 rounded-lg flex flex-col gap-5 mb-5 justify-between">
            <div className="flex justify-between relative">
              <h1 className={`text-2xl font-semibold ${isTaskDone && "line-through"}`}>{title}</h1>
              <button type="button" className="font-semibold text-xl" onClick={onClickThreeDots}>
                <BsThreeDots />
              </button>
              <div
                className={`bg-white w-24 px-2 py-1 rounded-lg absolute top-6 right-0 ${
                  eAndDCard ? "hidden" : "block"
                }`}
              >
                <Popup modal trigger={<button type="button">Edit...</button>}>
                  {(close) => (
                    <EditTodoItem
                      todoItem={eachTask}
                      close={close}
                      onClickThreeDots={onClickThreeDots}
                    />
                  )}
                </Popup>
                <hr />
                <button type="button" onClick={onTodoDelete}>
                  Delete
                </button>
              </div>
            </div>
            <p className={`${isTaskDone && "line-through"}`}>{description}</p>
            <div className="flex justify-between items-center">
              <ul className="flex gap-2">
                {typeOfTasks.map((eachTask) => (
                  <div
                    key={eachTask.id}
                    style={{ backgroundColor: eachTask.color }}
                    className="w-9 h-9 rounded-full"
                  ></div>
                ))}
              </ul>
              <div className="flex items-center gap-2 font-semibold">
                <input
                  type="checkbox"
                  id={_id}
                  checked={status}
                  onChange={onChangeTaskStatus}
                />
                <label htmlFor={_id} style={{ color: status ? "gray" : "" }}>
                  Done
                </label>
              </div>
            </div>
          </li>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default TodoCard;

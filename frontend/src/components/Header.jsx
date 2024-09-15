import { FaPlus } from "react-icons/fa";
import Popup from "reactjs-popup";
import CreateTodoTab from "./CreateTodoTab";

const Header = () => {
  return (
    <nav className="flex justify-between items-center min-h-[10vh] border-b border-gray-300 px-3">
      <h1 className="text-lg font-semibold bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 px-3 py-1 rounded-md text-white ">
        todo
      </h1>
      <Popup
        modal
        trigger={
          <button className="font-semibold text-xl hover:text-white hover:bg-blue-400 p-3 rounded-full">
            <FaPlus />
          </button>
        }
      >
        {(close) => <CreateTodoTab close={close} />}
      </Popup>
    </nav>
  );
};

export default Header;

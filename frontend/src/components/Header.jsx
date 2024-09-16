import { FaPlus } from "react-icons/fa";
import Popup from "reactjs-popup";
import CreateTodoTab from "./CreateTodoTab";

const Header = () => {
  return (
    <nav className="flex justify-between items-center min-h-[10vh] border-b border-gray-300 px-5">
      <h1 className="text-lg font-semibold bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 px-3 py-1 rounded-md text-white ">
        todo
      </h1>
      <Popup
        modal
        trigger={
          <button
            className="relative font-semibold text-lg flex items-center gap-1 shadow-inner hover:before:content-['Create'] bg-gradient-to-r from-teal-400 to-purple-400 bg-teal-500 text-white p-2 rounded-full"
            type="button"
          >
            <FaPlus className="w-[30px] h-[30px] border-2 p-1 rounded-full " />
          </button>
        }
      >
        {(close) => <CreateTodoTab close={close} />}
      </Popup>
    </nav>
  );
};

export default Header;

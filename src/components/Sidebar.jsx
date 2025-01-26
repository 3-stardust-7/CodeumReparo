import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../backend/supabase/auth";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between left-0 top-0 z-50 ">
      <div>
        <h2 className="text-2xl text-center font-bold text-teal-400 mb-10 mt-[40px]">
          TaskFlow
        </h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate("/add")}
              className={`w-full  text-left px-4 py-2 rounded-lg cursor-pointer ${
                isActive("/add")
                  ? "bg-teal-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              Add Task
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/")}
              className={`w-full  text-left px-4 py-2 rounded-lg cursor-pointer ${
                isActive("/")
                  ? "bg-teal-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/ongoing")}
              className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                isActive("/ongoing")
                  ? "bg-teal-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              Ongoing
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/upcoming")}
              className={`w-full text-left px-4 py-2  rounded-lg cursor-pointer ${
                isActive("/upcoming")
                  ? "bg-teal-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              Upcoming
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/completed")}
              className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                isActive("/completed")
                  ? "bg-teal-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              Completed
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/expired")}
              className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                isActive("/expired")
                  ? "bg-teal-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              Expired
            </button>
          </li>
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

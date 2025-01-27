// 


import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../backend/supabase/auth"; // Assuming you have a custom logout method for Supabase

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current location is active
  const isActive = (path) => location.pathname === path;

  // Handle logout and session cleanup
  const handleLogout = async () => {
    try {
      // // Perform the logout action
      // await logout(); // Supabase logout function

      // // Optionally, clear session storage or any additional user data
      // localStorage.removeItem("userSession"); // Clear any stored session data in localStorage
      // sessionStorage.removeItem("userSession"); // Clear sessionStorage as well

      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Navigation items
  const navItems = [
    { label: "Add Task", path: "/add" },
    { label: "Home", path: "/" },
    { label: "Ongoing", path: "/ongoing" },
    { label: "Upcoming", path: "/upcoming" },
    { label: "Completed", path: "/completed" },
    { label: "Expired", path: "/expired" },
  ];

  // Render each navigation item
  const renderNavItem = ({ label, path }) => (
    <li key={path}>
      <button
        onClick={() => navigate(path)} // Navigate to the specific path
        className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
          isActive(path)
            ? "bg-teal-600 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-white"
        }`}
        aria-current={isActive(path) ? "page" : undefined}
      >
        {label}
      </button>
    </li>
  );

  return (
    <div className="h-screen fixed w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between left-0 top-0 z-50">
      <div>
        <h2 className="text-2xl text-center font-bold text-teal-400 mb-10 mt-[40px]">
          TaskFlow
        </h2>
        <ul className="space-y-4">{navItems.map(renderNavItem)}</ul>
      </div>

      {/* Logout button */}
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

import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./pages/Home";
import Ongoing from "./pages/Ongoing";
import Upcoming from "./pages/Upcoming";
import Completed from "./pages/Completed";
import Expired from "./pages/Expired";
import AddTaskForm from "./components/AddTaskForm";
import TaskDetails from "./components/TaskDetails";
import UpdateTaskForm from "./components/UpdateTaskForm";
import Sidebar from "./components/Sidebar";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideSidebarRoutes = ["/login", "/register"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-zinc-900 h-screen flex">
      {showSidebar && <Sidebar onLogout={handleLogout} />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ongoing" element={<Ongoing />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/expired" element={<Expired />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/add" element={<AddTaskForm />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/task/:id/update" element={<UpdateTaskForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

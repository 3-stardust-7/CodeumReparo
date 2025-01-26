import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTaskById, deleteTask } from "../backend/supabase/tasks";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await fetchTaskById(id);
      if (error) {
        console.error("Error fetching task:", error.message);
        return;
      }
      setTask(data);
    };
    fetchTask().finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmation) return;

    const result = await deleteTask(id);
    if (result) {
      navigate("/");
    } else {
      alert("An error occurred while deleting the task.");
    }
  };

  const handleUpdate = () => {
    navigate(`/task/${id}/update`, { state: { task } });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Loading task...</p>
      </div>
    );
  if (!task)
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Task not found</p>
      </div>
    );

  return (
    <div className="pt-20">
      <div className="min-h-screen text-white flex flex-col items-center p-6">
        <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-5 text-teal-400 mt-5 text-center">
            {task.name}
          </h1>
          <p className="text-gray-300 mb-4">{task.desc}</p>

          <p className="mb-4">
            <span className="text-gray-300 font-semibold">Deadline:</span>{" "}
            <span className={`text-gray-${task.deadline ? "200" : "400"}`}>
              {task.deadline
                ? new Date(task.deadline).toLocaleString("en-GB")
                : "No Deadline"}
            </span>
          </p>

          <p className="mb-4">
            <span className="text-gray-300 font-semibold">Tags:</span>{" "}
            {task.tags && task.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-400">{task.tags}</span>
            )}
          </p>

          <p className="mb-6">
            <span className="text-gray-300 font-semibold">Status:</span>{" "}
            <span
              className={
                task.status === "not-started"
                  ? "text-gray-200 font-semibold"
                  : task.status === "in-progress"
                  ? "text-yellow-400 font-semibold"
                  : "text-green-400 font-semibold"
              }
            >
              {task.status === "not-started"
                ? "Not Started"
                : task.status === "in-progress"
                ? "In Progress"
                : "Completed"}
            </span>
          </p>

          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              className="pr-4 pl-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                          >
              Delete Task
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700"
            >
              Update Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

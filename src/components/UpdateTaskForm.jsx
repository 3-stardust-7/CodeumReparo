import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateTask } from "../backend/supabase/tasks";

const UpdateTaskForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;

  const [name, setName] = useState(task?.name || "");
  const [desc, setDesc] = useState(task?.desc || "");
  const [status, setStatus] = useState(task?.status || "not-started");
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [newDeadline, setNewDeadline] = useState("");
  const [tags, setTags] = useState(task?.tags || []);
  const [newTag, setNewTag] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updates = {
      name,
      desc,
      status,
      deadline:  deadline, 
      tags,
    };

    const result = await updateTask(task.id, updates);

    if (result) {
      navigate(`/task/${task.id}`);
    } else {
      alert("An error occurred while updating the task.");
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="pt-5">
      <form
        onSubmit={handleUpdate}
        className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-700 text-white text-[2px] rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter task name"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description:
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter task description"
              rows="4"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            >
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Deadline: (Leave empty to keep current deadline)
            <input
              type="datetime-local"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {deadline && (
              <p className="text-gray-400 text-sm mt-2">
                Current Deadline: {new Date(deadline).toLocaleString("en-GB")}
              </p>
            )}
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags:
          </label>
          <div className="flex gap-2 flex-wrap mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-400 hover:text-red-600 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-teal-600 px-4 py-2 rounded-lg shadow hover:bg-teal-700"
            >
              Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-teal-600 text-white rounded-lg font-semibold shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskForm;

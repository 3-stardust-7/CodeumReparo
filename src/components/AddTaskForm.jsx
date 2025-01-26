import React, { useState } from "react";
import { addTask } from "../backend/supabase/tasks";
import { getUser } from "../backend/supabase/auth";
import { useNavigate } from "react-router-dom";

const tagOptions = ["Work", "Personal", "Urgent", "Low Priority", "Health"];

const AddTaskForm = ({ onTaskAdded }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await getUser();
    if (userError || !user) {
      setError("Failed to fetch user. Please log in.");
      setLoading(false);
      return;
    }

    const { success, error: addTaskError } = await addTask({
      user_id: user.id,
      name,
      desc,
      deadline: new Date(deadline).toISOString(),
      
    });

    setLoading(false);
    if (success) {
      setName("");
      setDesc("");
      setDeadline("");
      setTags([]);
      if (onTaskAdded) onTaskAdded();
      navigate("/");
    } else {
      setError(addTaskError.message);
    }
  };

  const handleTagSelect = (e) => {
    const selectedTag = e.target.value;
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="pr-80 pt-20">
      <form
        onSubmit={handleAddTask}
        className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <div>
          <label className="block text-sm mb-[-10px] font-medium text-gray-300 mb-2">
            Task Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name"
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Task Description:
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter task description"
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Deadline:
          </label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-[#ff00ee] rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags:
          </label>
          <select
            onChange={handleTagSelect}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="">Select a tag</option>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-teal-600 text-white px-3 py-1 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  className="ml-2 text-gray-300 hover:text-red-400"
                  onClick={() => removeTag(tag)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold shadow-lg ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {loading ? "Adding Task..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;

// 








import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { fetchActiveTasks } from "../backend/supabase/tasks";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabase/supabaseClient";
import Fuse from "fuse.js";
import { debounce } from "lodash"; // import debounce function

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expiredTasks, setExpiredTasks] = useState([]); // For expired tasks
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user: ", error.message);
        return;
      }
      setUser(user);
    };
    fetchUser().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      fetchActiveTasks(user?.id)
        .then((taskData) => {
          // Separate tasks into expired and active tasks
          const now = new Date();
          const active = taskData.filter(
            (task) => new Date(task.deadline) > now
          );
          const expired = taskData.filter(
            (task) => new Date(task.deadline) <= now
          );

          setTasks(active);
          setExpiredTasks(expired); // Store expired tasks separately
          setFilteredTasks(active); // Initially set filtered tasks to active tasks
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [user]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }
  if (!user) {
    navigate("/login");
    return;
  }

  // Debounced search handler
  const handleSearch = debounce(() => {
    if (!searchQuery.trim()) {
      setFilteredTasks(tasks);
      return;
    }

    const fuse = new Fuse(tasks, {
      keys: ["name", "desc", "tags"],
      threshold: 0.3,
    });

    const results = fuse.search(searchQuery);
    setFilteredTasks(results.map((result) => result.item));
  }, 300); // 300ms debounce

  const hasActiveTasks = tasks.length > 0;
  const hasExpiredTasks = expiredTasks.length > 0;

  return (
    <div className="flex flex-col items-center min-h-screen text-white invert relative p-4">
      <div className="flex flex-col justify-center h-full w-5/12 px-4 py-4 mt-20">
        <div className="flex w-full mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(); // Trigger search as the user types
            }}
            placeholder="Search tasks..."
            className="w-full p-3 bg-gray-700 text-white rounded-l-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={handleSearch}
            className="bg-teal-600 text-white px-6 rounded-r-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Search
          </button>
        </div>

        {/* Active Tasks */}
        {hasActiveTasks ? (
          <TaskList tasks={filteredTasks} message="No Active Tasks Yet" />
        ) : (
          <p className="text-center text-gray-400">
            You have no active tasks at the moment.
          </p>
        )}

        {/* Expired Tasks */}
        {hasExpiredTasks && (
          <div className="mt-6">
            <h2 className="text-xl text-gray-300">Expired Tasks</h2>
            <TaskList tasks={expiredTasks} message="No Expired Tasks" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

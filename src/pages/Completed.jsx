{/**import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { fetchTasksByStatus } from "../backend/supabase/tasks";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabase/supabaseClient";
import Fuse from "fuse.js";

function Completed() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data:{user},
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

  // useEffect(() => {
  //   if (user) {
  //     fetchTasksByStatus(user?.id, "completed").then((data) => {
  //       setTasks(data);
  //       setFilteredTasks(data);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (user) {
      fetchTasksByStatus(user.id, "completed").then((data) => {
        setTasks(data);
        setFilteredTasks(data);
      });
    }
  }, [user]);

  //DEBOUNCE SEARCH INPUT

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 300); // Adjust debounce time as needed

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);



  if (loading) {
    return <p className="text-white justify-center items-center">Loading...</p>;
  }
  if (!user) {
    navigate("/login");
    return;
  }

  const handleSearch = () => {
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
  };

  const hasTasks = tasks.length > 0;

  return (
    <div className="flex flex-col items-center min-h-screen text-white -z-10 relative p-4">
      <div className="flex flex-col justify-center h-full w-5/12 px-4 py-4 mt-20">
      
        {hasTasks && (
          <div className="flex w-full mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        )}
        <TaskList tasks={filteredTasks} message="No Completed Tasks" />
      </div>
    </div>
  );
}

export default Completed;*/}








import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { fetchTasksByStatus } from "../backend/supabase/tasks";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabase/supabaseClient";
import Fuse from "fuse.js";

function Completed() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch user data
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

  // Fetch completed tasks
  useEffect(() => {
    if (user) {
      fetchTasksByStatus(user.id, "completed").then((taskData) => {
        console.log("Fetched completed tasks:", taskData); // Debugging
        const fetchedTasks = taskData || [];
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);
      });
    }
  }, [user]);

  // Redirect to login if no user
  if (loading) {
    return <p className="text-white">Loading...</p>;
  }
  if (!user) {
    navigate("/login");
    return null;
  }

  // Search functionality
  const handleSearch = () => {
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
  };

  const hasTasks = tasks.length > 0;

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-900 text-white relative p-4">
      <div className="flex flex-col justify-center h-full w-1/2 px-4 py-4 mt-20">
        {hasTasks && (
          <div className="flex w-full mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        )}

        <TaskList tasks={filteredTasks} message="No Completed Tasks" />
      </div>
    </div>
  );
}

export default Completed;

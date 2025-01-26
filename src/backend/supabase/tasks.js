import { supabase } from "./supabaseClient";

export async function fetchTasks(user_id) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.error("Error fetching tasks:", error.message);
    return [];
  }
  return data;
}

export async function fetchActiveTasks(user_id) {
  const currentDate = new Date().toISOString();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user_id)
    .in("status", ["not-started", "in-progress"])
    .gt("deadline", currentDate);
  if (error) {
    console.error("Error fetching active tasks:", error.message);
    return [];
  }
  return data;
}

export async function fetchExpiredTasks(user_id) {
  const currentDate = new Date().toISOString();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user_id)
    .lt("deadline", currentDate);
  if (error) {
    console.error("Error fetching expired tasks:", error.message);
    return [];
  }
  return data;
}

export async function fetchTasksByStatus(user_id, status) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user_id)
    .eq("status", status);
  if (error) {
    console.error(`Error fetching ${status} tasks:`, error.message);
    return [];
  }
  return data;
}

export async function fetchTaskById(id) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching task by ID:", error.message);
    return { data: null, error };
  }
  return { data, error: null };
}

export async function addTask({ user_id, name, desc, deadline, tags }) {
  const status = "not-started";
  const { data, error } = await supabase.from("tasks").insert([
    {
      user_id: user_id,
      name: name,
      desc: desc,
      deadline: deadline,
      tags: tags,
      status: status,
    },
  ]);

  if (error) {
    console.error("Error adding task:", error.message);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function updateTask(id, updates) {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error updating tasks:", error.message);
    return null;
  }
  return data;
}

export async function deleteTask(id) {
  const { data, error } = await supabase
    .from("tasks")
    .remove()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error deleting tasks:", error.message);
    return null;
  }
  return data;
}

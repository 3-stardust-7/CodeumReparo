import { supabase } from "./supabaseClient";

export async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  const user = data?.user || null;
  if (error) console.error("Error signing up:", error.message);
  return { user, error };
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  const user = data?.user || null;
  if (error) console.error("Error signing in:", error.message);
  return { user, error };
}

export async function logout() {
  const { error } = await supabase.auth.logout();
  if (error) console.error("Error signing out:", error.message);
}

export function getUser() {
  return supabase.auth.getUser();
}

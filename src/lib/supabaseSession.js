import { redirect } from "next/navigation";
import { supabaseBrowser, supabaseServer } from "./supabaseClient";

export async function getSessionServer() {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();
  if (!session?.access_token) return redirect("/login");
  return session.user;
}

export async function getSessionBrowser() {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();
  if (!session?.access_token) return redirect("/login");
  return session.user;
}

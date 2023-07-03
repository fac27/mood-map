import { redirect } from "next/navigation";
import { supabaseBrowser, supabaseServer } from "./supabaseClient";

function checkUser(session) {
  if (!session?.access_token) return redirect("/login");
  return session.user;
}

export async function getSessionServer() {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();
  return checkUser(session);
}

export async function getSessionBrowser() {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();
  return checkUser(session);
}

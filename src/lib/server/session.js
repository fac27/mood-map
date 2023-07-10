import supabaseServer from "./client";
import { redirect } from "next/navigation";

export async function getSessionServer() {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();
  return session;
}

export async function protectServerRoute() {
  const session = await getSessionServer();
  if (!session?.access_token) return redirect("/login", "replace");
  return session;
}

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
  console.log("server session", session);
  if (!session?.access_token) return redirect("/login");
  return session;
}

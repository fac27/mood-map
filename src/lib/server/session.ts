import { Session } from "@supabase/auth-helpers-nextjs";
import supabaseServer from "./client";
import { redirect } from "next/navigation";

export async function getSessionServer(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();
  return session;
}

export async function protectServerRoute(): Promise<Session | null> {
  const session = await getSessionServer();
  if (!session?.access_token) return redirect("/login");
  return session;
}

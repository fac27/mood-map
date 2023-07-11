import { Session } from "@supabase/auth-helpers-nextjs";
import supabaseBrowser from "./client";
import { redirect } from "next/navigation";

export async function getSessionBrowser(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();
  return session;
}

export async function protectBrowserRoute(): Promise<Session | null> {
  const session = await getSessionBrowser();
  if (!session?.access_token) return redirect("/login");
  return session;
}

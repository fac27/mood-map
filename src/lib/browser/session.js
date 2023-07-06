import supabaseBrowser from "./client";
import { redirect } from "next/navigation";

export async function getSessionBrowser() {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();
  return session;
}

export async function protectBrowserRoute() {
  const session = await getSessionBrowser();
  if (!session?.access_token) return redirect("/login");
  return session;
}

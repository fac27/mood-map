import supabaseBrowser from "./client";
import { redirect } from "next/navigation";

export async function getSessionBrowser() {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();
  console.log(session);
  return session;
}

export async function protectBrowserRoute() {
  const session = await getSessionBrowser();
  if (!session?.access_token) return redirect("/login");
  return session;
}

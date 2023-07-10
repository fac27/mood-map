import supabaseBrowser from "./client";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";

export async function getSessionBrowser() {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();
  return session;
}

export async function protectBrowserRoute() {
  const session = await getSessionBrowser();
  // const { push } = useRouter();

  if (!session?.access_token) return redirect("/login", "replace");
  return session;
}

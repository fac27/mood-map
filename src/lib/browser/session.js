import supabaseBrowser from "./client";
import checkUser from "../checkUser";

export async function getSessionBrowser() {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();
  return checkUser(session);
}

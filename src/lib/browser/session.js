import supabaseBrowser from "./browser/supabaseClient";
import checkUser from "./checkUser";

export async function getSessionBrowser() {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();
  return checkUser(session);
}

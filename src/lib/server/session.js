import supabaseServer from "./supabaseClientServer";
import checkUser from "./checkUser";

export async function getSessionServer() {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();
  return checkUser(session);
}

import supabaseServer from "./client";
import checkUser from "../checkUser";

export default async function getSessionServer() {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();
  return checkUser(session);
}

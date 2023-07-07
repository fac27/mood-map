import { getSessionBrowser } from "../browser/session";
import supabaseBrowser from "../browser/client";

export default async function createEntry(data) {
  const session = await getSessionBrowser();
  const user = session.user;

  const { error } = await supabaseBrowser
    .from("entries")
    .insert({ ...data, user_id: user.id });
  return error;
}

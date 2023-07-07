import supabaseBrowser from "./browser/client";

export default async function getUserEntries() {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();

  const user = session.user;

  const { data, error } = await supabaseBrowser
    .from("entries")
    .select("mood, mood_date, journal_entry, context_people, context_location")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching user entries:", error);
    throw error;
  }
  return data;
}

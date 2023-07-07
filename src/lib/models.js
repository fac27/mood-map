import supabaseBrowser from "./browser/client";

export async function getUserEntries(userId) {
  const { data, error } = await supabaseBrowser
    .from("entries")
    .select("mood, mood_date, journal_entry, context_people, context_location")
    .eq("user_id", userId);

  if (error) console.error("Error fetching user entries:", error);
  return data;
}

export async function updateOrCreateEntry(entry) {
  //must already have user_id in mood
  const { data: existingEntry } = await supabaseBrowser
    .from("entries")
    .select("*")
    .eq("mood_date", entry.mood_date)
    .eq("user_id", entry.user_id)
    .single();
  return existingEntry
    ? await updateEntry(entry, existingEntry.id)
    : await createEntry(entry);
}

async function createEntry(entry) {
  const { error } = await supabaseBrowser.from("entries").insert(entry);
  console.log(error);
  return error;
}

async function updateEntry(entry, id) {
  const { error } = await supabaseBrowser
    .from("entries")
    .update(entry)
    .eq("id", id);
  console.log(error);
  return error;
}

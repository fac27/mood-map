import supabaseBrowser from "./browser/client";
import { IEntry, IUsersEntry } from "@/types/types";
import date from "./date";

export async function getUserEntries(userId: string) {
  const { data, error } = await supabaseBrowser
    .from("entries")
    .select("mood, mood_date, journal_entry, context_people, context_location")
    .eq("user_id", userId);

  if (error) console.error("Error fetching user entries:", error);
  return data;
}

export async function updateOrCreateEntry(entry: IUsersEntry) {
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

async function createEntry(entry: IUsersEntry) {
  const { error } = await supabaseBrowser.from("entries").insert(entry);
  return error;
}

async function updateEntry(entry: IUsersEntry, id: number) {
  const { error } = await supabaseBrowser
    .from("entries")
    .update(entry)
    .eq("id", id);
  return error;
}

export async function getAllEntries(userId: string): Promise<IEntry[]> {
  const { data, error } = await supabaseBrowser
    .from("entries")
    .select(
      "id, mood, mood_date, journal_entry, context_people, context_location"
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user entries:", error);
    throw error;
  }
  return data;
}

export async function getEntry(id: number, userId: string): Promise<IEntry> {
  const { data, error } = await supabaseBrowser
    .from("entries")
    .select(
      "id, mood, mood_date, journal_entry, context_people, context_location"
    )
    .eq("user_id", userId)
    .eq("id", id);

  if (error) {
    console.error("Error fetching user entries:", error);
    throw error;
  }
  return data[0];
}

export async function getTodaysEntry(userId: string): Promise<IEntry> {
  const { data, error } = await supabaseBrowser
    .from("entries")
    .select(
      "id, mood, mood_date, journal_entry, context_people, context_location"
    )
    .eq("user_id", userId)
    .eq("mood_date", date());

  if (error) {
    console.error("Error fetching user entries:", error);
    throw error;
  }
  return data[0];
}

import {IEntry} from "@/types/types";
import supabaseBrowser from "./browser/client";

export async function getAllEntries(): Promise<IEntry[]> {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();

  const user = session?.user;

  const { data, error } = await supabaseBrowser
    .from("entries")
    .select("id, mood, mood_date, journal_entry, context_people, context_location")
    .eq("user_id", user?.id);

  if (error) {
    console.error("Error fetching user entries:", error);
    throw error;
  }
  return data;
}

export async function getEntry(id: number): Promise<IEntry> {
  const {
    data: { session },
  } = await supabaseBrowser.auth.getSession();

  const user = session?.user;

  const { data, error } = await supabaseBrowser
    .from("entries")
    .select("id, mood, mood_date, journal_entry, context_people, context_location")
    .eq("user_id", user?.id)
    .eq("id", id);

  if (error) {
    console.error("Error fetching user entries:", error);
    throw error;
  }
  return data[0];
}

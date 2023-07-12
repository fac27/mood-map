import { getSessionServer } from "@/lib/server/session";
import MoodPicker from "./components/MoodPicker";
import { Session } from "@supabase/auth-helpers-nextjs";

export default async function Mood() {
  const session = (await getSessionServer()) as Session;
  return <MoodPicker session={session} />;
}

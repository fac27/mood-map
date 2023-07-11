import { getSessionServer } from "@/lib/server/session";
import MoodPicker from "./components/MoodPicker";

export default async function Mood() {
  const session = await getSessionServer() 
  return <MoodPicker session={session}/>;
  // return <h1> helloo </h1>;
}

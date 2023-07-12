import { getSessionServer } from "@/lib/server/session";
import { Session } from "@supabase/auth-helpers-nextjs";
import LoginForm from "./components/LoginForm";

export default async function Login() {
  const session = (await getSessionServer()) as Session;
  return <LoginForm session={session} />;
}

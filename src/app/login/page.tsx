import { getSessionServer } from "@/lib/server/session";
import { Session } from "@supabase/auth-helpers-nextjs";
import LoginComp from "./components/LoginForm";

export default async function Login() {
  const session = (await getSessionServer()) as Session;
  return <LoginComp session={session} />;
}

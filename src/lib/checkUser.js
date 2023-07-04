import { redirect } from "next/navigation";

export default function checkUser(session) {
  if (!session?.access_token) return redirect("/login");
  return session.user;
}

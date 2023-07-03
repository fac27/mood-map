import { redirect } from "next/navigation";
// import Link from "next/link";
// import { josefinSans } from "@/utils/fonts";
import Navbar from "@/components/Navbar";
import supabase from "@/lib/supabaseClientServer";

let user;

async function getSession() {
  const {
    data: { session },
  } = await supabase().auth.getSession();
  if (!session?.access_token) return redirect("/login");
  user = session.user.email;
}

export default function Home() {
  getSession();
  return (
    <>
      <h1>Hello {user || "moodster"}! 🤺</h1>
      <Navbar />
    </>
  );
}

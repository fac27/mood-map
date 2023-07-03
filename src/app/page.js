"use client";

import { redirect } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { josefinSans } from "@/utils/fonts";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import supabase from "@/lib/supabaseClientServer";

export default function Home() {
  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);
      session.access_token || redirect("/login");
    }
    getSession();
  }, []);

  return (
    <>
      <h1>Hello Moodster! 🤺</h1>
      <Navbar />
    </>
  );
}

"use client";
import supabaseBrowser from "@/lib/browser/client";
import { getSessionBrowser } from "@/lib/browser/session";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/types";

export default function LoginForm({ session }: { session: any }) {
  // middleware should handle this
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  supabaseBrowser.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") setIsLoggedIn(true);
  });

  useEffect(() => {
    const validateUser = async () => {
      const session = await getSessionBrowser();
      const user = session?.user;
      if (isLoggedIn || user) router.push("/");
    };
    validateUser();
  }, [isLoggedIn]);

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSpotify = async () => {
    const { data, error } = (await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        scopes: 'user-read-recently-played user-read-currently-playing'
      },
    })) as any;
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSpotify}>Spotify</button>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
}

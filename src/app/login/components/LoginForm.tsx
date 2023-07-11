"use client";

import supabaseBrowser from "@/lib/browser/client";
import { getSessionBrowser } from "@/lib/browser/session";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/types";
import { BsSpotify } from "react-icons/bs";
import styles from "../page.module.css";

export default function LoginForm({ session }: { session: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignUp] = useState(false);
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

  const handleFormChange = () => {
    setIsSignUp((prevValue) => !prevValue);
  };

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
      },
    })) as any;

    const session = data.session;

    if (session) {
      const oAuthToken = data.session.access_token;
    }

    router.refresh();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mood Map</h1>
      <form>
        <label htmlFor="email">email</label>
        <input
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <div className={styles.forgetPassword}>
          <p onClick={handleFormChange}>No account? Sign Up</p>
          <p>Forget password</p>
        </div>
        <button
          onClick={isSignup ? handleSignUp : handleSignIn}
          className={styles.loginBtn}
        >
          {isSignup ? "Sign Up" : "Log in"}
        </button>

        <div className={styles.delimiter}>
          <span></span>
          <p>or log in with</p>
          <span></span>
        </div>

        <button onClick={handleSpotify} className={styles.spotifyBtn}>
          <span>
            <BsSpotify />
          </span>
          Spotify
        </button>
      </form>
    </div>
  );
}

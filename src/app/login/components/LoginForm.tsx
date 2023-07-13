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
  const [isSignup, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  supabaseBrowser.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") setIsLoggedIn(true);
  });

  useEffect(() => {
    const validateUser = async () => {
      const session = await getSessionBrowser();
      const user = session?.user;

      if (isLoggedIn || user) {
        setError("");
        router.push("/");
      }
    };

    validateUser();
  }, [isLoggedIn]);

  const handleFormChange = () => {
    setIsSignUp((prevValue) => !prevValue);
  };

  const handleSignUp = async (payload) => {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      window.location.reload();
    }
  };

  const handleSignIn = async (payload) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      window.location.reload();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    isSignup ? handleSignUp(formValues) : handleSignIn(formValues);
  };

  const handleSpotify = async () => {
    const { data, error } = (await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })) as any;

    if (error) {
      setError(error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mood Map</h1>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input id="email" name="email" />

        <label htmlFor="password">password</label>
        <input id="password" type="password" name="password" />

        <div className={styles.forgetPassword}>
          <p onClick={handleFormChange}>
            {isSignup ? "Have an account? Sign In" : "No account? Sign Up"}
          </p>
          <p>Forget password</p>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}
        <button className={styles.loginBtn}>
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

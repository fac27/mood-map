"use client";

import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabaseBrowser from "../../lib/browser/client";
import styles from "./page.module.css";
import getSessionBrowser from "../../lib/browser/session";
import { useEffect, useRef } from "react";

export default function Login() {
  const home = useRef(null);

  useEffect(() => {
    const checkSignedIn = () => {
      supabaseBrowser.auth.onAuthStateChange((event, session) => {
        console.log(event, session);
        if (event == "SIGNED_IN") home.current.click();
      });
    };

    const submitListener = document.addEventListener("submit", checkSignedIn);
    const checkSession = async () => {
      const user = await getSessionBrowser();
      console.log(user);
      if (user) home.current.click();
    };
    checkSession();
    return () => {
      removeEventListener(submitListener, checkSignedIn);
    };
  }, []);

  return (
    <>
      <h1 className={styles.title}>Mood Map</h1>
      <Link href="/"> home</Link>
      <div className={styles.wrapper}>
        <Auth
          supabaseClient={supabaseBrowser}
          providers={["spotify"]}
          appearance={{
            theme: ThemeSupa,
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: "email",
                password_label: "password",
                button_label: "LOG IN",
                social_provider_text: "{{provider}}",
              },
            },
          }}
        />
      </div>
      <Link href={"/"} ref={home} />
    </>
  );
}

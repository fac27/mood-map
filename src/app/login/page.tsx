"use client";

import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabaseBrowser from "../../lib/browser/client";
import styles from "./page.module.css";
import { getSessionBrowser } from "../../lib/browser/session";
import { useEffect, useRef, useState, ReactElement } from "react";
import { Session } from "@supabase/supabase-js";
import React from "react";
import LoginComp from "@/components/Login";

export default function Login(): ReactElement {
  const home = React.useRef<HTMLAnchorElement | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  supabaseBrowser.auth.onAuthStateChange((event: string) => {
    if (event == "SIGNED_IN") setIsLoggedIn(true);
  });

  useEffect(() => {
    const validateUser = async (): Promise<void> => {
      const session: Session | null = await getSessionBrowser();
      const user = session?.user;
      if (isLoggedIn || user) home.current?.click();
    };
    validateUser();
  }, [isLoggedIn]);

  return (
    <>
      <h1 className={styles.title}>Mood Map</h1>
      <div className={styles.wrapper}>
        <LoginComp />
        {/* <Auth
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
        /> */}
      </div>
      <Link href={"/"} ref={home} />
    </>
  );
}

"use client";

// import { redirect } from "next/navigation";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabaseBrowser from "../../lib/browser/client";
import styles from "./page.module.css";
// import getSessionBrowser from "../../lib/browser/session";
// import { useEffect } from "react";

// const checkSession = async () => {
//   const user = await getSessionBrowser();
//   console.log(user);
//   if (user) redirect("/");
// };

export default function login() {
  // useEffect(() => {
  //   checkSession();
  // }, []);

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
    </>
  );
}

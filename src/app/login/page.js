"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../utils/supabaseClient";
import styles from "./page.module.css";

export default function Login() {
  return (
    <>
      <h1 className={styles.title}>Mood Map</h1>
      <div className={styles.wrapper}>
        <Auth
          supabaseClient={supabase}
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

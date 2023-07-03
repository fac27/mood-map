"use client";

import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabaseBrowser as supabaseClient } from "../../lib/supabaseClient";
import styles from "./page.module.css";

export default function login() {
  return (
    <>
      <h1 className={styles.title}>Mood Map</h1>
      <Link href="/"> home</Link>
      <div className={styles.wrapper}>
        <Auth
          supabaseClient={supabaseClient}
          providers={["spotify"]}
          appearance={{
            // Your custom classes
            className: {
              button: "shadow",
              //..
            },
            style: {
              label: { paddingInline: 10 },
              input: {
                backgroundColor: "rgb(210, 210, 210)",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.4) !important",
                display: "flex",
                alignSelf: "center",
              },
              button: {
                border: "none",
                maxWidth: "50%",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.4) !important",
                display: "flex",
                alignSelf: "center",
                color: "#0d3b66",
              },
            },
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

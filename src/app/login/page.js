"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../utils/supabaseClient";
import styles from "./page.module.css";

export default function login() {
  return (
    <>
      <h1 className={styles.title}>Mood Map</h1>
      <div className={styles.wrapper}>
        <Auth
          supabaseClient={supabase}
          providers={["spotify"]}
          appearance={{
            // Your custom classes
            className: {
              button: "shadow",
              //..
            },
            style: {
              label: { "padding-inline": 10 },
              input: {
                "background-color": "rgb(210, 210, 210)",
                "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.4) !important",
                display: "flex",
                "align-self": "center",
              },
              button: {
                border: "none",
                "max-width": "50%",
                "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.4) !important",
                display: "flex",
                "align-self": "center",
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

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabaseBrowser from "@/lib/browser/client";
import { getSessionBrowser } from "@/lib/browser/session";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  // middleware should handle this
  const [isLoggedIn, setIsLoggedIn] = useState(false) 
  const router = useRouter() 
  
  supabaseBrowser.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") setIsLoggedIn(true);
  });

  useEffect(() => {
    const validateUser = async () => {
      const session = await getSessionBrowser();
      const user = session?.user;
      if (isLoggedIn || user) router.push('/');
    };
    validateUser();
  }, [isLoggedIn]);

    return (<Auth
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
    />) }
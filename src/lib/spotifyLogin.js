import { supabase } from "@supabase/auth-ui-shared";

async function signInWithSpotify() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "spotify",
  });
}

export default signInWithSpotify;

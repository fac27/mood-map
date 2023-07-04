import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

const supabaseServer = () =>
  createServerComponentClient({
    headers,
    cookies,
  });

export default supabaseServer;

"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient({
  persistSession: false,
});

export default supabase;

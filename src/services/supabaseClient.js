//forbindelsen mellem react appen og supabase databasen

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_APIKEY);

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://beggutkvhddsodeeoike.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZ2d1dGt2aGRkc29kZWVvaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0OTYyNjksImV4cCI6MjA4NzA3MjI2OX0.LA8Gx5BZ1vfuuiCbYlczPmniVhqvqscgWdbGhmyAYnc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
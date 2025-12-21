import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://lfqwyidepuvnejvliyjj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcXd5aWRlcHV2bmVqdmxpeWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDUyNjIsImV4cCI6MjA3NzU4MTI2Mn0.TG9MKksRb0mFu0hIqlwixt9wl_Prbgu_0JM6ZGQVvgA";

export const supabaseCl = createClient(supabaseURL, supabaseAnonKey);

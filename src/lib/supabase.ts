import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://elalngsgeqbkmhromlez.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsYWxuZ3NnZXFia21ocm9tbGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNDc0MzQsImV4cCI6MjA4NjgyMzQzNH0.YrePvSi31L3f_dgOAFIuvB7zjU6b_JpICWTXkwt1VXs"
);

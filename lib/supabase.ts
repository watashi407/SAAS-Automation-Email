import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dvzuzspkdzupovibxubd.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2enV6c3BrZHp1cG92aWJ4dWJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTAzMzQ4MCwiZXhwIjoyMDU0NjA5NDgwfQ.tgyYudkgUVj5hp3QaaMwwGAgl_VNCoGTJ9nNKnkuj7Y".trim()

export const supabase = createClient(supabaseUrl, supabaseKey)


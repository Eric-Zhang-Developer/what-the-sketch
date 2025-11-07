import { createClient } from "@/utils/supabase/server";

const RATE_LIMIT_COUNT = 50;
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

export async function checkRateLimit(ip: string) {
  const supabase = await createClient();
  const now = Date.now();

  const { data: ipData, error: selectError } = await supabase
    .from("ip_rate_limits")
    .select("*")
    .eq("ip", ip)
    .single();

  if (selectError && selectError?.code != "PGRST116") {
    console.error("Supabase error fetching rate limit:", selectError.message);
    return { limited: true, error: "Internal server error" };
  }

  if (ipData) {
  } else {
    const { error: insertError } = await supabase
      .from("ip_rate_limits")
      .insert({ ip: ip, request_count: 1, last_request_at: new Date().toISOString() });

    if (insertError) {
      console.error("Supabase insert error:", insertError.message);
    }
  }
  // ip data:

  // If we have a user
  //  --- Case 1: User is within the 24 hour window --
  //    --- If user is within rate limit update their count by 1
  //  --- Case 2: User is out of the 24 hour window --

  // No ip in database:
  //  --- Case 3: User is not in database --- Add User

  return { limited: false };
}

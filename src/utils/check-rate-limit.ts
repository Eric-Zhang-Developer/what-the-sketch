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
    const lastTimeRequest = new Date(ipData.last_request_at).getTime();
    const timeDiff = now - lastTimeRequest;

    //  --- Case 1: User is within the 24 hour window --
    if (timeDiff < RATE_LIMIT_WINDOW) {
      //  --- Case 1.1: User is OVER rate limit ---
      //  --- Case 1.2: User is UNDER rate limit ---
    } else {
      // --- Case 2: User is out of the 24 hour window --
      const { error: updateError } = await supabase
        .from("ip_rate_limits")
        .update({ request_count: 1 })
        .eq("ip", ip);

      if (updateError) {
        console.error("Supabase update error", updateError.message);
      }
      return { limited: false };
    }
  } else {
    // --- Case 3: User not in database ---
    const { error: insertError } = await supabase
      .from("ip_rate_limits")
      .insert({ ip: ip, request_count: 1, last_request_at: new Date().toISOString() });

    if (insertError) {
      console.error("Supabase insert error:", insertError.message);
    }
  }

  return { limited: false };
}

/**
 * Checks if an IP address has exceeded the rate limit for API requests.
 * @param ip - The IP address to check
 * @returns Promise resolving to rate limit status
 */

import { createClient } from "@/utils/supabase/server";
import { RateLimitResult } from "./types";

export const RATE_LIMIT_COUNT = 50;
export const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
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
    // Data sanitization, for possible null values in request_count and rate_limit_window_start that ts was unhappy with
    const windowStartStr = ipData.rate_limit_window_start ?? new Date().toISOString();
    const currentCount = ipData.request_count ?? 0;

    const lastTimeRequest = new Date(windowStartStr).getTime();
    const timeDiff = now - lastTimeRequest;

    //  --- Case 1: User is within the 24 hour window --
    if (timeDiff <= RATE_LIMIT_WINDOW) {
      //    --- Case 1.1: User is OVER rate limit ---
      if (currentCount >= RATE_LIMIT_COUNT) {
        return { limited: true };
      } else {
        //  --- Case 1.2: User is UNDER rate limit ---
        const { error: updateError } = await supabase
          .from("ip_rate_limits")
          .update({
            request_count: currentCount + 1,
          })
          .eq("ip", ip);

        if (updateError) console.error(`Supabase update error: ${updateError.message}`);
        return { limited: false };
      }
    } else {
      // --- Case 2: User is out of the 24 hour window --
      const { error: updateError } = await supabase
        .from("ip_rate_limits")
        .update({ request_count: 1, rate_limit_window_start: new Date().toISOString() })
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
      .insert({ ip: ip, request_count: 1, rate_limit_window_start: new Date().toISOString() });

    if (insertError) {
      console.error("Supabase insert error:", insertError.message);
    }
  }

  return { limited: false };
}

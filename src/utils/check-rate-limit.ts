import { createClient } from "@/utils/supabase/server";

// IP based rate limiting with supabase
// We call the ip_rate_limits database and check that ip's rate limit

export async function checkRateLimit(ip: string) {
  const supabase = await createClient();

  const { data: user_rate_limit } = await supabase.from("ip_rate_limits").select("*").eq("ip", ip);

  // For now hard coded to false
  return { limited: false };
}

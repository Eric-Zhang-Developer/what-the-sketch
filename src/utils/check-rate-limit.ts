import "server-only";
import { createClient } from "@/utils/supabase/server";

const RATE_LIMIT_COUNT = 50;
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

export async function checkRateLimit(ip: string) {
  const supabase = await createClient();
  const now = Date.now();

  // Select data from the database

  // if it fails lock user out just to be safe

  // ip data:

  // If we have a user
  //  --- Case 1: User is within the 24 hour window --
  //    --- If user is within rate limit update their count by 1
  //  --- Case 2: User is out of the 24 hour window --

  // No ip in database:
  //  --- Case 3: User is not in database --- Add User

  return { limited: false };
}

import { createClient } from "@supabase/supabase-js";
import { checkRateLimit } from "../check-rate-limit";
import { beforeEach, describe, expect, it, vi } from "vitest";

const supabaseTestClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    db: { schema: "test" },
  }
);

vi.mock("@/utils/supabase/server", () => ({
  createClient: async () => supabaseTestClient,
}));

beforeEach(async () => {
  await supabaseTestClient.from("ip_rate_limits").delete().neq("ip", "a-fake-ip");
});

describe("Check Rate Limit Tests", () => {
  it("should allow a new user and insert them", async () => {
    const testIP = "1.1.1.1";
    const result = await checkRateLimit(testIP);

    expect(result.limited).toBe(false);
    const { data, error } = await supabaseTestClient
      .from("ip_rate_limits")
      .select("*")
      .eq("ip", testIP);

    expect(error).toBe(null);

    if (!data) throw new Error("Expected rows from ip_rate_limits but got null");

    expect(data).toHaveLength(1);
    expect(data[0].request_count).toBe(1);
  });

  it("should correctly increment the rate count for a existing user", async () => {
    const testIP = "2.2.2.2";
    const { error: insertError } = await supabaseTestClient
      .from("ip_rate_limits")
      .insert({ ip: testIP, request_count: 5 });

    if (insertError) throw new Error(`Supabase insertion error: ${insertError.message}`);

    const result = await checkRateLimit(testIP);

    expect(result.limited).toBe(false);
    const { data } = await supabaseTestClient.from("ip_rate_limits").select("request_count");

    if (!data) throw new Error("Expected rows from ip_rate_limits but got null");
    expect(data[0].request_count).toBe(6);
  });

  it("should rate limit the user if they have sent too many requests / too many guesses", async () => {
    const testIP = "3.3.3.3";
    const { error: insertError } = await supabaseTestClient
      .from("ip_rate_limits")
      .insert({ ip: testIP, request_count: 50 });

    if (insertError) {
      throw new Error(`Supabase insertion error: ${insertError.message}`);
    }

    const result = await checkRateLimit(testIP);

    expect(result.limited).toBe(true);
    const { data } = await supabaseTestClient.from("ip_rate_limits").select("request_count");

    if (!data) throw new Error("Expected rows from ip_rate_limits but got null");
  });
});

// In src/utils/__tests__/check-rate-limit.test.ts

describe("Manual Testing", () => {
  it("MANUAL: Check first request for new IP", async () => {
    const testIP = "123.45.67.89";
    const result = await checkRateLimit(testIP);
    console.log("Result:", result);

    // Check what's in the database
    const { data } = await supabaseTestClient.from("ip_rate_limits").select("*").eq("ip", testIP);
    console.log("Database entry:", data);
  });

  it("MANUAL: Check multiple requests from same IP", async () => {
    const testIP = "111.222.333.444";

    // Make 3 requests
    for (let i = 1; i <= 3; i++) {
      const result = await checkRateLimit(testIP);
      console.log(`Request ${i}:`, result);
    }

    // Check final state
    const { data } = await supabaseTestClient.from("ip_rate_limits").select("*").eq("ip", testIP);
    console.log("Final database state:", data);
  });

  it("MANUAL: Simulate hitting rate limit", async () => {
    const testIP = "999.999.999.999";

    // Manually insert an IP at the limit
    await supabaseTestClient.from("ip_rate_limits").insert({
      ip: testIP,
      request_count: 50, // at the limit
      last_request_at: Date.now(),
    });

    // Try one more request
    const result = await checkRateLimit(testIP);
    console.log("Should be limited:", result);
  });
});

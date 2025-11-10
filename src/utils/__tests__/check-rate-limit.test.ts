import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, RATE_LIMIT_COUNT, RATE_LIMIT_WINDOW } from "../check-rate-limit";
import { afterEach, describe, expect, it, vi } from "vitest";

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

afterEach(async () => {
  await supabaseTestClient.from("ip_rate_limits").delete().neq("ip", "a-fake-ip");
});

describe("Check Rate Limit Tests", () => {
  it("should allow a new user and insert them", async () => {
    const testIP = "1.1.1.1";
    const result = await checkRateLimit(testIP);

    expect(result.limited).toBe(false);
    const { data } = await supabaseTestClient
      .from("ip_rate_limits")
      .select("*")
      .eq("ip", testIP)
      .single();
    if (!data) throw new Error("Expected rows from ip_rate_limits but got null");

    expect(data.request_count).toBe(1);
  });

  it("should correctly increment the rate count for a existing user", async () => {
    const testIP = "2.2.2.2";
    const { error: insertError } = await supabaseTestClient
      .from("ip_rate_limits")
      .insert({ ip: testIP, request_count: 5 });

    if (insertError) throw new Error(`Supabase insertion error: ${insertError.message}`);

    const result = await checkRateLimit(testIP);

    expect(result.limited).toBe(false);
    const { data } = await supabaseTestClient
      .from("ip_rate_limits")
      .select("*")
      .eq("ip", testIP)
      .single();

    if (!data) throw new Error("Expected rows from ip_rate_limits but got null");
    expect(data.request_count).toBe(6);
  });

  it("should rate limit the user if they have sent too many requests / too many guesses", async () => {
    const testIP = "3.3.3.3";
    const { error: insertError } = await supabaseTestClient
      .from("ip_rate_limits")
      .insert({ ip: testIP, request_count: RATE_LIMIT_COUNT });

    if (insertError) {
      throw new Error(`Supabase insertion error: ${insertError.message}`);
    }

    const result = await checkRateLimit(testIP);

    expect(result.limited).toBe(true);
    const { data } = await supabaseTestClient
      .from("ip_rate_limits")
      .select("*")
      .eq("ip", testIP)
      .single();

    if (!data) throw new Error("Expected rows from ip_rate_limits but got null");
    expect(data.request_count).toBe(RATE_LIMIT_COUNT);
  });

  it("should not rate limit the user if they are 1 request below the rate limit", async () => {
    const testIP = "4.4.4.4";
    const { error: insertError } = await supabaseTestClient
      .from("ip_rate_limits")
      .insert({ ip: testIP, request_count: RATE_LIMIT_COUNT - 1 });
    if (insertError) throw new Error(`Supabase insertion error: ${insertError.message}`);

    const result = await checkRateLimit(testIP);

    expect(result.limited).toBe(false);
    const { data } = await supabaseTestClient
      .from("ip_rate_limits")
      .select("*")
      .eq("ip", testIP)
      .single();
    if (!data) throw new Error("Expected rows from ip_rate_limits but got null");
    expect(data.request_count).toBe(RATE_LIMIT_COUNT);
  });

  it("should reset the user's limit 24 hours after the last request", async () => {
    const testIP = "5.5.5.5";
    const oldTimestamp = new Date(Date.now() - RATE_LIMIT_WINDOW - 1000).toISOString();
    const { error: insertError } = await supabaseTestClient
      .from("ip_rate_limits")
      .insert({
        ip: testIP,
        request_count: RATE_LIMIT_COUNT,
        rate_limit_window_start: oldTimestamp,
      });
    if (insertError) throw new Error(`Supabase insertion error: ${insertError.message}`);

    const result = await checkRateLimit(testIP);

    expect(result.limited).toBe(false);
    const { data } = await supabaseTestClient
      .from("ip_rate_limits")
      .select("*")
      .eq("ip", testIP)
      .single();
    if (!data) throw new Error("Expected rows from ip_rate_limits but got null");
    expect(data.request_count).toBe(1);
  });
});

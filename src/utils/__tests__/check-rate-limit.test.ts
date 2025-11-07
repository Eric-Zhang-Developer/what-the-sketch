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

    if (!data) {
      throw new Error("Expected rows from ip_rate_limits but got null");
    }
    expect(data).toHaveLength(1);
    expect(data[0].request_count).toBe(1);
  });
});

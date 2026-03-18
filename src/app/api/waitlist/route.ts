import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendWaitlistConfirmation } from "@/lib/email";
import { WAITLIST } from "@/lib/constants";
import { ApiError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { WaitlistRepository } from "@/lib/repositories/waitlist";
import { handleError } from "@/app/api/error-handler";
import type { ApiResponse, WaitlistResponseData } from "@/lib/types";

// Zod schema for request validation
const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  source: z
    .string()
    .trim()
    .max(50, "Source identifier too long")
    .default("hero"),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Check Supabase admin client is available
    if (!supabaseAdmin) {
      throw ApiError.internal("Service temporarily unavailable");
    }

    // 2. Rate limiting by IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";
    const rateLimitResult = checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      throw ApiError.rateLimit(rateLimitResult.resetIn);
    }

    // 3. Parse and validate request body
    const body: unknown = await request.json().catch(() => null);

    if (!body) {
      throw ApiError.validation("Invalid request body");
    }

    const parseResult = waitlistSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message ?? "Invalid input";
      throw ApiError.validation(firstError);
    }

    const { email, source } = parseResult.data;

    // 4. Use repository to check for duplicates and create entry
    const repository = new WaitlistRepository(supabaseAdmin);

    const existingResult = await repository.findByEmail(email);
    if (!existingResult.success) {
      throw existingResult.error;
    }

    // Return success for duplicates — don't reveal if email exists (privacy)
    if (existingResult.data) {
      const countResult = await repository.getCount();
      const position = countResult.success ? countResult.data : 0;

      const response: ApiResponse<WaitlistResponseData> = {
        success: true,
        data: { email, position },
        meta: { total: position },
      };
      return NextResponse.json(response, { status: 200 });
    }

    // 5. Create new waitlist entry
    const createResult = await repository.create({ email, source });
    if (!createResult.success) {
      throw createResult.error;
    }

    const position = createResult.data.position;

    // 6. Send confirmation email (non-blocking, don't fail the request)
    sendWaitlistConfirmation({ email, position }).catch((err) => {
      logger.error("Email send failed (non-blocking)", err as Error, { email });
    });

    const response: ApiResponse<WaitlistResponseData> = {
      success: true,
      data: { email, position },
      meta: { total: position },
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// GET — return waitlist count (public, for the counter display)
export async function GET(): Promise<NextResponse> {
  try {
    if (!supabaseAdmin) {
      throw ApiError.internal("Service unavailable");
    }

    const repository = new WaitlistRepository(supabaseAdmin);
    const countResult = await repository.getCount();

    if (!countResult.success) {
      throw countResult.error;
    }

    const response: ApiResponse<{ count: number }> = {
      success: true,
      data: { count: countResult.data },
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

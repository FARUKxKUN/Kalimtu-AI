import { Resend } from "resend";
import { EMAIL } from "./constants";
import { logger } from "./logger";

const resendApiKey = process.env.RESEND_API_KEY;

// Only initialize if API key is present (graceful degradation)
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface SendWaitlistConfirmationParams {
  readonly email: string;
  readonly position: number;
}

export async function sendWaitlistConfirmation({
  email,
  position,
}: SendWaitlistConfirmationParams): Promise<{ readonly success: boolean }> {
  if (!resend) {
    // Log warning but don't fail — email is a nice-to-have for waitlist
    logger.warn("Resend API key not configured. Skipping confirmation email");
    return { success: false };
  }

  try {
    console.log("📧 Sending email from:", EMAIL.FROM);
    console.log("📧 To:", email);
    console.log("📧 Resend client:", resend ? "initialized" : "null");

    const response = await resend.emails.send({
      from: EMAIL.FROM,
      to: email,
      subject: EMAIL.SUBJECT,
      html: buildWaitlistEmailHtml({ email, position }),
    });

    console.log("📧 Email response:", response);
    logger.info("Waitlist confirmation email sent", { email, position });
    return { success: true };
  } catch (error) {
    // Don't let email failure break the waitlist signup
    console.error("❌ Email send error:", error);
    logger.error("Failed to send waitlist confirmation email", error as Error, { email });
    return { success: false };
  }
}

function buildWaitlistEmailHtml({
  position,
}: SendWaitlistConfirmationParams): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%);font-family:'Segoe UI','Inter',Arial,sans-serif;min-height:100vh;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%);padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#0A0A0F;border-radius:16px;padding:48px 40px;border:1px solid rgba(193,255,0,0.1);">
          <tr>
            <td>
              <div style="text-align:center;margin-bottom:32px;">
                <h1 style="color:#C1FF00;font-size:32px;margin:0;font-weight:700;">🎉 Thank You</h1>
                <p style="color:#A0A0B8;font-size:14px;margin:8px 0 0;">For trusting Kalimtu</p>
              </div>

              <div style="background:rgba(193,255,0,0.08);border-left:4px solid #C1FF00;border-radius:8px;padding:24px;margin:0 0 32px;">
                <p style="color:#C1FF00;font-weight:600;font-size:16px;margin:0 0 12px;">✨ Your Early Access Bonus</p>
                <p style="color:#FFFFFF;font-size:20px;font-weight:700;margin:0 0 8px;">4 Free Hours of Transcription</p>
                <p style="color:#A0A0B8;font-size:14px;margin:0;">Worth +25 TND — Yours when we launch</p>
              </div>

              <p style="color:#A0A0B8;font-size:15px;line-height:1.7;margin:0 0 20px;">
                You're #<span style="color:#C1FF00;font-weight:700;">${position}</span> in the queue, and we're honored by your trust. We're building something special for Tunisian professionals like you — AI transcription that actually understands code-switching and the way you really speak.
              </p>

              <p style="color:#A0A0B8;font-size:15px;line-height:1.7;margin:0 0 32px;">
                Your 4 free hours will be waiting the moment we launch. That's enough to transcribe 40+ meetings, and you'll see exactly how Kalimtu captures every word — perfectly.
              </p>

              <div style="background:rgba(193,255,0,0.05);padding:24px;border-radius:8px;margin:0 0 32px;">
                <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 16px;">What's Next</p>
                <ul style="margin:0;padding-left:20px;color:#A0A0B8;font-size:14px;line-height:1.8;">
                  <li>We'll email you the moment access opens</li>
                  <li>Sign up in seconds with one click</li>
                  <li>Claim your +25 TND bonus instantly</li>
                  <li>Start transcribing right away</li>
                </ul>
              </div>

              <p style="color:#888;font-size:14px;line-height:1.6;margin:0 0 8px;">
                Questions? We're here. Reply to this email anytime — we read every message.
              </p>

              <p style="color:#666;font-size:13px;margin:0;margin-top:32px;padding-top:24px;border-top:1px solid rgba(193,255,0,0.1);">
                See you soon,<br><span style="color:#C1FF00;font-weight:600;">The Kalimtu Team</span>
              </p>
            </td>
          </tr>
        </table>
        <p style="color:#666;font-size:12px;margin:24px 0 0;text-align:center;">
          Kalimtu • AI Transcription for Tunisian Professionals<br>
          &copy; ${new Date().getFullYear()} All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

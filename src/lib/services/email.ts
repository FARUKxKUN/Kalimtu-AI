/**
 * Email service - handles transactional emails via Resend
 * Centralized email sending for onboarding, confirmations, notifications
 */

import { Resend } from 'resend';
import { logger } from '@/lib/logger';

const resend = new Resend(process.env.RESEND_API_KEY) as any;

export interface EmailTemplateData {
  email: string;
  fullName?: string;
  [key: string]: any;
}

export class EmailService {
  /**
   * Send welcome email to new user
   */
  static async sendWelcomeEmail(email: string, fullName?: string) {
    try {
      const result = await resend.emails.send({
        from: 'onboarding@kalimtu.ai',
        to: email,
        subject: 'Welcome to Kalimtu – Tunisian Transcription',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Welcome to Kalimtu</h1>
            <p>Hi ${fullName || 'there'},</p>
            <p>Thanks for joining Kalimtu! We're excited to help you capture every word perfectly.</p>
            <p>Your account is ready to use. Log in and start transcribing:</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; padding: 10px 20px; background-color: #C1FF00; color: #0A0A0F; text-decoration: none; border-radius: 8px; font-weight: bold;">Get Started</a>
            <p style="margin-top: 40px; font-size: 12px; color: #888;">Questions? Contact us at support@kalimtu.ai</p>
          </div>
        `
      });

      if (result.error) {
        logger.error('Failed to send welcome email', result.error, { email });
        return { success: false, error: result.error };
      }

      logger.info('Welcome email sent', { email });
      return { success: true, id: result.data?.id };
    } catch (err) {
      logger.error('Unexpected error sending welcome email', err as Error);
      return { success: false, error: err };
    }
  }

  /**
   * Send subscription confirmation
   */
  static async sendSubscriptionConfirmation(email: string, tier: string, fullName?: string) {
    try {
      const result = await resend.emails.send({
        from: 'billing@kalimtu.ai',
        to: email,
        subject: `Subscription Confirmed – ${tier} Plan`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Subscription Confirmed</h1>
            <p>Hi ${fullName || 'there'},</p>
            <p>Your subscription to the <strong>${tier}</strong> plan is active and ready to use.</p>
            <p>View your billing details and manage your subscription:</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/billing" style="display: inline-block; padding: 10px 20px; background-color: #C1FF00; color: #0A0A0F; text-decoration: none; border-radius: 8px; font-weight: bold;">Manage Subscription</a>
            <p style="margin-top: 40px; font-size: 12px; color: #888;">Need help? Contact billing@kalimtu.ai</p>
          </div>
        `
      });

      if (result.error) {
        logger.error('Failed to send subscription confirmation', result.error, { email });
        return { success: false, error: result.error };
      }

      logger.info('Subscription confirmation sent', { email, tier });
      return { success: true, id: result.data?.id };
    } catch (err) {
      logger.error('Unexpected error sending subscription email', err as Error);
      return { success: false, error: err };
    }
  }

  /**
   * Send subscription cancellation notice
   */
  static async sendCancellationNotice(email: string, fullName?: string) {
    try {
      const result = await resend.emails.send({
        from: 'billing@kalimtu.ai',
        to: email,
        subject: 'Subscription Canceled - We will Miss You',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Subscription Canceled</h1>
            <p>Hi ${fullName || 'there'},</p>
            <p>Your subscription has been canceled. You'll have access through the end of your current billing period.</p>
            <p>If you'd like to reactivate at any time:</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/billing" style="display: inline-block; padding: 10px 20px; background-color: #C1FF00; color: #0A0A0F; text-decoration: none; border-radius: 8px; font-weight: bold;">Reactivate</a>
            <p style="margin-top: 40px; font-size: 12px; color: #888;">Questions? We're here to help at support@kalimtu.ai</p>
          </div>
        `
      });

      if (result.error) {
        logger.error('Failed to send cancellation notice', result.error, { email });
        return { success: false, error: result.error };
      }

      logger.info('Cancellation notice sent', { email });
      return { success: true, id: result.data?.id };
    } catch (err) {
      logger.error('Unexpected error sending cancellation email', err as Error);
      return { success: false, error: err };
    }
  }

  /**
   * Send invoice email
   */
  static async sendInvoice(email: string, invoiceUrl: string, fullName?: string) {
    try {
      const result = await resend.emails.send({
        from: 'billing@kalimtu.ai',
        to: email,
        subject: 'Your Kalimtu Invoice',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Invoice Ready</h1>
            <p>Hi ${fullName || 'there'},</p>
            <p>Your invoice is ready to download:</p>
            <a href="${invoiceUrl}" style="display: inline-block; padding: 10px 20px; background-color: #C1FF00; color: #0A0A0F; text-decoration: none; border-radius: 8px; font-weight: bold;">Download Invoice</a>
            <p style="margin-top: 40px; font-size: 12px; color: #888;">Questions about your invoice? Contact billing@kalimtu.ai</p>
          </div>
        `
      });

      if (result.error) {
        logger.error('Failed to send invoice', result.error, { email });
        return { success: false, error: result.error };
      }

      logger.info('Invoice sent', { email });
      return { success: true, id: result.data?.id };
    } catch (err) {
      logger.error('Unexpected error sending invoice email', err as Error);
      return { success: false, error: err };
    }
  }

  /**
   * Send waitlist confirmation with early access bonus
   */
  static async sendWaitlistConfirmation(email: string) {
    try {
      const result = await resend.emails.send({
        from: 'team@kalimtu.ai',
        to: email,
        subject: '🎉 Welcome to the Kalimtu Waitlist – Get 4 Free Hours',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%); padding: 40px 20px; border-radius: 12px; color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 32px; margin: 0; color: #C1FF00; font-weight: bold;">Thank You</h1>
              <p style="font-size: 14px; color: #A0A0B8; margin: 8px 0 0 0;">For trusting Kalimtu</p>
            </div>

            <div style="background: rgba(193, 255, 0, 0.1); border-left: 4px solid #C1FF00; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="margin: 0 0 12px 0; color: #C1FF00; font-weight: bold; font-size: 16px;">✨ Your Early Access Bonus</p>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #ffffff;">
                4 Free Hours of Transcription
              </p>
              <p style="margin: 8px 0 0 0; color: #A0A0B8; font-size: 13px;">
                Worth +25 TND – Yours when we launch
              </p>
            </div>

            <p style="font-size: 15px; color: #A0A0B8; line-height: 1.6; margin: 30px 0;">
              You're now at the front of the queue. We're building something special for Tunisian professionals like you – AI transcription that actually understands code-switching and the way you really speak.
            </p>

            <p style="font-size: 15px; color: #A0A0B8; line-height: 1.6; margin: 20px 0;">
              Your 4 free hours will be waiting the moment you sign up. That's enough to transcribe 40+ meetings, and you'll see exactly how Kalimtu captures every word – perfectly.
            </p>

            <div style="background: rgba(193, 255, 0, 0.05); padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">What's Next</p>
              <ul style="margin: 0; padding-left: 20px; color: #A0A0B8; font-size: 14px;">
                <li style="margin: 8px 0;">We'll email you the moment access opens</li>
                <li style="margin: 8px 0;">Sign up in seconds with one click</li>
                <li style="margin: 8px 0;">Claim your +25 TND bonus instantly</li>
                <li style="margin: 8px 0;">Start transcribing right away</li>
              </ul>
            </div>

            <p style="font-size: 14px; color: #888; line-height: 1.6; margin: 30px 0;">
              Questions? We're here to help. Reply to this email anytime – we read every message.
            </p>

            <p style="font-size: 12px; color: #666; text-align: center; margin: 40px 0 0 0; padding-top: 20px; border-top: 1px solid rgba(193, 255, 0, 0.2);">
              Kalimtu • AI Transcription for Tunisian Professionals<br>
              <a href="https://kalimtu.ai" style="color: #C1FF00; text-decoration: none;">kalimtu.ai</a>
            </p>
          </div>
        `
      });

      if (result.error) {
        logger.error('Failed to send waitlist confirmation', result.error, { email });
        return { success: false, error: result.error };
      }

      logger.info('Waitlist confirmation sent', { email });
      return { success: true, id: result.data?.id };
    } catch (err) {
      logger.error('Unexpected error sending waitlist confirmation email', err as Error);
      return { success: false, error: err };
    }
  }
}

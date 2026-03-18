export interface WaitlistEntry {
  readonly id: string;
  readonly email: string;
  readonly created_at: string;
  readonly source: string;
}

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly meta?: {
    readonly total: number;
  };
}

export interface PricingTier {
  readonly name: string;
  readonly price: string;
  readonly priceYearly?: string;
  readonly period: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly highlighted: boolean;
  readonly cta: string;
  readonly comingSoon?: boolean;
}

export interface Feature {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface HowItWorksStep {
  readonly step: number;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

// Waitlist form states
export type WaitlistFormStatus = "idle" | "loading" | "success" | "error";

// Waitlist API response data
export interface WaitlistResponseData {
  readonly email: string;
  readonly position: number;
}

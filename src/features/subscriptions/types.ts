import { SINGLE_DRIVER, PEOPLE_COMPANY, CORPORATE_COMPANY } from "@/constants";

export interface PlanModel {
  id: typeof SINGLE_DRIVER | typeof PEOPLE_COMPANY | typeof CORPORATE_COMPANY;
  title: string;
  description?: string;
  priceMonthly?: string;
  periodMonthly?: string;
  commentMonthly?: string;
  priceYearly?: string;
  periodYearly?: string;
  commentYearly?: string;
  features: string[];
  ctaLabel: string;
  ctaLink: string;
}

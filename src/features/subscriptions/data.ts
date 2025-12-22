import { SINGLE_DRIVER, PEOPLE_COMPANY, CORPORATE_COMPANY } from "@/constants";
import { PlanModel } from "./types";

export const plans: PlanModel[] = [
  {
    id: SINGLE_DRIVER,
    title: "Single driver",
    priceMonthly: "£1.49",
    periodMonthly: "Monthly",
    commentMonthly: "*Min 3-month term",
    priceYearly: "£15.99",
    periodYearly: "Annual",
    features: ["eLearning"],
    ctaLabel: "Subscribe",
    ctaLink: `/checkout/${SINGLE_DRIVER}`,
  },
  {
    id: PEOPLE_COMPANY,
    title: "Small Company",
    description: "* 2-50 drivers",
    priceMonthly: "£3.49",
    periodMonthly: "Monthly",
    commentMonthly: "*Min 3-month term",
    priceYearly: "£36.99",
    periodYearly: "Annual",
    features: ["DVLA", "Risk Assessment", "eLearning"],
    ctaLabel: "Subscribe",
    ctaLink: `/checkout/${PEOPLE_COMPANY}`,
  },
  {
    id: CORPORATE_COMPANY,
    title: "Corporate SafetyFirst",
    features: [],
    ctaLabel: "Contact Us",
    ctaLink: "https://redtraining.com/contact-form-2/",
  },
];

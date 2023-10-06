export const pricingPlanConfig = [
  {
    planName: "Free",
    planId: "free_tier",
    priceDetails: {
      amount: 0,
      currency: "$",
      currencyName: "Dollars",
      duration: "Month",
    },
    features: [
      "5 PDFs/month",
      "15 pages/pdf",
      "15 MB/pdf",
      "5 videos/month",
      "90 min/video with available transcriptions.",
      "5 min/video without available transcriptions.",
      "10 MB/video",
      "20 queries/day",
      "5 documents storage",
    ],
    showPricingButton: false,
  },
  {
    planName: "Pro",
    planId: "plus_tier",
    priceDetails: {
      amount: 5,
      currency: "$",
      currencyName: "Dollars",
      duration: "Month",
    },
    features: [
      "100 PDFs/month",
      "1000 pages/pdf",
      "50 MB/pdf",
      "20 videos/month",
      "180 min/video with available transcriptions.",
      "10 min/video without available transcriptions.",
      "25 MB/video",
      "200 queries/day",
      "20 documents storage",
    ],
    showPricingButton: true,
  },
];

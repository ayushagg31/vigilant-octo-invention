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
      "5 MB/pdf",
      "2 videos/month",
      "5 minutes/video",
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
      "15 videos/month",
      "10 minutes/video",
      "25 MB/video",
      "200 queries/day",
      "20 documents storage",
    ],
    showPricingButton: true,
  },
];

export const plans = {
  zero_tier: {
    MAX_DOCUMENT_LIMIT: {
      mp3: 0,
      pdf: 0,
    },
    MAX_PDF_PAGE_COUNT: 0,
    MAX_PDF_SIZE_MB: 0,
    MAX_QUESTIONS_PER_DAY: 0,
    MAX_VIDEO_SIZE_MB: 0,
  },
  free_tier: {
    pricing: {
      planName: "Free",
      primaryText: "$0/month",
      amount: 0,
      duration: "month",
      currency: "USD",
      features: [
        "120 pages/PDF",
        "10 MB/PDF",
        "2 PDFs/day",
        "1 video/day",
        "20 queries/day",
      ],
    },
    MAX_DOCUMENT_LIMIT: {
      mp3: 2,
      pdf: 5,
    },
    MAX_PDF_PAGE_COUNT: 50,
    MAX_PDF_SIZE_MB: 10,
    MAX_QUESTIONS_PER_DAY: 50,
    MAX_VIDEO_SIZE_MB: 15,
  },
  plus_tier: {
    pricing: {
      checkout_url:
        "https://yourpdf.lemonsqueezy.com/checkout/buy/ac7556da-5370-4afe-b800-03a39f5c495a?embed=1&media=0&dark=1",
      planName: "Pro",
      primaryText: "$5/month",
      amount: 0,
      duration: "month",
      currency: "USD",
      features: ["2400 pages/PDF", "20 MB/PDF", "5 PDFs/day", "50 queries/day"],
    },
    MAX_DOCUMENT_LIMIT: {
      mp3: 5,
      pdf: 20,
    },
    MAX_PDF_PAGE_COUNT: 120,
    MAX_PDF_SIZE_MB: 50,
    MAX_QUESTIONS_PER_DAY: 100,
    MAX_VIDEO_SIZE_MB: 25,
  },
};

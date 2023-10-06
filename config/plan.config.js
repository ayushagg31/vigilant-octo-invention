export const plans = {
  free_tier: {
    pricing: {
      planName: "Free",
      primaryText: "$0/month",
      amount: 0,
      duration: "month",
      currency: "USD",
    },
    MAX_DOCUMENT_LIMIT: {
      // handle monthly
      mp3: 5,
      pdf: 5,
    },
    MAX_PDF_PAGE_COUNT: 25,
    MAX_PDF_SIZE_MB: 15,
    MAX_QUESTIONS_PER_DAY: 20,
    MAX_VIDEO_SIZE_MB: 10,
    COLLECTION_LIMIT: 5,
    MAX_VIDEO_LENGTH_SECONDS: 300
  },
  plus_tier: {
    pricing: {
      checkout_url:
        "https://yourpdf.lemonsqueezy.com/checkout/buy/ac7556da-5370-4afe-b800-03a39f5c495a?embed=1&media=0&dark=1",
      test_url:
        "https://yourpdf.lemonsqueezy.com/checkout/buy/f5a9eaa3-3aa4-482c-9300-d71456b2a7c4?embed=1",
      planName: "Pro",
      primaryText: "$5/month",
      amount: 0,
      duration: "month",
      currency: "USD",
    },
    MAX_DOCUMENT_LIMIT: {
      mp3: 20,
      pdf: 100,
    },
    MAX_PDF_PAGE_COUNT: 1000,
    MAX_PDF_SIZE_MB: 50,
    MAX_QUESTIONS_PER_DAY: 200,
    MAX_VIDEO_SIZE_MB: 25,
    COLLECTION_LIMIT: 20,
    MAX_VIDEO_LENGTH_SECONDS: 600
  },
};

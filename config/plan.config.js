export const plans = {
  free_tier: {
    pricing: {
      planName: "Free",
      primaryText: "$0/month",
      amount: 0,
      duration: "month",
      currency: "USD",
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
    },
    MAX_DOCUMENT_LIMIT: {
      // handle monthly
      mp3: 2,
      pdf: 5,
    },
    MAX_PDF_PAGE_COUNT: 15,
    MAX_PDF_SIZE_MB: 5,
    MAX_QUESTIONS_PER_DAY: 20,
    MAX_VIDEO_SIZE_MB: 10,
    COLLECTION_LIMIT: 5,
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
    },
    MAX_DOCUMENT_LIMIT: {
      mp3: 15,
      pdf: 100,
    },
    MAX_PDF_PAGE_COUNT: 1000,
    MAX_PDF_SIZE_MB: 50,
    MAX_QUESTIONS_PER_DAY: 200,
    MAX_VIDEO_SIZE_MB: 25,
    COLLECTION_LIMIT: 20,
  },
};

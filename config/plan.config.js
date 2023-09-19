
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
      in: {
        planName: 'Free',
        primaryText: "₹0/month",
        amount: 0,
        duration: "month",
        currency: "INR",
        features: ['120 pages/PDF', '10 MB/PDF', '2 PDFs/day', '20 questions/day']
      },
      us: {
        planName: 'Free',
        primaryText: "$0/month",
        amount: 0,
        duration: "month",
        currency: "USD",
        features: ['120 pages/PDF', '10 MB/PDF', '2 PDFs/day', '20 questions/day']
      },
    },
    MAX_DOCUMENT_LIMIT: {
      mp3: 200,
      pdf: 100,
    },
    MAX_PDF_PAGE_COUNT: 100,
    MAX_PDF_SIZE_MB: 100,
    MAX_QUESTIONS_PER_DAY: 20,
    MAX_VIDEO_SIZE_MB: 15,
  },
  plus_tier: {
    pricing: {
      in: {
        planName: "Pro",
        price_id: "price_1NjmwMSHPnNdGnAZe9guNYlQ",
        primaryText: "₹100/month",
        amount: 0,
        duration: "month",
        currency: "INR",
        features: ['2400 pages/PDF', '20 MB/PDF', '5 PDFs/day', '50 questions/day']
      },
      us: {
        planName: "Pro",
        price_id: "price_needToCreate",
        primaryText: "$5/month",
        amount: 0,
        duration: "month",
        currency: "USD",
        features: ['2400 pages/PDF', '20 MB/PDF', '5 PDFs/day', '50 questions/day']
      },
    },
    MAX_DOCUMENT_LIMIT: {
      mp3: 200,
      pdf: 100,
    },
    MAX_PDF_PAGE_COUNT: 100,
    MAX_PDF_SIZE_MB: 100,
    MAX_QUESTIONS_PER_DAY: 50,
    MAX_VIDEO_SIZE_MB: 25,
  },
};

export const FREE_TIER = "free_tier";
export const PLUS_TIER = "plus_tier";
export const ZERO_TIER = "zero_tier";

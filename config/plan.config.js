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
        primaryText: "₹0/month",
        amount: 0,
        duration: "month",
        currency: "INR",
      },
      us: {
        primaryText: "$0/month",
        amount: 0,
        duration: "month",
        currency: "USD",
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
        price_id: "price_1NjmwMSHPnNdGnAZe9guNYlQ",
        primaryText: "₹100/month",
        amount: 0,
        duration: "month",
        currency: "INR",
      },
      us: {
        price_id: "price_needToCreate",
        primaryText: "$5/month",
        amount: 0,
        duration: "month",
        currency: "USD",
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

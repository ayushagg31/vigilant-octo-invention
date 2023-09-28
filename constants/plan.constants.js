export const FREE_TIER = "free_tier";
export const ZERO_TIER = "zero_tier";
export const PLUS_TIER = "plus_tier";

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
    planName: "Free",
    primaryText: "$0/month",
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
    planName: "Pro",
    primaryText: "$5/month",
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

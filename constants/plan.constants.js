export const FREE_TIER = "free_tier";
export const PLUS_TIER = "plus_tier";

export const plans = {
  free_tier: {
    planName: "Free",
    primaryText: "$0/month",
    MAX_DOCUMENT_LIMIT: {
      mp3: 5,
      pdf: 5,
    },
    MAX_QUESTIONS_PER_DAY: 20,
  },
  plus_tier: {
    planName: "Pro",
    primaryText: "$5/month",
    MAX_DOCUMENT_LIMIT: {
      mp3: 20,
      pdf: 100,
    },
    MAX_QUESTIONS_PER_DAY: 200,
  },
};

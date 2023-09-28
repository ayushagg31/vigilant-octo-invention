export const pricingPlanConfig = [
    {
        planName: "Free",
        planId: "free_tier",
        priceDetails: {
            amount: 0,
            currency: '$',
            currencyName: 'Dollars',
            duration: 'Month',
        },
        features: ['120 pages/PDF', '10 MB/PDF', '2 PDFs/day', '20 queries/day'],
        showPricingButton: false
    },
    {
        planName: "Pro",
        planId: "plus_tier",
        priceDetails: {
            amount: 5,
            currency: '$',
            currencyName: 'Dollars',
            duration: 'Month',
        },
        features: ['2400 pages/PDF', '20 MB/PDF', '5 PDFs/day', '50 queries/day'],
        showPricingButton: true
    }
]

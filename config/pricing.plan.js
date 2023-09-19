export const pricingPlanConfig = [
    {
        planName: "Free",
        priceDetails: {
            amount: 0,
            currency: '$',
            currencyName: 'Dollars',
            duration: 'Month',
        },
        id: 'free_tier',
        features: ['120 pages/PDF', '10 MB/PDF', '2 PDFs/day', '20 questions/day']
    },
    {
        planName: "Pro",
        priceDetails: {
            amount: 5,
            currency: '$',
            currencyName: 'Dollars',
            duration: 'Month',
        },
        id: 'plus_tier',
        features: ['2400 pages/PDF', '20 MB/PDF', '5 PDFs/day', '50 questions/day']
    }
]

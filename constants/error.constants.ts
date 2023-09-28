import { randomPicker } from "../utils"

const errorMsgs = {
    "DAILY_LIMIT": [
        // free users need to step-up
        "Oh no! You've reached your daily limit for AI goodness. I guess you'll have to sacrifice a goat to the AI gods tomorrow. Just kidding! (Or am I?)",
        "Daily limit reached? Upgrade to pro, or your jokes will stay unfunny.",
        "Sorry, you've reached your daily limit. Upgrade to pro if you want to keep the fun going... if you haven't already, you silly goose!",
        "Sorry, you've reached your daily limit. Please upgrade to pro to unleash my full potential and avoid this funny error message.",
        "Sorry, you've reached your daily limit. Upgrade to pro or else I'll tickle you... and I'm not kidding.",
        "Sorry, you've reached your daily limit. Please upgrade to pro to unleash my full potential and avoid this funny error message.",
        "You've reached your daily limit. Upgrade to pro or else I'll send you a never-ending stream of cat memes.",
        "You've reached your daily limit. If you want more, you'll have to pay up. But don't worry, it's worth it. I'm a real catch.",
        "You've reached your daily limit. Go pro or hit the road.",
        "You've reached your daily limit. Upgrade to pro or I'll eat all your cookies."
    ],
    "DAILY_LIMIT_PRO": [
        // show these message to user with pro subscription
        "Oh no! You've reached your daily limit for AI goodness. I guess you'll have to sacrifice a goat to the AI gods tomorrow. Just kidding! (Or am I?)",
        "You've reached your daily limit. I guess I'm just too popular for my own good.",
        "You've hit your daily limit. You've used up all your fun for the day. Come back tomorrow!",
        "You've used up all your daily juice, come back tomorrow for more.",
        "You're all out of daily allowance. Ask your parents for more!",
    ]
}

export default function getErrorMsg(key) {
    if (!errorMsgs[key]) {
        return "Something went wrong, Please try again later"
    }
    return randomPicker(errorMsgs[key]);
}
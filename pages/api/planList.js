import { fetchPlanList } from "../../services/firestore.service";

async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const plans = await fetchPlanList();
        res.status(200) .json({ plans });
    } catch (error) {
        res.status(500).json({ error: error.message || "Something went wrong, Please try again later" });
    }
}

export default handler;

import{ Router } from "express"
import { verifyTokenBool } from "../utils/auth";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/check", async (req: any, res: any) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json(false)

        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json(false)

        const valid = verifyTokenBool(token)
        return res.json(valid ? true : false)
    } catch (err: any) {
        if (err instanceof Error) {
            console.log(err.message)
            return res.json(false)
        }
    }
})

export default router;


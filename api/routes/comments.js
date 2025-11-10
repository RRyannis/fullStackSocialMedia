import Express from "express";
import { getComments, postComment } from "../controllers/comment.js"

const router = Express.Router();

router.get("/", getComments);
router.post("/", postComment);

export default router;
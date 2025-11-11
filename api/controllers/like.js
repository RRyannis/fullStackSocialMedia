import { db } from '../connect.js';
import jwt from "jsonwebtoken";
import moment from "moment";

export const getLikes = (req, res) => {
    const q = "SELECT likeUserId FROM likes WHERE likedPostId = ?";

      db.query(q, [Number(req.query.postId)], (error, data) =>{
            // if (error) return res.status(500).json(error);
            if (error) {
                console.error("❌ MySQL error in getLikes:", error);
                return res.status(500).json(error);
            }

            console.log("✅ Likes fetched for postId:", req.query.postId);
            return res.status(200).json(data.map(like=>like.userId));
        })
};
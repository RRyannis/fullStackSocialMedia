import { db } from '../connect.js';
import jwt from "jsonwebtoken";
import moment from "moment";

export const getRelationships = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

      db.query(q, [Number(req.query.followedUserId)], (error, data) =>{
            // if (error) return res.status(500).json(error);
            if (error) {
                console.error("❌ MySQL error in getLikes:", error);
                return res.status(500).json(error);
            }

            console.log("✅ Likes fetched for postId:", req.query.followedUserId);
            return res.status(200).json(data.map(relationship=>relationship.followerUserId));
        })
};

export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid token!");

        const q = "INSERT INTO relationships ( `followerUserId`, `followedUserId` ) VALUES  (?)";

        const values = [
            userInfo.id,
            req.body.userId
        ];

        db.query(q, [values], (error, data) =>{
            if (error) return res.status(500).json(error);

            return res.status(200).json("Following");
        });
    });
};

export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid token!");

        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ? ";

        db.query(q, [userInfo.id, req.query.userId], (error, data) =>{
            if (error) return res.status(500).json(error);

            return res.status(200).json("Unfollowed");
        });
    });
};
import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import storyRoutes from "./routes/stories.js";
import likeRoutes from "./routes/likes.js";
import authRoutes from "./routes/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../client/public/upload'))
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json("No file uploaded");
  res.status(200).json(file.filename);
});

app.use("/upload", express.static(path.join(__dirname, "../client/public/upload")));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/auth", authRoutes);


app.listen(8800, ()=>{
    console.log("Api working");
})
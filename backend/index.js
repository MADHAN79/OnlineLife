import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";
 
dotenv.config();


const PORT = process.env.PORT || 3000;

const __dirname = path.resolve(); //import path from "path" for backend route in deploying error free;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL,
    credentials: true
}
app.use(cors(corsOptions));

//backend apis for profile, posts, messaging under routes folder.
app.use("/api/v1/user", userRoute); //eg: 'https://onlinelife.onrender.com/api/v1/user' see the sub-routes in user.route.js file
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

//for deployment of frontend
app.use(express.static(path.join(__dirname, "/frontend/dist"))); 
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})

//mongodb connection
server.listen(PORT, () => {
    connectDB();
    //console.log(`Server listen at port ${PORT}`);
});
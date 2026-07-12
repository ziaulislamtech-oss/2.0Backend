const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cookieParser());

if(process.env.NODE_ENV !="production"){

    app.use(cors({
        credentials: true,
        origin: "http://localhost:5173"
    }));
}

app.use(express.json());

const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

// Serve React build
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
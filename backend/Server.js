const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const limiter = require("./middleware/rateLimiter");



const connectDB = require("./config/Db");

const app = express();




// connect database
connectDB();
//security middleware
app.use(helmet());
app.use(limiter);



//general middleware
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);
//app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/AuthRoute"));
app.use("/api/interview", require("./routes/InterviewRoute"));
app.use("/api/question", require("./routes/QuestionRoute"));
app.use("/api/submissions", require("./routes/SubmissionRoute"));




app.get("/", (req,res)=>{
    res.send("Interview Platform API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

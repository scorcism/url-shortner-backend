const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const { rateLimit } = require('express-rate-limit');
const connectToMongo = require("./src/config/dbConnect");
const PORT = 5000 || process.env.PORT;
dotenv.config();


const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    limit: 120, // Limit each IP to 120 requests per `window` (here, per 60 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})


const app = express();

app.use(cors());
app.use(express.json())
app.use(limiter)

connectToMongo();

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Working /" })
})

app.use("/api", require('./src/routes/utils'))

app.listen(PORT, () => {
    console.log(`App Listening on ${PORT}`)
})
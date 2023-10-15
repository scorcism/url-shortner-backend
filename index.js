const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectToMongo = require("./src/config/dbConnect");
const PORT = 5000 || process.env.PORT;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

connectToMongo();

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Working /" })
})

app.use("/api", require('./src/routes/utils'))

app.listen(PORT, () => {
    console.log(`App Listening on ${PORT}`)
})
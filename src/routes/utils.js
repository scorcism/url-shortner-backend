const express = require("express");
const { getMD5Short } = require("../controllers/utils");

const router = express.Router();


router.route("/create")
    .get((req, res) => {
        res.status(405).json({ message: "use post request buddy" })
    })
    .post(getMD5Short)


module.exports = router;
const express = require("express");
const { getMD5Short, getUrl } = require("../controllers/utils");

const router = express.Router();


router.route("/create")
    .get((req, res) => {
        res.status(405).json({ message: "use post request buddy" })
    })
    .post(getMD5Short)

router.post("/get-url", getUrl);

module.exports = router;
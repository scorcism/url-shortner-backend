const crypto = require('crypto');
const Url = require('../models/Url');

const getMD5Short = async (req, res) => {
    const { url } = req.body;

    const httpsUrlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    let regex = new RegExp(httpsUrlPattern);

    function getMD5(input) {
        const md5Hash = crypto.createHash('md5');
        md5Hash.update(input);
        return md5Hash.digest('hex');
    }

    try {
        if (url.match(regex)) {

            let url_check = await Url.findOne({ url: url });

            if (url_check) {
                return res.status(200).json({
                    success: true,
                    message: {
                        url: url,
                        short: url_check.short
                    }
                })
            }
            else if (!url_check) {
                async function shortCheck(url) {
                    const hex = getMD5(url)
                    const short = hex.substring(0, 7);
                    let check_short = await Url.findOne({ short: short })
                    if (check_short) {
                        shortCheck(url);
                    } else if (!check_short) {
                        return short;
                    }
                }

                const short = await shortCheck(url);

                const createDoc = await Url.create({
                    url,
                    short
                })

                res.status(201).json({
                    success: true,
                    message: {
                        url: createDoc.url,
                        short: createDoc.short
                    }
                })
            } else {
                res.status(500).json({
                    success: false,
                    message: "Internal server error"
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Enter valid https url"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


module.exports = {
    getMD5Short,
}

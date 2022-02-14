const { Router } = require("express");
const router = new Router();

const ytch = require('yt-channel-info')
const momentJalali = require("jalali-moment");

var A = []
process.on('unhandledRejection', err => {
    A.push(err);
    console.log(err);
});

router.get("/", (req, res) => {
    var CHANNEL = req.query.ID

    var INFO = []
    var VIDEO = []
    var STATS = []
    var VIPS = []

    const { VIP } = require('../public/VIP.json')

    if (!CHANNEL) {

        VIP.forEach(USER => {
            const payload = {
                channelId: USER,
                sortBy: 'newest',
                channelIdType: 0,
            }
            ytch.getChannelInfo(payload).then((response) => {
                VIPS.push(response)
            })
        });

        setTimeout(() => {
        res.render("index", {
            icon: "https://www.vectorico.com/wp-content/uploads/2018/02/youtube-icon-300x300.png",
            pageTitle: "YouTube Channel Info",
            CHANNEL,
            INFO: INFO[0],
            ERR: A[0],
            VIPS,
            layout: "./"
        });
        }, 6000);
        
        A.splice(0, A.length)
    } else {

        const payload = {
            channelId: CHANNEL,
            sortBy: 'newest',
            channelIdType: 0,
        }

        ytch.getChannelInfo(payload).then((response) => {
            INFO.push(response)
        })
        ytch.getChannelVideos(payload).then((response) => {
            VIDEO.push(response)
        })
        ytch.getChannelStats(payload).then((response) => {
            STATS.push(response)
        })

        setTimeout(() => {
            if (INFO && VIDEO && STATS) {
                res.render("index", {
                    icon: "https://www.vectorico.com/wp-content/uploads/2018/02/youtube-icon-300x300.png",
                    pageTitle: "YouTube Channel Info",
                    CHANNEL,
                    INFO: INFO[0],
                    VIDEO: VIDEO[0],
                    STATS: STATS[0],
                    ERR: A[0],
                    momentJalali,
                    layout: "./"
                })
                A.splice(0, A.length)
            }
        }, 6000);

    }

});

module.exports = router;

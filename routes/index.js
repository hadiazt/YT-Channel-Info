const { Router } = require("express");
const router = new Router();

const ytch = require('yt-channel-info')
const momentJalali = require("jalali-moment");


router.get("/", (req, res) => {
    var CHANNEL = req.query.ID

    var INFO = []
    var VIDEO = []
    var STATS = []

    if (!CHANNEL) {
        res.render("index", {
            icon: "https://www.vectorico.com/wp-content/uploads/2018/02/youtube-icon-300x300.png",
            pageTitle: "YouTube Channel Info",
            CHANNEL,
            INFO: INFO[0],
            layout: "./"
        });
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
            var TIMEJOIN = momentJalali(STATS[0].joinedDate).locale("fa").format("D MMM YYYY");
            res.render("index", {
                icon: "https://www.vectorico.com/wp-content/uploads/2018/02/youtube-icon-300x300.png",
                pageTitle: "YouTube Channel Info",
                CHANNEL,
                INFO: INFO[0],
                VIDEO: VIDEO[0],
                STATS: STATS[0],
                TIMEJOIN,
                layout: "./"
            });
        }, 12000);


        // setTimeout(() => {
        //     console.log(INFO);
        //     console.log(VIDEO);
        //     console.log(STATS);
        // }, 6000);
    }





});

module.exports = router;

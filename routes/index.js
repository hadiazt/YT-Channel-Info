const { Router } = require("express");
const router = new Router();

const ytch = require('yt-channel-info')


router.get("/", (req, res) => {
    var CHANNEL = req.query.ID

    if (!CHANNEL) {
        res.render("index", {
            icon: "https://www.vectorico.com/wp-content/uploads/2018/02/youtube-icon-300x300.png",
            pageTitle: "YouTube Channel Info",
            CHANNEL,
            layout: "./"
        });
    } else {
        var INFO = []
        var VIDEO = []
        var STATS = []

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
            res.render("index", {
                icon: "https://www.vectorico.com/wp-content/uploads/2018/02/youtube-icon-300x300.png",
                pageTitle: "YouTube Channel Info",
                CHANNEL,
                INFO : INFO[0],
                VIDEO: VIDEO[0],
                STATS: STATS[0],
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

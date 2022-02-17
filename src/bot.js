// Implementation of #100DaysOfWeb3 Bot
console.log("==== #100DaysOfWeb3 Bot Starting... ====");

// Import dependencies
const Twit = require("twit");

// Configuration
const config = require("./config");
const TwitterBot = new Twit(config.twitterKeys);

// filter the twitter public stream by the words provided
var stream = TwitterBot.stream("statuses/filter", {
    track: ["#100DaysOfWeb3"],
});

const retweetAndLike = () =>
    stream.on("tweet", function (tweet) {
        console.log("==> Tweet Received")
        let retweetID = tweet.id_str;

        // Retweet Tweet with id "retweetID"
        if (typeof(tweet.retweeted_status) === "undefined" & tweet.text.length >= 100) {
            TwitterBot.post(
                "statuses/retweet/:id",
                { id: retweetID },
                (err, res) => {
                    if (res) {
                        console.log(`==> RETWEET SUCCESS ${retweetID}`);
                    }
                    if (err) {
                        console.log(`==> ERROR in RETWEET ${err}`);
                    }
                }
            );

            // Like Tweet with id "retweetID"
            TwitterBot.post(
                "favorites/create",
                { id: retweetID },
                (err, res) => {
                    if (res) {
                        console.log(`==> Liked SUCCESS ${retweetID}`);
                    }
                    if (err) {
                        console.log(`==> ERROR in Like ${err}`);
                    }
                }
            );
            // reply to the tweet with has #100daysOfWeb3
            TwitterBot.post(
                "statuses/update",
                {
                    status:
                        "Amazing work, keep grinding 👍 @" +
                        tweet.user.screen_name,
                    in_reply_to_status_id: retweetID,
                    auto_populate_reply_metadata: true,
                },
                (err, data, response) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data.text + " tweeted!");
                    }
                }
            );
        }
    });

retweetAndLike();

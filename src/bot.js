// Implementation of #100DaysOfWeb3 Bot
console.log('==== #100DaysOfWeb3 Bot Starting... ====')

// Import dependencies
const Twit = require('twit')

// Configuration
const config = require('./config')
const TwitterBot = new Twit(config.twitterKeys)

// filter the twitter public stream by the words provided
var stream = TwitterBot.stream('statuses/filter', { track: ['#100DaysOfWeb3'] })

const retweetAndLike = () => stream.on('tweet', function (tweet) {
    let retweetID = tweet.id_str

    // Retweet Tweet with id "retweetID"
    if(tweet.user.screen_name !== '_100DaysOfWeb3'){
        TwitterBot.post('statuses/retweet/:id', { id: retweetID }, (err, res) => {
            if (res) {
            console.log(`==> RETWEET SUCCESS ${retweetID}`)
            }
            if (err) {
            console.log(`==> ERROR in RETWEET ${err}`)
            }
        })

        // Like Tweet with id "retweetID"
        TwitterBot.post('favorites/create', { id: retweetID }, (err, res) => {
            if (res) {
            console.log(`==> Liked SUCCESS ${retweetID}`)
            }
            if (err) {
            console.log(`==> ERROR in Like ${err}`)
            }
        })
    }   
})


retweetAndLike()
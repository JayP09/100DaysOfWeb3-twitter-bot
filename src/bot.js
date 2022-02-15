// Implementation of #100DaysOfCode Bot

console.log('==== #100DaysOfCode Bot Starting... ====')

// Import dependencies
const Twit = require('twit')

// Configuration
const config = require('./config')
const TwitterBot = new Twit(config.twitterKeys)

// filter the twitter public stream by the words provided
var stream = TwitterBot.stream('statuses/filter', { track: ['#100DaysOfWeb3'] })

const retweet = () => stream.on('tweet', function (tweet) {
    let retweetID = tweet.id_str
    TwitterBot.post('statuses/retweet/:id', { id: retweetID }, (err, res) => {
        if (res) {
          console.log(`====> RETWEET SUCCESS ${retweetID}`)
        }
        if (err) {
          console.log(`====> ERROR in RETWEET ${err}`)
        }
    })
    TwitterBot.post('favorites/create', { id: retweetID }, (err, res) => {
        if (res) {
          console.log(`====> Liked SUCCESS ${retweetID}`)
        }
        if (err) {
          console.log(`====> ERROR in Like ${err}`)
        }
    })
})

// Invoke API
retweet()
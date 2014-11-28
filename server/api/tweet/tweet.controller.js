/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tweets              ->  index
 * POST    /tweets              ->  create
 * GET     /tweets/:id          ->  show
 * PUT     /tweets/:id          ->  update
 * DELETE  /tweets/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var twitter = require('./../../components/twitter/twitter.js');
var Tweet = require('./tweet.model');
var $ = require('jquery');

// gets list of tweets matching topic
exports.getTweets = function(req, res){
  console.log(req.params.topic);
  Tweet.find({keyword: req.params.topic})
    .limit(5000)
    .exec(function(err, tweets) {
      console.log('num tweets found '+tweets.length);
      return res.json(200, tweets);
    });
  // Tweet.find({keyword: req.params.topic}, function(err, tweets) {
  //   console.log('num tweets found '+tweets.length);
  //   return res.json(200, tweets);
  // });
}

// stops twitter stream
exports.stopTweets = function(req, res) {
  twitter.stopTweets(req.params.topic, function(err, data){
    return res.send(200, data);
  });
}

// starts twitter stream
exports.startTweets = function(req, res){
  twitter.streamTweets(req.params.topic, function(err, data){
    return res.json(200, data);
  });
}

// destroys tweets matching topic in DB
exports.destroyTweets = function(req, res){
  Tweet.find({keyword: req.params.topic}, function(err, tweets){
    for (var i = 0; i < tweets.length; i++) {
      tweets[i].remove();
    }
    return res.send(200);
  })
}

// Get list of all tweets
exports.index = function(req, res) {
  Tweet.find()
  .limit(5000)
  .exec(function(err, tweets) {
    console.log('num tweets found '+tweets.length);
    return res.json(200, tweets);
  });

  // Tweet.count({}, function (err, cnts) {
  //   if(err) { return handleError(res, err); }
  //   console.log(cnts);
  //   return res.json(200, cnts);
  // });
  // Tweet.find(function (err, tweets) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, tweets);
  // });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
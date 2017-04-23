var express = require('express');
var router = express.Router();

var dataPresent = require(__dirname + '/../public/data/presentations.json');

var ObjectID = require('mongodb').ObjectID;
var db = require('./../bin/db');
var Presents = require('./../models/presents');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res) {

  var present,
    slides = [];

  Presents.findActive(function (err, doc) {
    if (err) return res.status(500).send(500);

    present = doc;
    slides = doc.slides.sort(function (obj1, obj2) {
      return obj1.order - obj2.order;
    });

    res.render('presentation', {
      title: 'Просмотр',
      data: doc
    });
  });

/*  res.render('presentation', {
    title: "Просмотр",
    data: slides
  });*/
});

module.exports = router;

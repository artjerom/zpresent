var express = require('express');
var router = express.Router();

var dataPresent = require(__dirname + '/../public/data/presentations.json');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('presentation', {
    title: "Презентация"
  });
});

module.exports = router;

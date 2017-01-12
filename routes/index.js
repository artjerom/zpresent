var express = require('express');
var router = express.Router();

var dataPresent = require(__dirname + '/../public/data/presentations.json');

/* GET home page. */

router.get('/', function (req, res) {});

router.get('/present/:name', function(req, res) {
  var model = dataPresent;

  model.find(function () {
    var name = req.params.name;
    console.log(name);
  });

  res.render('presentation', {
    title: "Презентация",
    name: req.params.name,
    data: model.find(function () {
      return name = req.params.name;
    })
  });
});

module.exports = router;

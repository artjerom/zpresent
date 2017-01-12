var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require('body-parser');

var dataPresent = require(__dirname + '/../public/data/presentations.json');
var dataImages = require(__dirname + '/../public/data/images.json');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('admin/list', {
    title: 'Список презентаций',
    data: dataPresent
  });
});

router.get('/upload', function (req, res) {
  res.render('admin/upload', {
    title: "Загрузить изображение"
  });
});

router.get('/present/:name', function (req, res) {
  var model = dataPresent;
  res.render('admin/view-present', {
    name: req.params.name,
    viewPresent: true,
    data: model.find(function () {
      return name = req.params.name;
    })
  });
});

router.post('/api/upload', function(req, res) {
  res.redirect('/admin');
  var form = new formidable.IncomingForm();

  form.multiples = true;

  form.uploadDir = path.join(__dirname, '/../public/images');

  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    dataPresent.newImg = path.join(form.uploadDir, file.name);

    fs.readFile(__dirname + '/../public/data/images.json', function (err, data) {
      var json = JSON.parse(data);

      json.push({
        "name": file.name,
        "imgUrl": dataPresent.newImg
      });

      fs.writeFile(__dirname + '/../public/data/images.json', JSON.stringify(json, null, 4), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('ok ...');
        }
      });
    });

  });

  form.parse(req);

});

module.exports = router;
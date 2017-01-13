var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var dataPresent = require(__dirname + '/../public/data/presentations.json');
var dataImages = require(__dirname + '/../public/data/images.json');

var PresentApi = require('./api/PresentApi');

router.get('/test', function (req, res) {
  res.json({presentations: dataPresent});
});

router.get('/', function(req, res) {
  res.render('admin/list', {
    title: 'Список презентаций',
    createBtn: true,
    data: dataPresent
  });
});

router.get('/upload', function (req, res) {
  res.render('admin/upload', {
    title: "Загрузить изображение",
    createBtn: true
  });
});

router.get('/present/:id', function (req, res) {
  var presentId = dataPresent;
  var filtered = presentId.filter(function (n) {
    return n.id == req.params.id;
  });

  res.render('admin/view-present', {
    addSlide: true,
    data: filtered[0],
    createBtn: true,
  });
});

router.get('/create', function (req, res) {
  res.render('admin/create', {
    title: "Создать презентацию",
    dataPresnt: dataPresent,
    createBtn: false,
    dataImages: dataImages
  });
});

router.post('/api/create', function (req, res) {

  var present = {};

  fs.readFile(__dirname + '/../public/data/presentations.json', function (err, data) {
    if (err) { console.log(res.send(err)); }
    var json = JSON.parse(data);
    var arrPresent = [];

    for (var x in json) {
      arrPresent.push(json[x]);
    }

    console.log(req.body);
  });

});

router.post('/api/upload', function(req, res) {
  res.redirect('/admin');
  var form = new formidable.IncomingForm();

  form.multiples = true;

  form.uploadDir = path.join(__dirname, '/../public/images');

  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    dataPresent.newImg = path.join('/images/', file.name);

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

var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require('body-parser');

var dataPresent = require(__dirname + '/../public/data/presentations.json');

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

router.post('/api/upload', function(req, res) {
  var form = new formidable.IncomingForm();

  form.multiples = true;

  form.uploadDir = path.join(__dirname, '/../public/images');

  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  form.on('error', function(err) {
    console.log('Ошибка: \n' + err);
  });

  form.on('end', function() {
    res.redirect('/admin');
  });

  form.parse(req);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require('body-parser');

var presentCtrl = require('./../controllers/presents');

var ObjectID = require('mongodb').ObjectID;
var db = require('./../bin/db');

router.get(['/', '/present'], presentCtrl.all);

/* Route: /admin/present/:id */
router.route('/present/:id')
    // Получить презентацию
    .get(presentCtrl.findById)
    // Изменить презентацию
    .put(presentCtrl.update)
    // Удалить презентацию
    .delete(presentCtrl.delete);
/* End route */

// Создать презентацию
router.post('/present', presentCtrl.create);

router.get('/upload', function (req, res) {
  res.render('admin/upload', {
    title: "Загрузить изображение"
  });
});


router.get('/create', function (req, res) {
  res.render('admin/create', {
    title: "Создать презентацию",
    data: dataPresent
  });
});

router.post('/api/upload', function(req, res) {
  res.redirect('/admin');
  var form = new formidable.IncomingForm();

  form.multiples = true;

  form.uploadDir = path.join(__dirname, '/../public/images');

  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));

  });

  form.parse(req);

});

module.exports = router;

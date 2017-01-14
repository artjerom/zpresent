var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require('body-parser');

// var PresentRepository = require(__dirname + '/models/presentations.js');
var dataPresent = require(__dirname + '/../public/data/presentations.json');
var dataImages = require(__dirname + '/../public/data/images.json');
var db = require('./../bin/db');

// Роуты '/admin'

router.get(['/', '/present'], function (req, res) {
  db.get().collection('present').find().toArray(function (err, docs) {
      if (err) {
          console.log(err);
          return res.status(500).send('ошибка mongo');
      }

      res.send(docs);
  });
});

router.get('/present/:id', function (req, res) {
  var present = dataPresent.find(function (present) {
    return present.id === Number(req.params.id);
  });

  if (req.params.id > dataPresent.length) {
    res.status(404).send('Презентация не найдена ...');
  } else {
    res.send(present);
  }
});

router.post('/present', function (req, res) {
  var present = {
    name: req.body.name
  };

  db.get().collection('present').insert(present, function (err, result) {
      if (err) {
          console.log(err)
          res.status(500).send('ошибка');
      }

      res.send(present);
  });

});

router.put('/present/:id', function (req, res) {
    var present = dataPresent.find(function (present) {
        return present.id === Number(req.params.id);
    });

    present.name = req.body.name;
    res.status(200).send(present);
});

router.delete('/present/:id', function (req ,res) {
  dataPresent = dataPresent.filter(function (present) {
    return present.id !== Number(req.params.id);
  });

  res.status(200).send(dataPresent);
});

/*router.get('/', function(req, res) {
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

router.get('/present/:id', function (req, res) {
  var presentId = dataPresent,
      id = req.params.id;
  var filtered = presentId.filter(function (n) {
    return n.id == req.params.id;
  });

  res.render('admin/view-present', {
    addSlide: true,
    data: filtered[0]
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

});*/

module.exports = router;

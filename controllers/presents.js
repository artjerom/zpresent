var Presents = require('../models/presents');

exports.all = function (req, res) {
    Presents.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.status(500).send(500);
        }

        res.render('admin/list', {
            title: "Список презентаций",
            data: docs
        });
    });
};

exports.findById = function (req, res) {
    Presents.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.status(500).send(500);
        }

        res.render('admin/view-present', {
            addSlide: true,
            data: doc
        });
    });
};

exports.create = function (req, res) {
    console.log(req);
    var present = {
        name: req.body.name,
        active: req.body.active ? true : false,
        slides: req.body.slides
    };

    Presents.create(present, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send(500);
        }
    });

  res.send(present);
};

/*
* {
 "name": "first-present",
 "active": true,
 "slides": [
 slide: {"order": 1, "imgUrl": "/path/to/first.png" },
 slide: {"order": 2, "imgUrl": "/path/to/first-2.png"  }
 ]
 }
* */

exports.update = function (req, res) {
    Presents.update(req.params.id, {
       name: req.body.name,
       slides: req.body.slides
    }, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send(500);
        }

        res.status(200).send(200);
    });
};

exports.delete = function (req, res) {
    Presents.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send(500);
        }

        res.status(200).send(200);
    });
};
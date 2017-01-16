var Presents = require('../models/presents');

exports.all = function (req, res) {
    Presents.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.status(500).send(500);
        }

        res.send(docs);
    });
};

exports.findById = function (req, res) {
    Presents.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.status(500).send(500);
        }

        res.send(doc);
    });
};

exports.create = function (req, res) {
    var present = {
        name: req.body.name
    };

    Presents.create(present, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send(500);
        }

        res.send(present);
    });
};

exports.update = function (req, res) {
    Presents.update(req.params.id, {
       name: req.body.name
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
var db = require('../bin/db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function (cb) {
    db.get().collection('present').find().toArray(function (err, docs) {
        cb(err, docs);
    });
};

exports.findActive = function(cb) {
    db.get().collection('present').findOne({active: true}, function (err, doc) {
        cb(err, doc);
    });
};

exports.findById = function (id, cb) {
    db.get().collection('present').findOne({_id: ObjectID(id)}, function (err, doc) {
        cb(err, doc);
    });
};

exports.create = function (present, cb) {
    db.get().collection('present').insert(present, function (err, result) {
        cb(err, result);
    });
};

exports.update = function (id, newData, cb) {
    db.get().collection('present').updateOne(
        {_id: ObjectID(id)},
        newData,

        function (err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function (id, cb) {
    db.get().collection('present').deleteOne(
        {_id: ObjectID(id)},

        function (err, result) {
            cb(err, result);
        }
    );
};
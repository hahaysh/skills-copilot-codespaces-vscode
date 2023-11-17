// Create web server for comments
// 2016-02-07    PV

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//var commentsPath = path.join(__dirname, 'comments.json');
var commentsPath = path.join(__dirname, 'comments.csv');
var comments = [];

fs.readFile(commentsPath, 'utf8', function (err, data) {
    if (err) {
        console.log(err);
        return;
    }
    var lines = data.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var fields = lines[i].split(';');
        if (fields.length >= 2) {
            var comment = { id: i, author: fields[0], text: fields[1] };
            comments.push(comment);
        }
    }
});

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
});

router.post('/', function (req, res) {
    var comment = {
        id: comments.length,


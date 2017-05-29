var express = require('express');
var http = require("http");
var fs = require("fs");
var formidable = require("formidable");
var config = require('./config/index');
var port = process.env.PORT || config.build.port;
var app = express();
var router = express.Router();

router.get('/', function(req, res, next) {
    req.url = '/index.html';
    next();
});

app.use(router);

var apiRoutes = express.Router();
apiRoutes.post("/upload", function(req, res) {
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8';
    form.uploadDir = "/upload";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(fields, files);
    })
    res.render("上传成功");
});


app.use(express.static('./dist'));

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
});


var proxyMiddleware = require('http-proxy-middleware')
app.use(proxyMiddleware('/api', { target: 'http://10.192.33.77:8080' }))
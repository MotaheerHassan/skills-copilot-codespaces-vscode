//create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var comments = [
    {
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2017-6-14'
    },
    {
        name: '李四',
        message: '今天天气真不错！',
        dateTime: '2017-6-14'
    },
    {
        name: '王五',
        message: '今天天气太不错了！',
        dateTime: '2017-6-14'
    },
    {
        name: '赵六',
        message: '今天天气不错！',
        dateTime: '2017-6-14'
    }
];
http.createServer(function(req, res) {
    //parse url
    var parseObj = url.parse(req.url, true);
    var pathname = parseObj.pathname;
    if (pathname === '/') {
        fs.readFile('./views/index.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            var htmlStr = template.render(data.toString(), {
                comments: comments
            });
            res.end(htmlStr);
        });
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    } else if (pathname.indexOf('/public/') === 0) {
        fs.readFile('.' + pathname, function(err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    } else if (pathname === '/pinglun') {
        var comment = parseObj.query;
        comment.dateTime = '2017-6-14';
        comments.unshift(comment);
        //redirect to /
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else {
        fs.readFile('./views/404.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    }
}).listen(3000)

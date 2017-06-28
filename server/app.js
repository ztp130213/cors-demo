var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var request = require('request');
var port = 8888;

http.createServer(function(req, res){
    var _url = url.parse(req.url);
    // jsonp
    if (_url.pathname === '/jsonp') {
        var query = _url.query;
        var params = qs.parse(query);
        var f = "";
    
        f = params.callback || 'callback';
    
        res.writeHead(200, {"Content-Type": "text/javascript"});
        res.write(f + "({text:'jsonp demo succuss'})");
        res.end();
    // proxy
    } else if (_url.pathname === '/proxy') {
        var proxyUrl = "";
            if (req.url.indexOf('?') > -1) {
            proxyUrl = req.url.substr(req.url.indexOf('?') + 1);
        }
        if (req.method === 'GET') {
            request.get(proxyUrl).pipe(res);
        } else if (req.method === 'POST') {
            var post = '';     //定义了一个post变量，用于暂存请求体的信息
            req.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
                post += chunk;
            });
    
            req.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
                post = qs.parse(post);
                request({
                        method: 'POST',
                        url: proxyUrl,
                        form: post
                    }).pipe(res);
            });
        }
    // 默认首页
    } else if (_url.pathname === '/index') {
        fs.readFile('./index.html', function(err, data) {
            res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
            res.write(data);
            res.end();
        });
    // cors
    } else if (_url.pathname === '/cors') {
        var Cookies = {};
        req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
            var parts = Cookie.split('=');
            Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
        });
        if (req.method === 'POST') {
            post = '';
            req.on('data', function(chunk){ //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
                post += chunk;
            });
        
            req.on('end', function(){ //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
                // post = qs.parse(post);
                console.log(post);
            });
        }
        if (req.headers.origin) {
            var header = {
                "Content-Type": "text/html; charset=UTF-8",
                // "Access-Control-Allow-Origin": 'http://127.0.0.1:7999,http://localhost:7999',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
            }
            // 多个域名设置的方法
            if (req.headers.origin == 'http://127.0.0.1:7999' || req.headers.origin == 'http://localhost:7999') {
                header["Access-Control-Allow-Origin"] = req.headers.origin;
            }
            res.writeHead(200, header);
            
            // post才返回，其他请求暂时返回空，这里option要用到
            if (req.method === 'POST') {
                res.write('cors ' + Cookies['test']);
            }
            res.end();
        } else {
            res.write('hah');
            res.end();
        }
    // cors with nginx
    } else if (_url.pathname === '/cors_nginx') {
        var Cookies = {};
        req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
            var parts = Cookie.split('=');
            Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
        });
        if (req.method === 'POST') {
            post = '';
            req.on('data', function(chunk){ //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
                post += chunk;
            });
        
            req.on('end', function(){ //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
                // post = qs.parse(post);
                console.log(post);
            });
        }
        if (req.headers.origin) {
            
            var header = {
                // "Content-Type": "text/html; charset=UTF-8",
                // "Access-Control-Allow-Origin": 'http://127.0.0.1:7999,http://localhost:7999',
                // "Access-Control-Allow-Credentials": true,
                // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
            }
            // 多个域名设置的方法
            // if (req.headers.origin == 'http://127.0.0.1:7999' || req.headers.origin == 'http://localhost:7999') {
            //     header["Access-Control-Allow-Origin"] = req.headers.origin;
            // }
            res.writeHead(200, header);
            
            // post才返回，其他请求暂时返回空，这里option要用到
            if (req.method === 'POST') {
                res.write('cors ' + Cookies['test']);
            } else {
                console.log('bbbbbbb');
            }
            res.end();
        } else {
            res.write('hah');
            res.end();
        }
    }
}).listen(port);
console.log('listening...' + port + '...');

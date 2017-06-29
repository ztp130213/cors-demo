跨域的方法有jsonp，代理，cors，这里主要给出jsonp和cors的实现demo(支持多域名，支持自定义http头，支持cookie)。概念和协议另查资料。

参考

https://www.html5rocks.com/en/tutorials/cors/

http://www.yunweipai.com/archives/9381.html

演示方法
## 前后端开启方法
前端启动，端口7999：
```
cd front
http-server -p 7999
```
后端启动，端口8888：
另开一个console
```
cd server
npm install
node app.js
```

## jsonp
浏览器里访问 127.0.0.1:7999/jsonp.html

## cors
#### cors
浏览器里访问 127.0.0.1:7999/cors.html或者 localhost:7999/cors.html

这个demo演示在服务端代码里支持多域名(127.0.0.1:7999, localhost:7999)，cookie和Authorization
#### cors with nginx
浏览器里访问 127.0.0.1:7999/cors_nginx.html或者localhost:7999/cors_nginx.html

这个demo演示在代码里本身不支持cors，通过配置nginx支持多域名，cookie和Authorization

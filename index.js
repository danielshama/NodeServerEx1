var   http = require('http'),
      eventEmitter = require('events'),
      eventsConfig = require('./config'),
      HotelStars = require('./hotel'),
      jsdom = require('node-jsdom'),
      fs = require('fs'),
      jquery = "http://code.jquery.com/jquery.js";

//Create Hotels Stars module
var hotel = new HotelStars('SPA', 'Families');

http.createServer(function(req, res) {  
   res.writeHeader(200, {"Content-Type": "text/html"}); 
   // open a template html file
   fs.readFile('./index.html', 'utf8', function (err, html) {
      if (err) throw err; 

      //work on the template's DOM and send to the client
      jsdom.env(html, [jquery], function (errors, window) {
         var $, list, logs;

         $ = window.$;
         list = $('#actions');
         logs = hotel.getLogs();
         
         logs.forEach(function (element, index, array) {
            list.append('<li>' + element + '</li>');
         });
         res.write(window.document.documentElement.outerHTML);  
         res.end(); 
      });
   });
}).listen(8080);

//Some actions
hotel.reduceLike();
hotel.addLike();
hotel.addLike();
hotel.addLike();
hotel.reduceLike();
hotel.addLike();
hotel.addLike();




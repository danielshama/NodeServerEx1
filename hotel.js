"use strict";

var eventEmitter = require('events');
var config = require('./config');

class Hotel extends eventEmitter {
   constructor(hotelName, hotelCategory) {
      super();
      this.likes = 0;
      this.name = hotelName;
      this.category = hotelCategory
      this.logs = [];

      //event listners
      this.on(config.events.REVIEWS_CHANGED, this.displayDetails);
      this.on(config.events.REVIEWS_CHANGED, this.displayLikes);
      this.on(config.events.OUT_OF_BALANCE, this.displayDetails);
      this.on(config.events.OUT_OF_BALANCE, () => {
          this.displayErr("Out of Balance!");
      });
   }

   //save log on list and write on the console
   publishMsg(msg){
      this.logs.push(msg);
      console.log(msg);
   }

   addLike(){
      this.likes += 1;
      this.publishMsg('Add new Like');
      this.emit(config.events.REVIEWS_CHANGED);
   }

   reduceLike(){
      if(this.likes > 0 ) {
         this.likes -= 1;
         this.publishMsg('Delete a Like');
         this.emit(config.events.REVIEWS_CHANGED);
      } else {
         this.emit(config.events.OUT_OF_BALANCE, 'error');
      }
   }

   displayDetails(){ 
      this.publishMsg('Hotel Name: ' + this.name +
                        ', Category: ' + this.category );
   }

   displayLikes(){
      this.publishMsg('Likes: ' + this.likes);
   }

   displayErr(err){
      this.publishMsg('ERROR: ' + err);
   }

   getName(){
      return this.name;
   }

   getCategory(){
      return this.category;
   }

   getLogs(){
      return this.logs;
   }
}

module.exports = Hotel;
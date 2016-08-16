var express = require('express');
var router = express.Router();
var pg = require('pg');
var connect = 'postgres://localhost:5432/mccully'


router.get('/'  , function(req , res){
  //Retrieve books from database
  pg.connect(connect, function(err, client, done) {
    if (err) {
      console.log("ERROR1");
      res.sendStatus(500);
    }
    client.query('SELECT * FROM books' , function(err , result){
      done(); //closes connection
      if (err){
        console.log("ERROR2");
        res.sendStatus(500);
      }
      res.send(result.rows);
    });
  });
});

router.post('/' , function(req , res){
  var book = req.body;

  pg.connect(connect , function(err , client , done){
    if (err) {
      console.log("ERROR3")
      res.sendStatus(500);
    }
    client.query('INSERT INTO books (author, title , published , edition , publisher)'
      + 'VALUES ($1 , $2 , $3 , $4 , $5)' , [book.author , book.title , book.published , book.edition , book.publisher],
      function (err , result) {
        done();
        if (err) {
          console.log('ERROR4');
          res.sendStatus(500);
        }
        res.sendStatus(201);
      }
    )
  });
});
module.exports = router;

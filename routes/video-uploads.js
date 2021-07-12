const express = require("express");
const router = express.Router();
const fs = require('fs');
const uniqid = require('uniqid');
const mysql  = require('mysql');
const util = require( 'util' );

const config = require('../config.json');


router.get("/get/allVideos", async (req, res) => {


    let recordingsData = [];

    const db = makeDb( config );
    try {
        let rows = await db.query('SELECT * FROM VRP_Recordings;');
        console.log('The recording name is: ', rows);
        recordingsData = JSON.parse(JSON.stringify(rows));
        recordingsData = recordingsData.reverse();
        // do something with someRows and otherRows
      } catch ( err ) {
        // handle the error
      } finally {
        await db.close();
      }

    const result = {
        videosData: recordingsData
    }
    
    res.send(result);
});

 

router.post("/post/videoBase64" , async (req, res) => {
  console.log(req.body.videoBase64Str);
  req.body.videoBase64Str = req.body.videoBase64Str.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
  req.body.videoBase64Str = req.body.videoBase64Str.replace(/ /g, '+'); // <--- this is important
  
  let vidFileName = uniqid();
  // Enter the record into the database 
  let sql = "INSERT INTO VRP_Recordings (recording_name) VALUES (?)";
  const db = makeDb( config );
  try {
      let insertRow = await db.query(sql, [vidFileName + ".mp4"] );
      console.log('The insert row query response is: ', insertRow);
      // recordingsData = JSON.parse(JSON.stringify(rows));
      // do something with someRows and otherRows
  } catch ( err ) {
      // handle the error
  } finally {
      await db.close();
  }

  fs.writeFile(`uploads/${vidFileName}.mp4`, req.body.videoBase64Str, 'base64', function(err) {
      console.log(err);
  });

  const result = {
      test: "success 123"
  }

  res.send(result);
}); 


function makeDb( config ) {
    const connection = mysql.createConnection( config );
    return {
      query( sql, args ) {
        return util.promisify( connection.query )
          .call( connection, sql, args );
      },
      close() {
        return util.promisify( connection.end ).call( connection );
      }
    };
}

module.exports = router;
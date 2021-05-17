const express = require('express');
var db = require("../db/database.js")

const router = express.Router();


router.post('/', signin);

async function signin(req,res){
  try {
    var data = req.body;

    var sql ='SELECT COUNT(*) FROM library where name=(?)'
    var params =[data.name]
    db.all(sql, params, function (err, result) {
      if (err){
        return res.status(400).json({"error": err.message})
      }
      console.log(result[0]['COUNT(*)']);
      if(result[0]['COUNT(*)'] == 0)
        res.status(401).send()
      else
        res.status(200).send()
    });
  } catch (error) {
    return res.status(400).json({"error":error.message});
  }
}



module.exports = router;
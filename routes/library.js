const express = require('express');
var db = require("../db/database.js")

const router = express.Router();


router.get('/', get_videos);
router.get('/:user/videos', get_videos_by_user);
router.post('/:user/videos' , add_video);
router.delete('/:user/videos/:id' , remove_video);


async function get_videos(req,res){
  let sql = "select * from library"
    try {
      db.all(sql, [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({  "data":rows  })
      });

    } catch (error) {
      res.status(400).json({"error":err.message});
    }
}

async function get_videos_by_user(req,res){
  let user = req.params.user
  let sql = "select * from library where name = ?"
    try {
      db.all(sql, [user], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({  "data":rows  })
      });

    } catch (error) {
      res.status(400).json({"error":err.message});
    }
}

async function remove_video(req,res){
  let user = req.params.user
  let id = req.params.id

  let sql = "DELETE FROM library WHERE  id = ?"
    try {
      db.run(sql, id, (err) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).send()
      });

    } catch (error) {
      res.status(400).json({"error":err.message});
    }
}

async function add_video(req,res){
  try {
    var data = req.body;
    let user = req.params.user

    var sql ='INSERT INTO library (name, title, id) VALUES (?,?,?)'
    var params =[user, data.video.title, data.video.id]

    db.run(sql, params, function (err, result) {
      if (err){
        return res.status(400).json({"error": err.message})
      }
      res.status(200).json({
        "message": "success",
      })
    });
  } catch (error) {
    return res.status(400).json({"error":error.message});
  }
}

module.exports = router;
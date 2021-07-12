const express = require('express');
const mongoose = require('mongoose');
const user = require('../DB/user');
const route = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 6;

route.post('/', async(req, res) =>{
    const {username, email, password} = req.body;
    user.findOne({"username": username}).then( (result) =>{
      if(result){
        console.log("username already exists!");
        res.status(409).send("username already exists!");
      }
      else{
        user.findOne({"email": email}).then( (result) =>{
          if(result){
            console.log("email already exists!");
            res.status(409).send("email already exists!");
          }
          else{
            let user = {};
            user.username = username;
            user.email = email;
            let pp = password;
            bcrypt.hash(pp, saltRounds, async (err, hash) => {
              pp = hash;
              user.hash = pp;
              let userModel = new User(user);
              console.log(userModel);
              await userModel.save();
              res.json(userModel);
            });
          }
        }).
        catch((err)=>{
          console.log(err);
        });
      }
    }).
    catch((err)=>{
      console.log(err);
    });
});

route.get('/', async(req, res) => {
    const username = req.headers['username']
    const password = req.headers['password']
    user.findOne({"usrename": username}).then((result) =>{
      if(result)
      {
        bcrypt.compare(password, result['hash'], function(err, res) {
          if (res == true)
          {
            res.status(200).send("Login succesful");
          }
          else
          {
            res.status(409).send("Wrong password");
          }
        });
      }
      else
      {
        res.status(409).send("No such username");
      }
    })
  // user.findOne({"username": "saqqqbeshjhguyfftgc 55757"}).then( (result) =>{
  //     if(result){
  //       console.log(result);
  //       res.send(result);
  //     }
  //     else{
  //       console.log("illa da")
  //       res.send(result);
  //     }
  //   }).
  //   catch((err)=>{
  //     console.log(err);
  //   });
})



module.exports = route;
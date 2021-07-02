
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/travelAgencyDB",{useNewUrlParser: true, useUnifiedTopology: true});
const today = new Date();

const clientSchema = new mongoose.Schema({
  nom:String,
  prenom:String,
  postnom:String,
  typevisa:String,
  email:{
    type:String,
    require:true,
    unique:true
  },
  Tel:String,
  montantpaye:String,
  montantfacture:String,
  date:String
});

const Client = new mongoose.model("Client",clientSchema);

app.get("/", function(req,res){
  Client.find(function(err, clientFounds){
    if(!err){
      res.render("index",{listClients:clientFounds});
    }else{
      console.log(err);
    }
  })
});

app.get("/add", function(req,res){
  res.render("add");
})

app.post("/add", function(req,res){

  var message =[];

  const client = new Client({
      nom:req.body.nom,
      prenom:req.body.prenom,
      postnom:req.body.postnom,
      typevisa:req.body.typevisa,
      email:req.body.email,
      Tel:req.body.telephone,
      montantpaye:req.body.montantpayer,
      montantfacture:req.body.montantfacturer,
      date:date.getDate()
    });

    if(!(req.body.nom ==="")){
      if(!(req.body.prenom === "")){
        client.save(function(err){
          if(!err){
            console.log("successfully saved");
          }else{
            console.log(err);
          }
        })
      }else{
        console.log("something is empty");
      }
    }
    res.render("add");
  });


app.route("/client/:nom")

.get(function(req,res){
  Client.findOne({nom: req.params.nom},function(err,clientFound){
    if(clientFound){
      res.render("update",{clientFound});
    }else{
      res.send("no client matching that params");
    }
  })
})


app.post("/modif", function(req,res){
  Client.updateOne({_id: req.body.myId},{nom:req.body.nom,
    postnom: req.body.postnom,prenom:req.body.prenom},
    function(err){
      if(!err){
        res.redirect("/");
      }else{
        res.send(err);
      }
    });
})


app.post("/delete", function(req,res){
    Client.findByIdAndRemove({_id:req.body.button},function(err){
      if(!err){
        console.log("successfully deleted");
        res.redirect("/");
      }else{
        console.log(err);
      }
    })
})




app.listen(3000, function(req,res){
  console.log("server running on port 3000");
})

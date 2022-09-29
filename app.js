const express = require("express");
const { get } = require("express/lib/response");
const { urlencoded } = require("body-parser");
const { post } = require("express/lib/response");
const date = require(__dirname + "/date.js");

const app = express();

let items=["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){

    let day = date.getDate();

    res.render("list", {listTitle:day, newItemList:items})

})

app.post("/", function(req,res) {
    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/");

    }
    //console.log(expression)
})

app.get("/work", function(req,res){
    res.render("list", {listTitle:"Work List", newItemList: workItems})
})

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about", function(req,res){
    res.render("about")
})

app.listen(4000,function(){
    console.log("Listening on port 4000")
})

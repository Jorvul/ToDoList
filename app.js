const express = require("express");
const { get } = require("express/lib/response");
const { urlencoded } = require("body-parser");
const { post } = require("express/lib/response");

const app = express();
let items=[];
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    let today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay:day, newItemList:items}, "/styles.css")

})

app.post("/", function(req,res) {
    item = req.body.newItem;
    items.push(item)
    //console.log(expression)
    res.redirect("/");
})

app.listen(4000,function(){
    console.log("Listening on port 4000")
})

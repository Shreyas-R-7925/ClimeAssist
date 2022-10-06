const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){
  console.log(req.body.cityName);
  console.log("Post request received");
  const query = req.body.cityName;
  const apiKey = "35544d77872e121ba996659411fef21f";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const des = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<p> The weather is currently "+des+"<p>");
        res.write("<h1> The temperature in "+ query+" is "+temp + " degree Celcius.</h1>");
        res.write("<img src =" + imageURL+">")
        res.send()
    })
  })
})






app.listen(3000,function(){
  console.log("Server is running successfully on port 3000");
})

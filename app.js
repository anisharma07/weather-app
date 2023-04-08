const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));

const https= require("https");
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});
app.post("/", function(req,res){
    const unit="metric";
    const zipCode=req.body.zipc;
    const appKey="1ba48b561498d453e28984d4b6eaf6bc";
    const url="https://api.openweathermap.org/data/2.5/weather?units="+unit+"&zip="+zipCode+",in&appid="+appKey;
    https.get(url, function(response){
        console.log("StatusCode="+response.statusCode);
        console.log("Status="+response.statusMessage);
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const tempe=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            const name=weatherData.name
            const icon=weatherData.weather[0].icon
            const iconurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
           
            res.write("<h1>The weather is currently "+weatherDescription+".</h1>");
            res.write("<h1>The temp in "+name+" with zip code:"+zipCode+" is: "+tempe+" degrees celcius</h1>");
            res.write("<img src="+iconurl+">");
            res.send()
        });
    });
});

app.listen(3000,function(){
    console.log("The server is started at port 3000");
});
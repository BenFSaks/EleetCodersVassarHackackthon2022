const express = require('express')
const path = require('path')


var app = express()
//app.set('views', path.join(__dirname, 'public/views'))
app.use(express.static(path.join(__dirname,'public/views')))
app.use(express.static(path.join(__dirname,'public/css')))
let CITY_NAME = "Beijing"
let STATE_NAME = "New%20York"
let COUNTRY_NAME = "China"
let YOUR_API_KEY = "b65866ea-d18e-4b4d-9ee2-9d5c540dfaf4"


var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'api.airvisual.com',
  'path': `/v2/cities?state=${STATE_NAME}&country=USA&key=${YOUR_API_KEY}`,
  'headers': {
  },
  'maxRedirects': 20
};


function printCities(cities){
    citiesJson = JSON.parse(cities)
    console.log(citiesJson.data[0].city)
}


loadAQI()
//Get Air Quality Index 
function loadAQI(){ 
    let getNearCitiesCall = new Promise ((resolve, reject) => { 

        var req = https.request(options, function(res){
            var chunks = []
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);  
                resolve(body)
            });

            res.on("error", function (error) {
                reject(error)
            });

        },
        (error) => {
            console.log(error)
        })
        req.end();
            
    })
    getNearCitiesCall.then((response) => {
        let Cities = response
        printCities(Cities)
    }).catch((error) =>{
        console.log(error)
    })
    let getNear
}



























// Routing
app.get('/', (req,res) =>{
    res.render("index.html")
})
app.post('/', (req,res)=>{
    cityName = req.body.parms()

})

app.listen(3000)
console.log("http://www.localhost:3000")

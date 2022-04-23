const express = require('express')
const path = require('path')


var app = express()
//app.set('views', path.join(__dirname, 'public/views'))
app.use(express.static(path.join(__dirname,'public/views')))
app.use(express.static(path.join(__dirname,'public/css')))
let CITY_NAME = "Beijing"
let STATE_NAME = "New%20York"
let COUNTRY_NAME = "China"
let YOUR_API_KEY = "f5a0c748-5f7b-4e84-b306-d7648b37560b"


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
        getCitiesData(Cities)
    }).catch((error) =>{
        console.log(error)
    })

}

function getCitiesData(cities){
    citiesJson = JSON.parse(cities)
    console.log(citiesJson)
    cityNames = citiesJson.data
    getData(cityNames[0].city)
}

function getData(city) {
  var options2 = {
    'method': 'GET',
    'hostname': 'api.airvisual.com',
    'path': `/v2/city?city=${city}&state=${STATE_NAME}&country=USA&key=${YOUR_API_KEY}`,
    'headers': {
    },
    'maxRedirects': 20
  };
  let getCityData = new Promise ((resolve, reject) => {

      var req = https.request(options2, function(res){
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
  getCityData.then((response) => {
      let data = response
      printCityData(data)
  }).catch((error) =>{
      console.log(error)
  })
}

function printCityData(data) {
  dataJson = JSON.parse(data)
  weather = dataJson.data.current.pollution
  console.log(weather.aqius)
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

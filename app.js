const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

var app = express()

app.set('views', path.join(__dirname, 'public/views'))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'public/views')))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
    next();
  })
//app.use(express.static(path.join(__dirname,'public/css')))
let CITY_NAME = "Beijing"
let STATE_NAME = "New%20York"
let COUNTRY_NAME = "China"
let YOUR_API_KEY = "b23a158b-58cb-4889-9464-60cc78ce9cdc"
let YOUR_API_KEY_0 = "f5a0c748-5f7b-4e84-b306-d7648b37560b"


var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'api.airvisual.com',
  'path': `/v2/cities?state=${STATE_NAME}&country=USA&key=b23a158b-58cb-4889-9464-60cc78ce9cdc`,
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
    for(let i = 0; i < 10; i++ ) {
      if (i%2 == 0){
        getData(cityNames[i].city, YOUR_API_KEY)
      }
      else {
        getData(cityNames[i].city, YOUR_API_KEY_0)
      }
    }
    console.log(cityNames.length)
}

function getData(city, key) {
  var options2 = {
    'method': 'GET',
    'hostname': 'api.airvisual.com',
    'path': `/v2/city?city=${city}&state=${STATE_NAME}&country=USA&key=${key}`,
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
let citiesList = []

function printCityData(data) {
  dataJson = JSON.parse(data)
  console.log(dataJson)
  cityData = {}
  cityData.coords = dataJson.data.location.coordinates
  cityData.city = dataJson.data.city
  cityData.pollution = dataJson.data.current.pollution.aqius
  citiesList.push(cityData)
  weather = dataJson.data.current.pollution

}

topRanking = []
topRanking[0] = {
    city: "Delhi",
    state: "Delhi",
    country: "India",
    pollution: 228
}
topRanking[1] = {
    city: "Lahore",
    state: "Punjab",
    country: "Pakistan",
    pollution: 167
}
topRanking[2] = {
    city: "Wuhan",
    state: "Hubei",
    country: "China",
    pollution: 161
}





console.log(citiesList)
app.get('/top-polluted' ,(req, res) =>{
    res.render("topPolluted.ejs", {
        name: "Ben",
        cityList: topRanking
    })
})

























// Routing
app.get('/', (req,res) =>{
    res.render("index.ejs")
})
app.get('/top-polluted' ,(req, res) =>{
    res.render("topPolluted.ejs", {
        name: "Ben",
        cityList: topRanking
    })
})
app.get('/form', (req,res) =>{
    res.render("form.ejs",{
        cityList: citiesList,
        name: "ben"
    })
})
app.post('/', (req,res)=>{
    res.send(req.body)
})

app.listen(3000)
console.log("http://www.localhost:3000")

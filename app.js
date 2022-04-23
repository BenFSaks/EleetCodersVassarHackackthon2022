const express = require('express')
const path = require('path')
var app = express()
//app.set('views', path.join(__dirname, 'public/views'))
app.use(express.static(path.join(__dirname,'public/views')))
app.use(express.static(path.join(__dirname,'public/css')))

app.get('/', (req,res) =>{
    res.render("index.html")
})

app.listen(3000)
console.log("http://www.localhost:3000")
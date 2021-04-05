// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/whoami", (req,res) => {

  // JSON OBJECT COLLECTING CLIENT INFO - WHO IS ACCESSING MY API
  let clientInfo = {
    
    // Get IP - allow for proxy
    ipaddress: req.header('x-forwarded-for') || req.connection.remoteAddress,

    language: req.acceptsLanguages(),

    // User Agent we get from headers
    software: req.header('user-agent')
        
  };

  res.json(clientInfo);

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

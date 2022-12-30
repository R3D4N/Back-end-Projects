// index.js
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});


// getting date
app.get("/api/:date", function (req, res) {
    let myDate = req.params.date;
    let formatDate = new Date(myDate);

    // this recognizes when a date is invalid
    if (isNaN(Date.parse(myDate)) && isNaN(Number(myDate))) {
        res.json({ error: 'Invalid Date' });
    } else {
        // this depends of request, if myDate is milliseconds or not
        if (!isNaN(Date.parse(myDate))) {
            formatDate = new Date(myDate)
            res.json({ unix: formatDate.getTime(), utc: formatDate.toUTCString() })
        } else {
            formatDate = new Date(Number(myDate));
            res.json({ unix: Number(myDate), utc: formatDate.toUTCString() })
        }
    }
});

// this happen when date is not given
app.get('/api/', (req, res)=>{
    let timeNow = new Date();
    res.json({unix: timeNow.getTime(), utc: timeNow.toUTCString()})
  })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

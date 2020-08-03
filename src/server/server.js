const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const DIST_DIR = __dirname; // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
const mockResponse = {
    foo: 'bar',
    bar: 'foo'
};
 
app.use(express.static(DIST_DIR)); // NEW

const corsOptions = {
    origin: 'http://google.com',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: false
  }

/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "www.google.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

app.get('/', cors(corsOptions), (req, res) => {
  res.sendFile(HTML_FILE); // EDIT
});

app.get('/api', (req, res) => {
    res.send(mockResponse)
})

app.listen(port, function() {
    console.log(`App listening on port ${port}.`)
})
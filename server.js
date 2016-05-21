/**
 * Created by Prasanth on 12/22/2015.
 */

var express = require('express'),
    app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname });
});

var port = Number(process.env.PORT) || 8080;

var server = app.listen(port);

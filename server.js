var express  = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index  = require("./routes/index");
var tasks = require("./routes/tasks");

var port = 3000;

var app = express();


//List View API 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);


//set Static folder
app.use(express.static(path.join(__dirname,"client")));

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set the url of each page
app.use('/', index);
app.use('/api', tasks);


app.listen(port, function(){

	console.log("Server is on port " + port);
});
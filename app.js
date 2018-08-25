const thorify = require("thorify").thorify;
const Web3 = require("web3");
const web3 = thorify(new Web3(), "https://api.vechain.tools");

var express = require('express');	
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs')


app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/', function(request, response){
    response.sendFile('C:\\Users\\schem\\Desktop\\vechain\\main.html');
});

app.post('/myaction', function(req, res) {
	var address = req.body.name;
	var thor;
	var vet;
	var thorPromise = web3.eth.getEnergy(address);
	var vetPromise = web3.eth.getBalance(address);
	Promise.all([thorPromise,vetPromise]).then(function(allData){
		thor = allData[0].substring(0,allData[0].length-16);
		res.render('index',{first_name: thor, last_name: allData[1]});
	});
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
  console.log('Running at perfect speed');
});
web3.eth.getBlockNumber().then(result => {
    console.log(result)
});


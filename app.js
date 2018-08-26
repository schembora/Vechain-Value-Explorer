const thorify = require("thorify").thorify;
const Web3 = require("web3");
const web3 = thorify(new Web3(), "https://api.vechain.tools");

var express = require('express');	
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

const binance = require('node-binance-api')().options({
	APIKEY: 'KEY',
	APISECRET: 'SECRET',
	useServerTime: true,
	test: false
  });

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
		thor = (parseInt(allData[0].substring(0,allData[0].length-16))/100).toFixed(2);
		vet = (parseInt(allData[1].substring(0,allData[1].length-16))/100).toFixed(2);
		binance.prices('VETUSDT', (error, ticker) => {
			var total = parseFloat(vet) * parseFloat(ticker.VETUSDT);
			res.render('index',{thorValue: thor, vetValue: vet,totalUSD: total});
		  });
	
	});
});

app.listen(8080, function() {
	
});


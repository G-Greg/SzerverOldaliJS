const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('static'));

// Load routing 
require('./route/index')(app);
app.use((err, req, res, next) => {
	console.log(err)
	res.end('hiba')
})

app.listen(3000, function () {
	console.log("Server is running... (port: 3000)");
});

/*
const KocsiModel = require('./models/car')
const MarkaModel = require('./models/marka')

var marka = new MarkaModel()
marka.marka_nev = "BMW"
marka.save(
	function(err)
	{
		if (err){
			console.log(err)
		}
		else{
			console.log("Siker")
		}
	}
)

var kocsi = new KocsiModel()
kocsi.modell = 'M5',
kocsi.meghajtas = 'Benzin',
kocsi.szin = 'Fekete',
kocsi.allapot = 'Új',
kocsi._carfam = marka
kocsi.save(
	function(err)
	{
		if (err){
			console.log(err)
		}
		else{
			console.log("Siker")
		}
	}
)
/**/
var mysql = require('mysql');

var con = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'password',
	database : 'test',
	insecureAuth : true
});
//for now assuming what the user enters is stored in festivalChoice
con.connect(function(err){
	if (err) throw err;
	con.query("SELECT name, duration, difficulty FROM recipeinfo WHERE festival = festivalChoice", function (err, result, fields){
		if(err) throw err;
		console.log(result);
	});
});
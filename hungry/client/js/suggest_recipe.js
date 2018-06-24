var mysql = require('mysql');

var con = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'password',
	database : 'test',
	insecureAuth : true
});
//for now assuming what the user enters is stored in recipeName, recipe
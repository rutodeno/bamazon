// pseudo code 

// 1. display all the items availbale on sale. ids, names and prices
// 2. promp user for 2 messages 
//   a. ask user for id of the product
//   b. how many units 
    // check if there is enough
    // update db with changes
    // if its too less, inform user that we have insufficient quantity

var inquirer = require ("inquirer");
var mysql =  require ("mysql");

var connection = mysql.createConnection ({
    host:"localhost",
    port: "3306",
    user: "root",
    password: "Kipsang1990",
    database: "bamazon"
}); 

connection.connect(function(err){
    if (err) throw err ;

    console.log("Connected");
    connection.end();
})

// pseudo code 

// 1. display all the items availbale on sale. ids, names and prices
// 2. prompt user for 2 messages 
//   a. ask user for id of the product
//   b. how many units 
    // check if there is enough
    // update db with changes
    // if its too less, inform user that we have insufficient quantity
//

var inquirer = require ("inquirer");
var mysql =  require ("mysql");

var connection = mysql.createConnection ({
    host:"localhost",
    port: "3306",
    user: "root",
    password: "**********", // remember password !!
    database: "bamazon"
}); 

connection.connect(function(err){
    if (err) throw err ;

    console.log("Connected");
    displayItem();
    connection.end();
});

function displayItem() {
    var productList = "SELECT item_id, product_name, price FROM products";
    connection.query(productList,function(err,res){
        if (err) throw  err;
        
        console.log("------------Available Products------------------------")
        res.forEach(function(item){
            console.log("   Id: "+item.item_id+ " || "+"    Name: "+item.product_name+" || "+"  Price: "+"$"+item.price);
        })
        console.log("------------------------------------------------------")
    });
};







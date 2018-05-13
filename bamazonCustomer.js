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
    password: "Kipsang1990", // remember password !!
    database: "bamazon"
}); 

connection.connect(function(err){
    if (err) throw err ;

    console.log("Connected");
    displayItem();
});

function displayItem() {
    var productList = "SELECT item_id, product_name, price FROM products";
    connection.query(productList,function(err,res){
        if (err) throw  err;
        
        console.log("------------Available Products------------------------")
        res.forEach(function(item){
            console.log("   Id: "+item.item_id+ " || Name: "+item.product_name+" || Price: "+"$"+item.price);
        })
        console.log("------------------------------------------------------")
        setTimeout(askUser, 1000);
    });
};

function askUser() {
    inquirer
    .prompt ([
        {
            name: "productID",
            type: "input",
            message:"What is the product id of the item you want to buy ?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units of this item would you like to get ?"
        }
    ]).then(function(answer){
        var itemSelect ="SELECT * FROM products WHERE ?";
        connection.query(itemSelect,{item_id:answer.productID}, function(err,data){

            data.forEach(function(item){
                if(item.stock_quantity > answer.quantity ) {
                    
                    console.log("Order processed");
                    console.log("Item Id: "+item.item_id +" || Product Name: "+item.product_name +" || Total Price: $"+answer.quantity*item.price);

                    tableUpdate(item.item_id, (item.stock_quantity - answer.quantity)  ) // update this 

                    connection.end();


                } else {
                    console.log("Sorry, we have insufficient quantity !!. We will be placing an order for more "+item.product_name+"s");
                    
                    //console.log("Please select another item ...")

                    connection.end();
                }
            });

            // updating table 

            function tableUpdate(item, number) {
                var alterTable = "UPDATE products set stock_quantity = ? WHERE item_id = ?";
                connection.query(alterTable, [number, item], function(err, data){

                    if (err) {
                        console.log(err+" Table not updated")
                    }

                });
            };
        });
    });

    //connection.end();

}








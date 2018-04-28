
// total of 4 functions for supervisor
// 1. displayItems(). displays available items
// 2. lowInventory(). Checks for low inventory items in db
// 3. addInventory(). Prompts manager to add more items
// 4. addNewProduct(). Adds new products to db

var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Kipsang1990",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    }

    menuOptions();

});

function menuOptions() { // listing available options
    inquirer
        .prompt([
            {
                name: "bossChoice",
                type: "list",
                message: "Dear supervisor, what would you like to do ?",
                choices: array = [  "a. view products for sale",
                                    "b. view low inventory",
                                    "c. add to inventory",
                                    "d. add a new product",
                                    "e. Exit"                   
                                ]
            }
        ]).then(function (answer) {

            console.log(answer.bossChoice);

            switch (answer.bossChoice) {
                case array[0]:
                    displayItems();
                    break;
                case array[1]:
                    lowInventory();
                    break;
                case array[2]:
                    addInventory();
                    break;
                case array[3]:
                    addNewProduct();
                    break;
                case array[4]:
                    exitMenu();
                    break;
            }
        });
};

function displayItems() {
    var itemList = "SELECT * FROM products";
    connection.query(itemList, function (err, res) {
        if (err) {
            console.log(err);
        }

        var display = new Table;

        res.forEach(function (item) {

            display.cell("Item Id", item.item_id);
            display.cell("Product Name", item.product_name);
            display.cell("Department", item.department_name);
            display.cell("Price", item.price);
            display.cell("Quantity", item.stock_quantity);
            display.newRow();

        });

        console.log("")
        console.log(display.toString());
        console.log("")

        menuOptions();

    });
}

function lowInventory() {

    var lowItems = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5 "
    connection.query(lowItems, function(err,res){
        if (err) throw err ;

        var list  = new Table;

        res.forEach(function (low){
            list.cell("item_id", low.item_id);
            list.cell("Product Name", low.product_name);
            list.cell("Quantity", low.stock_quantity);
            list.newRow();
        });

        console.log("");
        console.log(list.toString());
        console.log("");

        menuOptions();

    })

};

function exitMenu() {

    connection.end();
}



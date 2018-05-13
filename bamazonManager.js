
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
    password: "",
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
                choices: array = ["a. view products for sale",
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
            display.cell("Price ($)", item.price);
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
    connection.query(lowItems, function (err, res) {
        if (err) throw err;

            var list = new Table;

            res.forEach(function (low) {
                list.cell("item_id", low.item_id);
                list.cell("Product Name", low.product_name);
                list.cell("Quantity", low.stock_quantity);
                list.newRow();
            });

            //console.log(res[0].item_id);
            if ( res.length === 0 ) {          
                console.log("");
                console.log("All products have sufficient supply. Check again later")
                console.log("");

            } else {

                console.log("");
                console.log(list.toString());
                console.log("");
            }
        menuOptions();

    })

};

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        var arrayItems = [];
        res.forEach(function (data) {
            arrayItems.push(data.product_name);
        });
        inquirer
            .prompt([
                {
                    name: "addItem",
                    type: "list",
                    message: "Please select from the list  ?",
                    choices: arrayItems
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How much of the item would you like to add ?",
                    validate: function (input) {
                        var done = this.async();

                        setTimeout(function () {
                            if (typeof parseInt(input) != "number") {
                                done("Please provide a number")
                                return;
                            }
                            done(null, true);
                        }, 1000);
                    }
                },


            ]).then(function (answer) {

                var itemNumber = arrayItems.indexOf(answer.addItem) +1 ; // getting our item number from our array.
                var checker = false;
                for (var i = 0; i < res.length; i++) {

                    if (answer.addItem === res[i].product_name) {
                        checker = true;

                    } else {
                        checker = false;
                    }
                }

                if (!checker) {
                    var newQuery = "INSERT INTO products (stock_quantity) ";
                    var addQuery = "UPDATE products set stock_quantity = ? WHERE product_name = ? and item_id = ?";
                    
                    connection.query(addQuery, [parseInt(answer.quantity), answer.addItem, parseInt(itemNumber)], function (err, newRes) {
                    })
                    console.log("Added item to stock");
                } else {
                    console.log("check you input, and try again")
                }

                menuOptions();

            });
    });
}
function addNewProduct() {

    console.log("Sorry, this section is currently being updated. Please check again later");
    console.log("");
    console.log("")

    setTimeout(menuOptions, 2000);

}   
function exitMenu() {

    connection.end();
};



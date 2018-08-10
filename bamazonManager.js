require("dotenv").config();
var mysql = require("mysql");
var inquirer = require('inquirer');




var connection = mysql.createConnection({
    host: process.env.DB_HOST,


    port: process.env.DB_PORT,


    user: process.env.DB_USER,


    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});



connection.connect(function (err) {
    if (err) throw err;
    startManager();
});




// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store



function startManager() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose An Option",
                choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],
                name: "menuOptions"
            },
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.menuOptions === "View Products For Sale") {
                viewProductsForSale();
            } else if (inquirerResponse.menuOptions === "View Low Inventory") {
                viewLowInventory();
            } else if (inquirerResponse.menuOptions === "Add To Inventory") {
                addToInventory();
            } else {
                addNewProduct();
            }

        });
}

function viewProductsForSale(callbackFn) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Display all items...\n");
        // Log all results of the SELECT statement
        for (let i = 0; i < res.length; i++) {
            let item = res[i];
            console.log('__________________________________');
            console.log(`Item id: ${item.id}`);
            console.log(`Product Name: ${item.product_name}`);
            console.log(`Price: ${item.price}`);
            console.log(`Available Quantity: ${item.stock_quantity}`);
            console.log('__________________________________')

        }

        if (callbackFn) {
            callbackFn();
        } else {
            connection.end();
        }
    });


}



function viewLowInventory() {
    connection.query("SELECT * FROM products where stock_quantity < 5;", function (err, res) {
        if (err) throw err;
        console.log("Display all items with less than 5 stock left...\n");
        // Log all results of the SELECT statement
        for (let i = 0; i < res.length; i++) {
            let item = res[i];
            console.log('__________________________________');
            console.log(`Item id: ${item.id}`);
            console.log(`Product Name: ${item.product_name}`);
            console.log(`Price: ${item.price}`);
            console.log(`Available Quantity: ${item.stock_quantity}`);
            console.log('__________________________________')

        }
        connection.end();
    });
}



function addToInventory() {
    viewProductsForSale(function () {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the ID of the product you wish to add more inventory?",
                    name: "addInventoryID"
                },
                {
                    type: "input",
                    message: "What is the quantity you wish to add?",
                    name: "addQuantity"
                },
            ])

            .then(function (inquirerResponse) {
                connection.query("SELECT * FROM products WHERE id =" + inquirerResponse.addInventoryID, function (err, res) {
                    if (err) throw err;
                    let product = res[0];

                    let newQuantity = parseInt(inquirerResponse.addQuantity) + parseInt(product.stock_quantity)

                    console.log("Updating inventory...\n");
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                id: inquirerResponse.addInventoryID
                            }
                        ],
                        function (err, res) {
                            console.log(product.product_name + " " + "New Quantity" + " " + newQuantity);

                            connection.end();

                        });
                });

            });
    });
}



function addNewProduct() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the product you wish to add?",
                name: "addNewItem"
            },
            {
                type: "input",
                message: "What is the name of the department?",
                name: "addNewDepartment"
            },
            {
                type: "input",
                message: "What is the price?",
                name: "addNewPrice"
            },
            {
                type: "input",
                message: "What is the quantity you wish to add?",
                name: "addNewQuantity"
            },
        ])

        .then(function (inquirerResponse) {
            console.log("Inserting a new product...\n");
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: inquirerResponse.addNewItem,
                    department_name: inquirerResponse.addNewDepartment,
                    price: inquirerResponse.addNewPrice,
                    stock_quantity: inquirerResponse.addNewQuantity


                },
                function (err, res) {
                    console.log(inquirerResponse.addNewItem + " " + "Product added\n");
                    connection.end();

                });

        });

}




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
    readItems();
});

function readItems() {
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
        startBamazonPurchase();
    });


}




function startBamazonPurchase() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the ID of the item you wish to purchase?",
                name: "itemID"
            },
            {
                type: "input",
                message: "What is the quantity you would like to purchase?",
                name: "quantity"
            },
        ])


        .then(function (inquirerResponse) {
            connection.query('SELECT * FROM products WHERE ?', { id: inquirerResponse.itemID }, function (err, res) {
                // console.log(res[0]);
                console.log();
                console.log(`Product Requested: ${res[0].product_name}`);
                console.log(`Quantity Requested: ${inquirerResponse.quantity}`);
                console.log(`Checking availability....`, '\n');

                if (parseInt(inquirerResponse.quantity) < parseInt(res[0].stock_quantity)) {
                    //take away quantity from database
                    let newQuantity = (parseInt(res[0].stock_quantity) - parseInt(inquirerResponse.quantity))

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                id: inquirerResponse.itemID
                            },
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(`New Stock Quantity: ${newQuantity}`);

                        });
                    //show total cost of the order
                    cost = (parseInt(inquirerResponse.quantity) * parseInt(res[0].price))
                    console.log('Order Complete');
                    console.log(`Total Cost: $${cost}`, '\n');
                    connection.end();
                } else {
                    console.log("Insufficient quantity!");
                    connection.end();
                }
            });

        });

}









DROP DATABASE IF EXISTS bamazon ;

CREATE DATABASE bamazon;   

USE bamazon;

CREATE TABLE products (
id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10) NOT NULL,
stock_quantity VARCHAR(30) NOT NULL,
PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("puppy food", "pets", 12.00 , 100), ("Computer", "electronics", 1000.00, 2), ("tent", "camping", 300.00, 1 ), ("dog toy", "pets", 3.00, 4 ),("plate", "homegoods", 2.00, 20),("towel", "homegoods", 10.00, 10),("football", "sports", 20.00, 30),("frame", "homegoods", 5.00, 3),("sleeping bag", "capming", 300.00, 2),("leash", "pets", 20.00, 10);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123dandk';
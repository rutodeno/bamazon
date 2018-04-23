DROP DATABASE IF EXISTS bamazon
CREATE DATABASE bamazon;

CREATE TABLE  products(
    item_id INT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INT(100),
    stock_quantity INT(100),
    PRIMARY KEY (item_id)
)
-- Create the categories table
CREATE TABLE category
(
    category_id          SERIAL PRIMARY KEY,
    category_name        VARCHAR(255) NOT NULL,
    category_description TEXT,
    category_image       TEXT,
    parent_category_id   INT,
    FOREIGN KEY (parent_category_id) REFERENCES category (category_id)
);

-- Create the brands table
CREATE TABLE brand
(
    brand_id          SERIAL PRIMARY KEY,
    brand_name        VARCHAR(255) NOT NULL,
    brand_description TEXT
);

-- Create the products table with relationships
CREATE TABLE product
(
    product_id          SERIAL PRIMARY KEY,
    product_name        VARCHAR(255)   NOT NULL,
    product_description TEXT,
    product_price       NUMERIC(10, 2) NOT NULL,
    category_id         INT,
    brand_id            INT,
    FOREIGN KEY (category_id) REFERENCES category (category_id),
    FOREIGN KEY (brand_id) REFERENCES brand (brand_id)
);

-- Insert dummy data into the category table
INSERT INTO category (category_name, category_description, category_image, parent_category_id)
VALUES ('Electronics', 'Devices and gadgets', 'electronics.jpg', NULL),
       ('Home Appliances', 'Appliances for home use', 'home_appliances.jpg', NULL),
       ('Mobile Phones', 'Smartphones and accessories', 'mobile_phones.jpg', 1);

-- Insert dummy data into the brand table
INSERT INTO brand (brand_name, brand_description)
VALUES ('Brand A', 'Description for Brand A'),
       ('Brand B', 'Description for Brand B'),
       ('Brand C', 'Description for Brand C');

-- Insert dummy data into the product table
INSERT INTO product (product_name, product_description, product_price, category_id, brand_id)
VALUES ('Smartphone X', 'Latest model of Smartphone X', 999.99, 3, 1),
       ('Laptop Y', 'High performance Laptop Y', 1299.99, 1, 2),
       ('Washing Machine Z', 'Efficient Washing Machine Z', 499.99, 2, 3);
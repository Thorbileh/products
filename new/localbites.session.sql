-- -- 1. User Table
-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY,
--     user_name VARCHAR(100) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     phone_number VARCHAR(15) NOT NULL UNIQUE
-- );

-- -- 2. Address Table
-- CREATE TABLE address (
--     address_id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
--     street_address VARCHAR(255) NOT NULL,
--     city VARCHAR(100) NOT NULL,
--     postal_code VARCHAR(10) NOT NULL
-- );


-- -- 3. Category Table
-- CREATE TABLE category (
--     category_id SERIAL PRIMARY KEY,
--     category_name VARCHAR(100) NOT NULL
-- );


-- -- 4. Products Table
-- CREATE TABLE product (
--     prod_id SERIAL PRIMARY KEY,
--     prod_name VARCHAR(100) NOT NULL,
--     price FLOAT NOT NULL,           
--     short_description VARCHAR(255), 
--     long_description TEXT,          
--     stock INT NOT NULL,             
--     thumbnail TEXT,                 
--     category_id INT REFERENCES category(category_id) ON DELETE SET NULL
-- );


-- -- 5. Combo-Deal Table
-- CREATE TABLE combo_deal (
--     combo_id SERIAL PRIMARY KEY,
--     combo_name VARCHAR(100) NOT NULL,
--     description TEXT,
--     price FLOAT NOT NULL
-- );


-- -- 6. Orders Table
-- CREATE TABLE orders (
--     order_id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     total_amount FLOAT,
--     address_id INT REFERENCES address(address_id) ON DELETE SET NULL,
--     status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'completed', 'cancelled')),
--     quantity INT DEFAULT 0,
--     price FLOAT DEFAULT 0.0,
--     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
-- );

-- --7. Order Combo Table
-- CREATE TABLE order_combo (
--     id SERIAL PRIMARY KEY,
--     order_id INT NOT NULL,
--     combo_id INT NOT NULL,
--     quantity INT NOT NULL DEFAULT 1,
--     FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
--     FOREIGN KEY (combo_id) REFERENCES combo_deal(combo_id) ON DELETE CASCADE
-- );


-- -- 8. Order-Items Table
-- CREATE TABLE order_items (
--     order_item_id SERIAL PRIMARY KEY,
--     order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
--     prod_id INT REFERENCES products(prod_id) ON DELETE SET NULL,
--     quantity INT NOT NULL,
--     price DECIMAL(10, 2) NOT NULL
-- );


-- -- 9. Cart Table
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    prod_id INT REFERENCES products(prod_id) ON DELETE SET NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL
);


-- -- 10. Payments Table
-- CREATE TABLE payments (
--     payment_id SERIAL PRIMARY KEY,
--     order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
--     payment_method VARCHAR(50) NOT NULL,
--     payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     amount DECIMAL(10, 2) NOT NULL,
--     status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed'))
-- );


-- Drop tables with no dependencies first, or dependent on other tables
-- DROP TABLE IF EXISTS payments;
-- DROP TABLE IF EXISTS order_combo;
-- DROP TABLE IF EXISTS order_items;
-- DROP TABLE IF EXISTS cart;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS combo_deal;
-- DROP TABLE IF EXISTS product;
-- DROP TABLE IF EXISTS category;
-- DROP TABLE IF EXISTS address;
-- DROP TABLE IF EXISTS users;



-- INSERT INTO category (category_name) VALUES
-- ('Sides'),
-- ('Drinks'),
-- ('Kota'),
-- ('Combo'),
-- ('Home Cooked');

-- INSERT INTO product (prod_name, price, short_description, long_description, stock, thumbnail, category_id)
-- VALUES 
-- -- Sides
-- ('Chips', 15.00, 'Crispy fries', 'Freshly fried potato chips, salted to perfection.', 200, '/images/large_chips.jpg', 1),
-- ('Chakalaka', 10.00, 'Spicy relish', 'A traditional spicy vegetable relish.', 150, '/images/chakalaka.jpg', 1),
-- ('Archar', 8.00, 'Tangy delight', 'South African pickled relish.', 150, '/images/archar.jpg', 1),
-- ('Salsa', 12.00, 'Fresh and zesty', 'Tomato and onion salsa, perfect with kota.', 100, '/images/salsa.jpg', 1),
-- ('Coleslaw', 10.00, 'Creamy side', 'Creamy cabbage and carrot coleslaw.', 100, '/images/coleslaw.jpg', 1),
-- ('Russians', 20.00, 'Juicy sausage', 'Grilled sausage, perfect for any meal.', 200, '/images/russians.jpg', 1),
-- ('Ribs', 50.00, 'Tender ribs', 'Slow-cooked and marinated ribs, bursting with flavor.', 100, '/images/ribs.jpg', 1),
-- ('Wings', 25.00, 'Crispy wings', 'Spicy and crispy chicken wings, perfect with a drink.', 150, '/images/wings.jpg', 1),
-- ('Egg', 5.00, 'Soft-boiled egg', 'Perfectly cooked egg to complement your meal.', 300, '/images/egg.jpg', 1);



const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./pool');
const cors = require('cors');


const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Test the database connection
pool.connect((err) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Connected to the database.');
    }
  });

  // Get all products
app.get('/get', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  app.get('/products', async (req, res) => {
    try {
      // Join products with category table using category_id
      const result = await pool.query(`
        SELECT p.prod_id, p.prod_name, p.price, p.short_description, p.thumbnail, c.category_name AS category_name
        FROM products p
        JOIN category c ON p.category_id = c.category_id
      `);
  
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

  // Get product by ID
app.get('/products/:prod_id', async (req, res) => {
    const { prod_id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM products WHERE prod_id = $1', [prod_id]);
      if (result.rows.length === 0) {
        return res.status(404).send('Product not found');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Create a new product
app.post('/products', async (req, res) => {
    const { prod_name, price, short_description, long_description, stock, thumbnail, category_id } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO product (prod_name, price, short_description, long_description, stock, thumbnail, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [prod_name, price, short_description, long_description, stock, thumbnail, category_id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Update product by ID
  app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { prod_name, price, short_description, long_description, stock, thumbnail, category_id } = req.body;
    try {
      const result = await pool.query(
        'UPDATE products SET prod_name = $1, price = $2, short_description = $3, long_description = $4, stock = $5, thumbnail = $6, category_id = $7 WHERE prod_id = $8 RETURNING *',
        [prod_name, price, short_description, long_description, stock, thumbnail, category_id, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send('Product not found');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Delete product by ID
  app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM products WHERE prod_id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).send('Product not found');
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  app.post('/cart', async (req, res) => {
    const { user_id, prod_id, price, quantity } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    if (!user.rowCount) {
      return res.status(401).json({ message: 'User not registered' });
    }
  
    if (!user_id || !prod_id || !price || !quantity) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
     
      const cartCheck = await pool.query(
        'SELECT * FROM cart WHERE user_id = $1 AND prod_id = $2',
        [user_id, prod_id]
      );
  
      if (cartCheck.rows.length > 0) {
       
        const newQuantity = cartCheck.rows[0].quantity + quantity;
        const newTotalPrice = newQuantity * price;
  
        const updateResult = await pool.query(
          `UPDATE cart
           SET quantity = $1, total_price = $2
           WHERE user_id = $3 AND prod_id = $4
           RETURNING *`,
          [newQuantity, newTotalPrice, user_id, prod_id]
        );
  
        return res.status(200).json({
          message: 'Cart updated successfully',
          cart: updateResult.rows[0],
        });
      }
  
    
      const total_price = price * quantity;
      const insertResult = await pool.query(
        `INSERT INTO cart (user_id, prod_id, price, total_price, quantity)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [user_id, prod_id, price, total_price, quantity]
      );
  
      res.status(201).json({
        message: 'Product added to cart',
        cart: insertResult.rows[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database error' });
    }
  });
  app.get('/cart/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const result = await pool.query(`
        SELECT 
          c.cart_id,
          c.quantity,
          p.prod_name AS product_name,
          p.thumbnail AS product_thumbnail,
          c.price,
          c.total_price
        FROM 
          cart c
        JOIN 
          products p ON c.prod_id = p.prod_id
        WHERE 
          c.user_id = $1;
      `, [userId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'No items in the cart for this user.' });
      }
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ message: 'Error fetching cart items.' });
    }
  });
  
  
  app.get('/orders/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const result = await pool.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC`,
        [userId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
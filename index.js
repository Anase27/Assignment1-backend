const express = require("express");
const sql = require('mssql');
const cors = require('cors');
const app = express();

const config = {
    user: 'maqadmin',
    password: '#1Password',
    server: 'sepbootcamp.database.windows.net',
    database: 'Sep2bootcampDB',
    options: {
      encrypt: true, 
      trustServerCertificate: true
    }
};

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    allowedHeaders: '*', 
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true, 
};
app.use(cors(corsOptions));


sql.connect(config, (err) => {
    if (err) console.error('SQL connection error:', err);
});

app.get('/', async (req, res) => {
  try {
    const result = await sql.query('SELECT TOP 20 * FROM  [SalesLT].[Customer]');
    res.send("hello");
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/top-rows', async (req, res) => {
    try {
      const result = await sql.query('SELECT TOP 20 * FROM  [SalesLT].[Customer]');
      res.json(result.recordset);
    } catch (err) {
      console.error('SQL query error:', err);
      res.status(500).send('Internal Server Error');
    }
});

app.get('/api/joins', async (req, res) => {
    try {
      const result = await sql.query('SELECT p.Name,p.Color,p.Size,p.Weight FROM [SalesLT].[Product] p INNER JOIN [SalesLT].[ProductCategory] pc ON p.ProductCategoryID = pc.ProductCategoryID;');
      res.json(result.recordset);
    } catch (err) {
      console.error('SQL query error:', err);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(process.env.PORT || 1337,()=>{
  console.log("listening to 1337");
});
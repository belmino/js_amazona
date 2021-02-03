const express = require("express");
const data =  require("./data.js");
const cors = require('cors');

const app = express(); 

app.use(cors());

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.listen(5000, () => {
    console.log('server at http://localhost:5000');
});
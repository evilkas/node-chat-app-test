const path = require('path');
const express = require('express');

const app = express();
const pathToPublicDir = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(pathToPublicDir));

app.listen(port, () => console.log(`Running on port ${port}`));
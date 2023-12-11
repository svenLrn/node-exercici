
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;


let planets = [
  {
    id: 1,
    name: 'Earth',
  },
  {
    id: 2,
    name: 'Mars',
  },
];


app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send(planets);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  
});

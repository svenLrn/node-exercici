const express = require('express');
const morgan = require('morgan');
const planetsController = require('./planetsController');
const db = require('./db'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));


db.connect();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/planets', planetsController.getAll);
app.get('/planets/:id', planetsController.getOneById);
app.post('/planets', planetsController.create);
app.put('/planets/:id', planetsController.updateById);
app.delete('/planets/:id', planetsController.deleteById);

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

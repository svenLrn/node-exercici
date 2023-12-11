// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const planetsController = require('./planetsController');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send(planetsController.getAll(req, res));
});

app.get('/api/planets', planetsController.getAll);
app.get('/api/planets/:id', planetsController.getOneById);
app.post('/api/planets', planetsController.create);
app.put('/api/planets/:id', planetsController.updateById);
app.delete('/api/planets/:id', planetsController.deleteById);

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

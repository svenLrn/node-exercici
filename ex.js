
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const planetsController = require('./planetsController');
const db = require('./db');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));


db.connect();


const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get('/planets', planetsController.getAll);
app.get('/planets/:id', planetsController.getOneById);
app.post('/planets', planetsController.create);
app.put('/planets/:id', planetsController.updateById);
app.delete('/planets/:id', planetsController.deleteById);

app.get('/planets/:id/image', upload.single('image'), planetsController.uploadImage);
app.post('/planets/:id/image', upload.single('image'), planetsController.uploadImage);


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

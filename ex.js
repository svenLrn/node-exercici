
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const Joi = require('joi');

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

const planetSchema = Joi.object({
  id: Joi.number().integer().min(1),
  name: Joi.string().required(),
});

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send(planets);
});

app.get('/api/planets', (req, res) => {
  res.json(planets);
});

app.get('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);

  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  res.json(planet);
});

app.post('/api/planets', (req, res) => {
  const { error, value } = planetSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newPlanet = {
    id: planets.length + 1,
    name: value.name,
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: 'Planet created successfully' });
});

app.put('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);

  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  const { error, value } = planetSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  planet.name = value.name;
  res.status(200).json({ msg: 'Planet updated successfully' });
});

app.delete('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);
  const index = planets.findIndex((p) => p.id === planetId);

  if (index === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  planets.splice(index, 1);
  res.status(200).json({ msg: 'Planet deleted successfully' });
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

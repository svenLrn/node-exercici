// controllers/planetsController.js

const { Request, Response } = require('express');
const Joi = require('joi');

const planets = [
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

const planetsController = {
  getAll: (req, res) => {
    res.json(planets);
  },

  getOneById: (req, res) => {
    const planetId = parseInt(req.params.id);
    const planet = planets.find((p) => p.id === planetId);

    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    res.json(planet);
  },

  create: (req, res) => {
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
  },

  updateById: (req, res) => {
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
  },

  deleteById: (req, res) => {
    const planetId = parseInt(req.params.id);
    const index = planets.findIndex((p) => p.id === planetId);

    if (index === -1) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    planets.splice(index, 1);
    res.status(200).json({ msg: 'Planet deleted successfully' });
  },
};

module.exports = planetsController;

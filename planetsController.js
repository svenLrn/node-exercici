
const db = require('./db');
const path = require('path');

const planetsController = {
  getAll: async (req, res) => {
    const planets = await db.any('SELECT * FROM planets');
    res.json(planets);
  },

  getOneById: async (req, res) => {
    const planetId = parseInt(req.params.id);
    const planet = await db.one('SELECT * FROM planets WHERE id=$1', planetId);

    res.json(planet);
  },

  create: async (req, res) => {
    const { name } = req.body;
    await db.none('INSERT INTO planets (name) VALUES ($1)', name);

    res.status(201).json({ msg: 'Planet created successfully' });
  },

  updateById: async (req, res) => {
    const planetId = parseInt(req.params.id);
    const { name } = req.body;

    await db.none('UPDATE planets SET name=$1 WHERE id=$2', [name, planetId]);

    res.status(200).json({ msg: 'Planet updated successfully' });
  },

  deleteById: async (req, res) => {
    const planetId = parseInt(req.params.id);
    await db.none('DELETE FROM planets WHERE id=$1', planetId);

    res.status(200).json({ msg: 'Planet deleted successfully' });
  },

  uploadImage: async (req, res) => {
    const planetId = parseInt(req.params.id);

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imagePath = path.join('uploads', req.file.filename);

    try {
      await db.none('UPDATE planets SET image=$1 WHERE id=$2', [imagePath, planetId]);
      res.status(200).json({ msg: 'Planet image updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update planet image' });
    }
  },
};

module.exports = planetsController;

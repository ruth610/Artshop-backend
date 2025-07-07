const artService = require('../services/art.service');

exports.create = async (req, res) => {
  try {
    if (req.file) req.body.imageUrl = `/uploads/${req.file.filename}`;
    const art = await artService.create(req.body);
    res.status(201).json(art);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.findAll = async (_, res) => {
  const arts = await artService.findAll();
  res.json(arts);
};

exports.findOne = async (req, res) => {
  try {
    const art = await artService.findOne(req.params.id);
    res.json(art);
  } catch {
    res.status(404).json({ message: 'Art not found' });
  }
};

exports.update = async (req, res) => {
  try {
    const art = await artService.update(req.params.id, req.body);
    res.json(art);
  } catch {
    res.status(404).json({ message: 'Art not found' });
  }
};

exports.remove = async (req, res) => {
  try {
    await artService.remove(req.params.id);
    res.sendStatus(204);
  } catch {
    res.status(404).json({ message: 'Art not found' });
  }
};

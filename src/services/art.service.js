const Art = require('../models/art.model');

exports.create = async (data) => {
  data.inStock = data.quantity > 0;
  return Art.create(data);
};

exports.findAll = async () => Art.findAll();

exports.findOne = async (id) => {
  const art = await Art.findByPk(id);
  if (!art) throw new Error('Art not found');
  return art;
};

exports.update = async (id, data) => {
  const art = await this.findOne(id);
  Object.assign(art, data);
  art.inStock = art.quantity > 0;
  return art.save();
};

exports.remove = async (id) => {
  const art = await this.findOne(id);
  return art.destroy();
};

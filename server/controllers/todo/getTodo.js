const { todos } = require('../../models');

module.exports = {
  get: async (req, res) => {
    console.log('getTodo;;;;;', req.body.id);
    const result = await todos
      .findAll({ where: { userId: req.body.id } })
      .catch((err) => res.json(err));
    if (!result) return res.status(404).json('not found');
    res.status(200).json(result);
  }
};

const { User } = require('../../models');
const { todos } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const result = await todos
      .findAll({ where: { userId: req.body.id } })
      .catch((err) => res.json(err));
    if (!result) return res.status(404).json('not found');
    res.status(200).json(result);
  },
  post: async (req, res) => {
    const { todo, userId, d_day, isChecked } = req.body;
    if (!todo) {
      return res.sendStatus(400);
    }
    const userInfo = await User.findOne({ where: { userId: userId } }).catch(
      (err) => res.json(err)
    );
    const result = await todos
      .create({
        todo: todo,
        userId: userInfo.id,
        d_day: d_day,
        isChecked: isChecked
      })
      .catch((err) => res.json(err));
    if (!result) return res.status(404).json('not found');
    res.status(200).json({ message: 'created', data: result });
  },

  delete: async (req, res) => {
    const id = req.body.id;
    if (!id) {
      await todos.destroy({ truncate: true }).catch((err) => res.json(err));
      return res.status(204).json({ message: 'deleted all' });
    } else {
      await todos.destroy({ where: { id: id } }).catch((err) => res.json(err));
      return res.status(204).json({ message: 'deleted' });
    }
  },
  update: async (req, res) => {
    const { id, isChecked } = req.body;
    if (!id) {
      return res.sendStatus(400);
    } else {
      await todos
        .update({ isChecked: isChecked }, { where: { id: id } })
        .catch((err) => res.json(err));
      return res.status(200).json({ message: 'update' });
    }
  }
};

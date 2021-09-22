
const { User } = require('../models');
const { todos } = require('../models');

module.exports = {
    get: async(req, res) => {
        const result = await todos.findAll().catch((err) => res.json(err));
        if(!result) return res.status(404).json('not found')
        res.status(200).json(result);
    },
    post: async(req, res) => {
        const todo = req.body.todo;
        const userId = req.body.userId;
        if(!todo) {
          return res.sendStatus(400);
        }
        const userInfo = await User.findOne({where: {userId: userId}}).catch((err) => res.json(err));
        const result = await todos.create({todo: todo, userId: userInfo.id}).catch((err) => res.json(err));
        // const fk = await todos.findOne();
        // console.log((await fk.createUser()).toJSON());
        if(!result) return res.status(404).json('not found')
        res.status(200).json({message: 'created', data: result});

    }
}

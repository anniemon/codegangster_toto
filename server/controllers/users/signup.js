const { User } = require('../../models');

const crypto = require('crypto');

module.exports = async (req, res) => {
  const { userId, password, email } = req.body;

  let inputPassword = password;
  let salt = Math.round(new Date().valueOf() * Math.random()) + '';
  const hashPassword = crypto
    .createHash('sha512')
    .update(inputPassword + salt)
    .digest('hex');
  const checkUser = await User.findOne({ where: { userId } });
  if (checkUser) res.status(403).send({ data: null, message: 'duplicated id' });
  else {
    const createUser = await User.create({
      userId: userId,
      password: hashPassword,
      email: email,
      salt: salt
    }).catch((err) => res.json(err));
    if (createUser)
      res.status(200).json({ data: createUser, message: 'completed sign Up' });
  }
};

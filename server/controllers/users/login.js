const { User } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken
} = require('../tokenFunctions');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const { userId, password } = req.body;
  const checkUser = await User.findOne({ where: { userId } }).catch((err) =>
    res.json({ message: 'not userId' })
  );

  if (!checkUser)
    res.status(401).json({ data: null, message: 'not registered' });
  const hashPassword = crypto
    .createHash('sha512')
    .update(password + checkUser.salt)
    .digest('hex');

  const userInfo = await User.findOne({
    where: { password: hashPassword }
  }).catch((err) => res.json(err));

  if (!userInfo) {
    res.status(401).send({ data: null, message: 'not authorized' });
  } else {
    const { id, userId, email, createdAt, updatedAt } = userInfo;
    const accessToken = generateAccessToken({
      id,
      userId,
      email,
      createdAt,
      updatedAt
    });
    const refreshToken = generateRefreshToken({
      id,
      userId,
      email,
      createdAt,
      updatedAt
    });
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, accessToken);
  }
};

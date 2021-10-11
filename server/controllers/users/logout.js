module.exports = (req, res) => {
  res.status(205).clearCookie('refreshToken').send('Logged out successfully');
};

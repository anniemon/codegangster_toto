module.exports = (req, res) => {
  // console.log('logout!!!!!!!!!!!!!!!!!!');
  res.status(205).clearCookie('refreshToken').send('Logged out successfully');
};

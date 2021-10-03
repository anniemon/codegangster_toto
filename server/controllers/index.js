module.exports = {
  login: require('./users/login'),
  accessTokenRequest: require('./users/accessTokenRequest'),
  refreshTokenRequest: require('./users/refreshTokenRequest'),
  tokenRequest: require('./users/tokenRequest'),
  todo: require('./todo'),
  // getTodo: require('./todo/getTodo'),
  signup: require('./users/signup'),
  logout: require('./users/logout')
};

const { checkRefeshToken, isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    console.log("!!!no token in req.headers['authorization']");
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(403)
        .json("refresh token does not exist, you've never logged in before");
    }

    const refreshTokenData = checkRefeshToken(refreshToken);
    if (!refreshTokenData) {
      return res.json({
        data: null,
        message: 'invalid refresh token, please log in again'
      });
    }
    res.json({ data: { userInfo: refreshTokenData }, message: 'ok' });
  } else {
    console.log('Yes AccessToken');
    return res.json({ data: { userInfo: accessTokenData }, message: 'ok' });
  }
};

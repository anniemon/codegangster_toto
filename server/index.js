require('dotenv').config();
const express = require('express');

const cors = require('cors');
const controllers = require('./controllers');
// const fs = require('fs');
// const https = require('https');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');

const app = express();

//추가
sequelize.sync();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT']
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.get('/accesstokenrequest', controllers.accessTokenRequest);
// app.get('/refreshtokenrequest', controllers.refreshTokenRequest);
app.get('/tokenRequest', controllers.tokenRequest);

app.post('/getTodos', controllers.todo.get);
app.post('/todos', controllers.todo.post);
app.delete('/todos', controllers.todo.delete);
app.put('/todos', controllers.todo.update);

app.post('/signup', controllers.signup);
app.post('/login', controllers.login);
app.get('/logout', controllers.logout);

const HTTPS_PORT = 80;

// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//   const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
//   const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log('server runnning'));
// } else {
app.listen(HTTPS_PORT);
// }

// module.exports = server;

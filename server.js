const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

const sequelize = require('./config/config');  
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const helpers = {
    formatNumber: (number) => number.toLocaleString()
};

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret', 
  cookie: {
    maxAge: 300000,  
    httpOnly: true,  
    secure: false,   
    sameSite: 'strict'  
  },
  resave: false,  
  saveUninitialized: true,  
  store: new SequelizeStore({
    db: sequelize  
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port:', PORT));
});

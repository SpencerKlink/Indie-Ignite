require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

const sequelize = require('./config/config');
const routes = require('./routes');
const profileApi = require('./routes/api/profileApi');
const userRoutes = require('./routes/api/users');

const app = express();
const PORT = process.env.PORT || 3001;

const helpers = {
    formatNumber: (number) => number.toLocaleString(),
    eq: function (a, b) {
        return a === b;
    }
};

const hbs = exphbs.create({
    helpers,
    defaultLayout: 'main',
    partialsDir: ['views/partials/']
});

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
    name: 'my-session-cookie'
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/profile', profileApi);
app.use('/api/users', userRoutes);
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port:', PORT));
});

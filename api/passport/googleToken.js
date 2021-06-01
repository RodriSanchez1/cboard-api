const passport = require('passport');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const config = require('../../config');
const UserController = require('../controllers/user');
const url = require('url');

const GoogleTokenStrategyConfig = {
  clientID: process.env.GOOGLE_APP_ID,//config.google.APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET//config.google.APP_SECRET
};

passport.use(
  new GoogleTokenStrategy(GoogleTokenStrategyConfig, UserController.googleLogin)
);

const configureGoogleTokenStrategy = app => {
  app.get('/login/googletoken',
    passport.authenticate('google-token', { failureRedirect: '/', session: false }),
    (req, res) => {
      //res.redirect('http://10.0.2.2:5554/login/google/callback'); Esta funcion deberia redirigir la app a dicho endpoint con los datos
      res.json(req.user);
      //console.log(req.user);
    });
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, { "id": id });
});

module.exports = {
  configureGoogleTokenStrategy
};
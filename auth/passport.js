const Person = require("../models/person");
const PersonSchema = require("../models/person");
const passport = require("passport");
var LocalStrategy = require("passport-local");
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await PersonSchema.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "INcorrect Username" });
      }
      const passwordMatch = user.password == password ? true : false;
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      } else {
        return done(null, user);
      }
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);
passport.use(passport.initialize());
const localMiddleware = passport.authenticate("local", { session: false });
module.exports = { localMiddleware };

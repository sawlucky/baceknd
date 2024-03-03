var express = require("express");
const session = require("express-session");
var router = express.Router();
const Person = require("../models/person");
const PersonSchema = require("../models/person");
const {
  HandleCreate,
  HnadleDisplay,
  Handlepost,
  Handlework,
  Handleupdates,
} = require("../controllers/connection");

const { HandleItems, DisplayItems } = require("../controllers/items");

const { HandleMongoDB } = require("./users");
HandleMongoDB("mongodb://127.0.0.1:27017/hotels").then(() => {
  console.log("mongodb connected");
});
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// Middleware::
const logrequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`
  );
  next();
};
router.use(logrequest);
//authentication
const passport = require("passport");
var LocalStrategy = require("passport-local");
// router.use(new LocalStrategy(async(username, password, done)))
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
/* GET home page. */
router.get(
  "/",
  passport.authenticate("local", { session: false }),
  function (req, res, next) {
    res.render("index", { title: "Express" });
  }
);
router.get("/display/:workType", Handlework);
router.put("/display/:id", Handleupdates);

router.get("/person", HandleCreate);
router.route("/display").get(HnadleDisplay).post(Handlepost);

router.route("/items").post(HandleItems).get(DisplayItems);

module.exports = router;

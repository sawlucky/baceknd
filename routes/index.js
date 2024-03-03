var express = require("express");
const session = require("express-session");
const passport = require("passport");
var router = express.Router();

const {
  HandleCreate,
  HnadleDisplay,
  Handlepost,
  Handlework,
  Handleupdates,
} = require("../controllers/connection");
const { localMiddleware } = require("../auth/passport");
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

passport.use(passport.initialize());
/* GET home page. */
router.get("/", localMiddleware, function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/display/:workType", Handlework);
router.put("/display/:id", Handleupdates);

router.get("/person", HandleCreate);
router.route("/display").get(localMiddleware, HnadleDisplay).post(Handlepost);

router.route("/items").post(HandleItems).get(DisplayItems);

module.exports = router;

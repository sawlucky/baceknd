var express = require("express");
var router = express.Router();
const Person = require("../models/person");
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
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/display/:workType", Handlework);
router.put("/display/:id", Handleupdates);

router.get("/person", HandleCreate);
router.route("/display").get(HnadleDisplay).post(Handlepost);

router.route("/items").post(HandleItems).get(DisplayItems);

module.exports = router;

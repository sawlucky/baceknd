const PersonSchema = require("../models/person");
const Person = require("../models/person");
const HandleCreate = async (req, res) => {
  const CreateUser = await PersonSchema.create({
    name: "shah lukcy",
    age: 118,
    email: "shah@gmail.com",
    address: "india",
    work: "chef",
  });
  res.send(CreateUser);
};

const HnadleDisplay = async (req, res) => {
  try {
    const DisplayUser = await PersonSchema.find();
    res.send(DisplayUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const Handlepost = async (req, res) => {
  try {
    const value = req.body;
    console.log(value);
    const newperson = new Person(value);
    const response = await newperson.save();
    res.status(200).json(response);
    console.log("data saved in the database");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const Handlework = async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const disp = await PersonSchema.find({ work: workType });
      res.status(200).send(disp);
    } else {
      res.status(400).send({ message: "invalid work type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const Handleupdates = async (req, res) => {
  const getid = req.params.id;
  try {
    // const update = await PersonSchema.findByIdAndUpdate(getid, {
    //   $set: {
    //     work: "waiter",
    //     name: "John Doe",
    //   },
    // });
    // res.send(update);
    const response = req.body;
    const updatetype = await PersonSchema.findByIdAndUpdate(getid, response, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatetype);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server errors" });
  }
};
module.exports = {
  HandleCreate,
  HnadleDisplay,
  Handlepost,
  Handlework,
  Handleupdates,
};

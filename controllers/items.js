const Menu = require("../models/menu");

const HandleItems = async (req, res) => {
  try {
    const value = req.body;
    const menu = new Menu(value);
    const responce = await menu.save();
    res.status(200).json(responce);
    console.log(responce);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
const DisplayItems = async (req, res) => {
  try {
    const items = await Menu.find();
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

module.exports = { HandleItems, DisplayItems };

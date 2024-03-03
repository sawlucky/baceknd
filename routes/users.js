const mongoose = require("mongoose");
const HandleMongoDB = async (url) => {
  return mongoose.connect(url);
};

module.exports = { HandleMongoDB };

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hellogupta2003:MongoDb%402003@cluster0.fiyruuq.mongodb.net/"
  )
  .then(() => console.log("MongoDB Connection successfull"))
  .catch((error) => console.log(`Error occured: ${error}`));

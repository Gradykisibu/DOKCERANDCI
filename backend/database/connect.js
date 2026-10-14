// create a connection to our MongoDB database
const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((err) => {
      console.log("database connection failed. exiting now...");
      console.error(err);
      process.exit(1);
    });
}

module.exports = connect;


// const mongoose = require("mongoose");

// async function connect() {
//   try {
//     await mongoose.connect(process.env.DB_URL);
//     console.log("Successfully connected to MongoDB Atlas");
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//     throw err;
//   }
// }

// module.exports = connect;

// Import Mongoose so we can work with MongoDB
const mongoose = require("mongoose");

// Define the structure of an anime document
const AnimSchema = new mongoose.Schema({

    // The anime's title
    title: {
        type: String,
        required: true,
    },

    // The URL or link to the anime
    link: {
        type: String,
    },

    // A description of the anime
    description: {
        type: String,
    },

});

// Create a model named "Anim" using the schema
const Anim = mongoose.model("Anim", AnimSchema);

// Export the model so other files can use it
module.exports = Anim;

const mongoose = require("mongoose");

const juiceSchema = mongoose.Schema({
    juice_flavor: String,
    juice_brand: String,
    juice_price: {
        type: Number,
        min: [1, "Price must be greater than or equal to 1"], // Adjusted minimum value
        max: [1000, "Price cannot be greater than 1000"] // Adjusted maximum value
    }
});

module.exports = mongoose.model("juice", juiceSchema);

const mongoose = require("mongoose");

const juiceSchema = mongoose.Schema({
    juice_flavor: {
        type: String,
        required: true,
        match: /^[a-zA-Z]+$/
      },
    juice_brand: String,
    juice_price: {
        type: Number,
        min: [1.5, "Price must be greater than or equal to 1"], // Adjusted minimum value
        max: [10, "Price cannot be greater than 1000"] // Adjusted maximum value
    }
});

module.exports = mongoose.model("juice", juiceSchema);

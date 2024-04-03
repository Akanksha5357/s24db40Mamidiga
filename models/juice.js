const mongoose = require("mongoose")
const juiceSchema = mongoose.Schema({
juice_flavor: String,
juice_brand: String,
juice_price: Number
})
module.exports = mongoose.model("juice",
juiceSchema)
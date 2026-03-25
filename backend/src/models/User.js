const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
 email: { type: String, required: true, unique: true },
 senha: { type: String, required: true },
 plano: { type: String, default: "free" }
})

module.exports = mongoose.model("User", userSchema)
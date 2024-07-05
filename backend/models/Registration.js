const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema({
    ordinalAddress: {
        type: String,
        required: true,
        unique: true,
    },
    ethAddress: {
        type: String,
        required: true,
        unique: true,
    },
    btcPaymentAddress: {
        type: String,
        unique: true,
    },
}, autoCreate=  true);

module.exports = mongoose.model("Registration", registrationSchema);

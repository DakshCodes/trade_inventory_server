const mongoose = require("mongoose")

const FinishSchema = mongoose.Schema({
    product_code: {
        type: String,
        required: true,
    },
    hsn_code: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    igst: {
        type: String,
        required: true,
    },
    sgst: {
        type: String,
        required: true,
    },
    cgst: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

},{
    timestamps : true
});

const finishproduct = mongoose.model("finishproducts", FinishSchema);
module.exports = finishproduct;
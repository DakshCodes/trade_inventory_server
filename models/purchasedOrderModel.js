const mongoose = require("mongoose")

const PurchasedSchema = mongoose.Schema({
    order_date: {
        type: String,
        required: true,
    },
    supplier_name: {
        type: String,
        required: true,
    },
    refrence_no: {
        type: String,
        required: true,
    },
    deleveryat: {
        type: String,
        required: true,
    },
    terms_condition: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

}, {
    timestamps : true
});

const purchaseorder = mongoose.model("finishproducts", PurchasedSchema);
module.exports = purchaseorder;
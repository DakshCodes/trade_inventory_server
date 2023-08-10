const mongoose = require("mongoose")

const PurchasedSchema = mongoose.Schema({
    po_no: {
        type: String,
        required: true,
        default: "1",
    },
    order_date: {
        type: String,
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "suppliers", // This refers to the name of the Supplier model
        required: true,
    },
    
    refrence_no: {
        type: String,
        required: true
    },
    deliveryat: {
        type: String,
        required: true
    },
    terms_condition: {
        type: String,
        required: true
    },
    materials: [
        // Assuming you have a Material schema or model defined with fields like: particulars, description_of_material, order_quantity, rate, purchase_value, etc.
        {
            particulars: {
                type: String,
                required: true
            },
            description_of_material: {
                type: String,
                required: true
            },
            order_quantity: {
                type: String,
                required: true
            },
            rate: {
                type: String,
                required: true
            },
            purchase_value: {
                type: String,
                required: true
            }
        }
    ],

    finish_product: [
        {
            finish_particulars: {
                type: String,
                required: true,
            },
            finish_description_of_material: {
                type: String,
                required: true,
            },
            finish_order_quantity: {
                type: String,
                required: true,
            },
            finish_rate: {
                type: String,
                required: true,
            },
            finish_purchase_value: {
                type: String,
                required: true,
            },
            
        },
    ],

    balanced_quantity : {
        type: String,
        required: true,
        default : "1",
    },
    recevied_quantity : {
        type: String,
        required: true,
        default : "0",
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

}, {
    timestamps: true
});

const purchaseorder = mongoose.model("purchaseOrder", PurchasedSchema);
module.exports = purchaseorder;
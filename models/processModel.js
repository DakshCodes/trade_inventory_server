const mongoose = require("mongoose")

const processSchema = mongoose.Schema({

    stage : [

        {
            product_name : {
                type : String,
                required : true,
            },
            materials: [
                // Assuming you have a Material schema or model defined with fields like: particulars, description_of_material, order_quantity, rate, purchase_value, etc.
                {
                    particulars: {
                        type: String,
                        required: true
                    },
                    applied_product_quantity: {
                        type: String,
                        required: true
                    },
                    received_product_quantity: {
                        type: String,
                        required: true
                    },
                    garbage_quantity: {
                        type: String,
                        required: true
                    },
                    
                }
            ],
        }

    ],

    nextStageValues : {
        type : Number,
        required : true,
        default : 0,
    }

    

    
}, {
    timestamps: true
});

const processMaster = mongoose.model("processMaster", processSchema);
module.exports = processMaster;
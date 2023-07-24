const mongoose = require("mongoose")

const supplierSchema = new mongoose.Schema({
    supplier_name : {
        type : String,
        required : true,
        default : "",
    },
  
    supplier_mobile_no : {
        type : String,
        required : true,
        default : "",
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
    },

    supplier_address : {
        type : String,
        required : true,
        default : "",
    },
    supplier_state : {
        type : String,
        required : true,
        default : "",
    },
    supplier_GST : {
        type : String,
        required : true,
        default : "",
    },
   
    contact_person : {
        type : String,
        required : true,
        default : "",
    },
    person_email : {
        type : String,
        required : true,
        default : "",
    },
    person_bank_AC_no : {
        type : String,
        required : true,
        default : "",
    },
    person_bank_name : {
        type : String,
        required : true,
        default : "",
    },

    person_bank_IFSC : {
        type : String,
        required : true,
        default : "",
    },


},{
    timestamps : true
})

const User = mongoose.model("suppliers",supplierSchema);
module.exports = User;
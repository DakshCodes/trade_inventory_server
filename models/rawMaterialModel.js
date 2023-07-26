const mongoose = require("mongoose")

const rawMaterialSchema = mongoose.Schema({
    material_name :{
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
    },
    material_type :{
        type : String,
        required : true,
    },
    material_GST : {
        type : String,
        required : true,
    }
},{
    timestamps : true
});

const rawMaterialModel = mongoose.model("rawMaterial",rawMaterialSchema);
module.exports = rawMaterialModel;
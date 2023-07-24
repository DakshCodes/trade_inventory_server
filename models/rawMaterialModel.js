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
    material_type :{
        type : String,
        required : true,
    },
    material_GST : {
        type : String,
        required : true,
    }
},{
    
});

const rawMaterial = mongoose.model("rawMaterial",rawMaterialSchema);
module.exports = rawMaterial;
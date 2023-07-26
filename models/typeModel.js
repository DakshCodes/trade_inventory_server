const mongoose = require("mongoose")

const TypeSchema = mongoose.Schema({
    type_name :{
        type : String,
        required : true,
    },
    
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
    },
    
},{
    timestamps : true
});

const rawmaterialtype = mongoose.model("rawTypes",TypeSchema);
module.exports = rawmaterialtype;
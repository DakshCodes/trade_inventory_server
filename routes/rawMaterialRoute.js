const router = require('express').Router();
const RawMaterial = require("../models/rawMaterialModel")
const authMiddleware = require("../middlewares/authMiddleware");
const User = require('../models/userModel');



//add a new product

router.post("/add-rawmaterial" , authMiddleware , async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        console.log("-------------------" ,req.body.material_type);
        const newRawMaterial = new RawMaterial({
            ...req.body,
            userId: user._id,
        })
        await newRawMaterial.save();
        res.send({
            success : true,
            message : "Rawmaterial Added Sucessfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

//get all products

router.get("/get-rawmaterial" , authMiddleware , async(req,res)=>{
    try {

        const rawmaterials = await RawMaterial.find().sort({createdAt : -1});
        res.send({
            success : true,
            data : rawmaterials,
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

//delete a supplier

router.delete("/delete-rawmaterial/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await RawMaterial.findByIdAndDelete(req.params.id);
        res.send({
            success : true,
            message : "RawMaterial Deleted successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
})

// edit a supplier

router.put("/edit-rawmaterial/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await RawMaterial.findByIdAndUpdate(req.params.id , req.body);
        res.send({
            success : true,
            message : "RawMaterial Updated successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
});

module.exports = router;
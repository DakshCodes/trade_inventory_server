const router = require('express').Router();
const RawMaterial = require("../models/rawMaterialModel")
const authMiddleware = require("../middlewares/authMiddleware");
const User = require('../models/userModel');



//add a new product

router.post("/add-rawmaterial" , authMiddleware , async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
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
        
    //     const{seller , category = [] , age = {} ,status} = req.body;
    //     let filters = {}
    //     if(seller){
    //         filters.seller = seller;
    //     }

    //     if(status){
    //         filters.status = status;
    //     }

    //     if(category.length > 0){
    //         filters.category = { $in : category};
    //     }

    //     // filter by age 
    //    if(age.length > 0){
    //     age.forEach((item) => {
    //         const fromAge = item.split("-")[0];
    //         const toAge = item.split("-")[1];
    //         filters.age = {$gte : fromAge , $lte : toAge};
    //     });
    //    } 

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
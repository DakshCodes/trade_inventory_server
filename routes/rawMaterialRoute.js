const router = require('express').Router();
const RawMaterial = require("../models/rawMaterialModel")
const authMiddleware = require("../middlewares/authMiddleware");
const User = require('../models/userModel');



//add a new product

router.post("/add-supplier" , authMiddleware , async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        const newRawMaterial = new RawMaterial({
            ...req.body,
            userId: user._id,
        })
        await newRawMaterial.save();
        res.send({
            success : true,
            message : "Supplier Added Sucessfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

//get all products

router.get("/get-supplier" , authMiddleware , async(req,res)=>{
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

        const suppliers = await Supplier.find().sort({createdAt : -1});
        res.send({
            success : true,
            data : suppliers,
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

//delete a supplier

router.delete("/delete-supplier/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await Supplier.findByIdAndDelete(req.params.id);
        res.send({
            success : true,
            message : "Supplier Deleted successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
})

// edit a supplier

router.put("/edit-supplier/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await Supplier.findByIdAndUpdate(req.params.id , req.body);
        res.send({
            success : true,
            message : "Supplier Updated successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
});
module.exports = router;
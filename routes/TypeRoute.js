const router = require('express').Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Type = require('../models/typeModel');
const User = require('../models/userModel');

//add a new product

router.post("/add-materialtype" , authMiddleware , async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        const newType = new Type({
            ...req.body,
            userId: user._id,
        })
        await newType.save();
        res.send({
            success : true,
            message : "Raw material Type Added Sucessfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

//get all products

router.get("/get-materialtype" , authMiddleware , async(req,res)=>{
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

        const Types = await Type.find().sort({createdAt : -1});
        res.send({
            success : true,
            data : Types,
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

//delete a supplier

router.delete("/delete-materialtype/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await Type.findByIdAndDelete(req.params.id);
        res.send({
            success : true,
            message : "Types Deleted successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
})

// edit a supplier

router.put("/edit-materialtype/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await Type.findByIdAndUpdate(req.params.id , req.body);
        res.send({
            success : true,
            message : "Types Updated successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
});

module.exports = router;
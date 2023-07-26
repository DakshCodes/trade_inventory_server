const router = require('express').Router();
const authMiddleware = require("../middlewares/authMiddleware");
const FinishProduct = require('../models/finishModel');
const User = require('../models/userModel');

//add a new product

router.post("/add-finishproduct" , authMiddleware , async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        const newFinishProduct = new FinishProduct({
            ...req.body,
            userId: user._id,
        })
        await newFinishProduct.save();
        res.send({
            success : true,
            message : "Finish Product Added Sucessfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

//get all products

router.get("/get-finishproduct" , authMiddleware , async(req,res)=>{
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

        const FinishProducts = await FinishProduct.find().sort({createdAt : -1});
        res.send({
            success : true,
            data : FinishProducts,
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

//delete a supplier

router.delete("/delete-finishproduct/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await FinishProduct.findByIdAndDelete(req.params.id);
        res.send({
            success : true,
            message : "Finish Product Deleted successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
})

// edit a supplier

router.put("/edit-finishproduct/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await FinishProduct.findByIdAndUpdate(req.params.id , req.body);
        res.send({
            success : true,
            message : "Finish Product Updated successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
});

module.exports = router;
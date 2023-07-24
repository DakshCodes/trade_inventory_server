const router = require('express').Router();
const Firm = require("../models/firmModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig")
const multer = require("multer");
const User = require('../models/userModel');



//add a new product

router.post("/add-firm", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        const newFirm = new Firm({
            ...req.body,
            userId: user._id,
        })
        await newFirm.save();
        res.send({
            success: true,
            message: "Firm Added Sucessfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//get all products

router.get("/get-firm", authMiddleware, async (req, res) => {
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

        const firms = await Firm.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            data: firms,
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//delete a firm

router.delete("/delete-firm/:id", authMiddleware, async (req, res) => {
    try {

        await Firm.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Firm Deleted successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})

// edit a firm

router.put("/edit-firm/:id", authMiddleware, async (req, res) => {
    try {

        await Firm.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "Firm Updated successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Image upload to cloudinary

//according to multer documentation

// using multer : getting image from pc
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
})

//route for upload image
router.put("/upload-header-image", authMiddleware, multer({ storage: storage }).single('file'), async (req, res) => {
    try {
        console.log("inside route")

        // uploading image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "trade",
        });

        const firmId = req.body.firmId;

        await Firm.findByIdAndUpdate(firmId, {
            $push: { header_img: result.secure_url },
        });


        res.send({
            success: true,
            message: "Header Image Uploaded Successfully",
            data: result.secure_url,
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
});

module.exports = router;
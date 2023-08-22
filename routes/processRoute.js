const express = require('express');
const router = express.Router();
const ProcessMaster = require("../models/processModel")
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/userModel');


// Route to add a new purchase order
router.post('/add-product',authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const newPurchase = await ProcessMaster.create({
            ...req.body,
            userId : user._id,
        });
        res.status(201).json({
            success: true,
            message: 'Purchase order added successfully',
            data: newPurchase
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add purchase order', error: error.message });
    }
});

// Route to get all purchase orders
router.get('/get-product', async (req, res) => {
    try {
        const purchases = await ProcessMaster.find();
        res.json({
            success: true,
            data: purchases
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch purchase orders', error: error.message });
    }
});

// // Route to get a specific purchase order by ID
// router.get('/purchases/:purchaseId', async (req, res) => {
//     try {
//         const purchaseId = req.params.purchaseId;
//         const purchase = await Purchase.findById(purchaseId);
//         if (!purchase) {
//             return res.status(404).json({ success: false, message: 'Purchase order not found' });
//         }
//         res.json({ success: true, data: purchase });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to fetch purchase order', error: error.message });
//     }
// });

// Route to update an existing purchase order
router.put('/edit-product/:id', async (req, res) => {
    try {
        const purchaseId = req.params.id;
        const updatedPurchase = await ProcessMaster.findByIdAndUpdate(purchaseId, req.body, { new: true });
        if (!updatedPurchase) {
            return res.status(404).json({ success: false, message: 'Purchase order not found' });
        }
        res.json({ success: true, message: 'Purchase order updated successfully', data: updatedPurchase });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update purchase order', error: error.message });
    }
});


// Route to delete a specific purchase order by ID
router.delete('/delete-product/:id', async (req, res) => {
    try {
        const purchaseId = req.params.id;
        const deletedPurchase = await ProcessMaster.findByIdAndDelete(purchaseId);
        if (!deletedPurchase) {
            return res.status(404).json({ success: false, message: 'Purchase order not found' });
        }
        res.json({ success: true, message: 'Product form this stage deleted successfully', data: deletedPurchase });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete purchase order', error: error.message });
    }
});

module.exports = router;
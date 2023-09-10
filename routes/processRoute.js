const express = require('express');
const router = express.Router();
const ProcessMaster = require("../models/processModel")
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/userModel');


// Route to add a new purchase order
router.post('/add-product', authMiddleware, async (req, res) => {
    try {
        const { product_name, materials } = req.body;

        // Calculate the sum of received product quantities for each material in the current stage
        console.log(req.body)

        const process = new ProcessMaster({
            stage: [
                {
                    product_name,
                    materials,
                },
            ],
             // Use the calculated sum as nextStageValues
        });

        const savedProcess = await process.save();

        res.status(201).json({ success: true, message: "Stage added successfully", process: savedProcess });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    // try {
    //     const user = await User.findById(req.body.userId);
    //     const newPurchase = await ProcessMaster.create({
    //         ...req.body,
    //         userId : user._id,
    //     });
    //     res.status(201).json({
    //         success: true,
    //         message: 'Purchase order added successfully',
    //         data: newPurchase
    //     });
    // } catch (error) {
    //     res.status(500).json({ success: false, message: 'Failed to add purchase order', error: error.message });
    // }
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
        const { materials } = req.body;
        console.log(req.body)

        const updatedPurchase = await ProcessMaster.findByIdAndUpdate(
            purchaseId,
            { $set: { "stage.$[stageElem].materials": materials } }, // Update the materials array within each stage
            { arrayFilters: [{ "stageElem.product_name": { $exists: true } }], new: true }
        );
        console.log('Updated purchase:', purchaseId);
        if (!updatedPurchase) {
            return res.status(404).json({ success: false, message: 'Purchase order not found' });
        }
        res.json({ success: true, message: 'Process details updated successfully', data: updatedPurchase });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update purchase order', error: error.message });
    }
});


// get product by id

router.get("/get-product-by-id/:id" , async(req,res)=>{
    try {
        const product = await ProcessMaster.findById(req.params.id);
        res.send({
            success : true,
            data : product,
        });
        
    } catch (error) {
        res.send({
            success : false,
            message : error.message,
        });
    }
});

router.put('/edit-product-initialised/:processId/:stageIndex', authMiddleware, async (req, res) => {
    try {
      const { product_name, materials } = req.body;
      const processId = req.params.processId;
      const stageIndex = req.params.stageIndex;
      console.log(stageIndex)
  
      // Find the existing process document by its ID
      const process = await ProcessMaster.findById(processId);
  
      if (!process) {
        return res.status(404).json({ success: false, message: "Process not found." });
      }
  
      // Check if the stageIndex is valid
      if (stageIndex < 0 || stageIndex >= process.stage.length) {
        return res.status(400).json({ success: false, message: "Invalid stage index." });
      }
  
      // Update the stage at the specified index
      const updatedStage = {
        product_name,
        materials,
      };
  
      process.stage[stageIndex] = updatedStage;
  
      // Save the updated process
      const savedProcess = await process.save();
  
      res.status(200).json({ success: true, message: "Stage initially Edited  successfully", process: savedProcess });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  

router.put('/edit-product2/:processId', authMiddleware, async (req, res) => {
    try {
        const { product_name, materials } = req.body;
        const processId = req.params.processId;

        console.log(processId)
        // Find the existing process document by its ID
        const process = await ProcessMaster.findById(processId);

        if (!process) {
            return res.status(404).json({ success: false, message: "Process not found." });
        }


        // Add the new stage with the calculated nextStageValues and materials
        process.stage.push({
            product_name,
            materials,
        });

        // Update the process with the new stage
        const savedProcess = await process.save();

        res.status(201).json({ success: true, message: "Stage added successfully", process: savedProcess });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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

// route to edit the status of the code
router.put('/edit-stage-values/:processId', authMiddleware, async (req, res) => {
    try {
        const processId = req.params.processId;
        console.log(processId)
        // Find the existing process document by its ID
         // Find the existing process document by its ID
         const process = await ProcessMaster.findById(processId);

         if (!process) {
             return res.status(404).json({ success: false, message: "Process not found." });
         }
 
         // Increment the nextStageValues field by 1
         process.nextStageValues += 1;
 
         // Save the updated process document
         const updatedProcess = await process.save();
 
         console.log("Updated process:", updatedProcess);

         res.json({ success: true, message: "Transferred to next stage successfully." });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

module.exports = router;
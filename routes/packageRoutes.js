const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Package = require("../models/packageSchema");
console.log("Package model loaded:", Package.modelName);
console.log("Package DB state:", Package.db.readyState);


// =====================================================
// 1. CREATE PACKAGE
// POST /api/packages
// =====================================================
router.post("/", async (req, res) => {
    try {
        const newPackage = await Package.create(req.body);

        res.status(201).json({
            success: true,
            message: "Package created successfully",
            data: newPackage
        });

    } catch (error) {
        console.log("CREATE PACKAGE ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create package",
            error: error.message
        });
    }
});
// =====================================================
// 2. GET ALL PACKAGES
// GET /api/packages
// =====================================================

// GET ALL PACKAGES
// GET /api/packages?page=1&limit=5

router.get("/", async (req, res) => {
    try {

        let { page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;

        const packages = await Package.find({
            isActive: true
        })
        .skip(skip)
        .limit(limit);

        res.status(200).json({
            success: true,
            message: "Packages fetched successfully",
            page: page,
            limit: limit,
            count: packages.length,
            data: packages
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch packages",
            error: error.message
        });

    }
});


// =====================================================
// 3. UPDATE PACKAGE
// PUT /api/packages/:id
// =====================================================

router.put("/:id", async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update package",
      error: error.message
    });
  }
});


// =====================================================
// 4. DELETE PACKAGE
// DELETE /api/packages/:id
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(
      req.params.id
    );

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
      data: deletedPackage
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete package",
      error: error.message
    });
  }
});


module.exports = router;
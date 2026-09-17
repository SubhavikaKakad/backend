const express = require("express");

const router = express.Router();

const {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage
} = require("../controllers/packageController");

const upload = require("../middleware/upload");
const auth = require("../middleware/auth");


// CREATE PACKAGE
router.post(
    "/create-package",
    auth,
    upload.array("images", 12),
    createPackage
);


// GET ALL PACKAGES
router.get(
    "/",
    auth,
    getAllPackages
);


// GET PACKAGE BY ID
router.get(
    "/:id",
    auth,
    getPackageById
);


// UPDATE PACKAGE
router.put(
    "/:id",
    auth,
    upload.array("images", 12),
    updatePackage
);


// DELETE PACKAGE
router.delete(
    "/:id",
    auth,
    deletePackage
);


module.exports = router;
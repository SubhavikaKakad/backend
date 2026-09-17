const Package = require("../models/packageSchema");

// CREATE PACKAGE
const createPackage = async (req, res) => {
    try {
        const {
            title,
            description,
            destination,
            category,
            price,
            duration,
            maxGuests,
            availableSeats,
            inclusions,
            exclusions,
            itinerary,
            isActive
        } = req.body;

        // Generate image URLs
        const generateImageUrls = req.files
            ? req.files.map((file) => {
                  return `${req.protocol}://${req.get("host")}/uploads/packages/${file.filename}`;
              })
            : [];

        // Convert JSON fields
        const parsedDuration =
            typeof duration === "string"
                ? JSON.parse(duration)
                : duration;

        const parsedItinerary =
            typeof itinerary === "string"
                ? JSON.parse(itinerary)
                : itinerary;

        // Create package
        const packageData = new Package({
            title,
            description,
            destination,
            category,
            price,
            duration: parsedDuration,
            maxGuests,
            availableSeats,
            images: generateImageUrls,
            inclusions,
            exclusions,
            itinerary: parsedItinerary,
            isActive
        });

        // Save package
        await packageData.save();

        res.status(201).json({
            message: "Package Created Successfully",
            package: packageData
        });

    } catch (error) {
        console.error("Create Package Error:", error);

        res.status(500).json({
            message: "Error creating package",
            error: error.message
        });
    }
};


// GET ALL PACKAGES
const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find();

        res.status(200).json({
            message: "Packages fetched successfully",
            packages: packages
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching packages",
            error: error.message
        });
    }
};


// GET PACKAGE BY ID
const getPackageById = async (req, res) => {
    try {
        const packageData = await Package.findById(req.params.id);

        if (!packageData) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        res.status(200).json({
            message: "Package fetched successfully",
            package: packageData
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching package",
            error: error.message
        });
    }
};


// UPDATE PACKAGE
const updatePackage = async (req, res) => {
    try {
        const {
            title,
            description,
            destination,
            category,
            price,
            duration,
            maxGuests,
            availableSeats,
            inclusions,
            exclusions,
            itinerary,
            isActive
        } = req.body;

        const updateData = {
            title,
            description,
            destination,
            category,
            price,
            maxGuests,
            availableSeats,
            inclusions,
            exclusions,
            isActive
        };

        if (duration) {
            updateData.duration =
                typeof duration === "string"
                    ? JSON.parse(duration)
                    : duration;
        }

        if (itinerary) {
            updateData.itinerary =
                typeof itinerary === "string"
                    ? JSON.parse(itinerary)
                    : itinerary;
        }

        // If new images are uploaded
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map((file) => {
                return `${req.protocol}://${req.get("host")}/uploads/packages/${file.filename}`;
            });
        }

        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPackage) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        res.status(200).json({
            message: "Package updated successfully",
            package: updatedPackage
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating package",
            error: error.message
        });
    }
};


// DELETE PACKAGE
const deletePackage = async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPackage) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        res.status(200).json({
            message: "Package deleted successfully",
            package: deletedPackage
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting package",
            error: error.message
        });
    }
};


module.exports = {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage
};
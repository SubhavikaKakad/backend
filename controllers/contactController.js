const Contact = require("../models/contactModel");

// CREATE CONTACT
exports.createContact = async (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            message
        } = req.body;

        // Check required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: "Please provide name, email, subject and message"
            });
        }

        // Save contact message in MongoDB
        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            message: "Contact submitted successfully",
            contact
        });

    } catch (error) {
        console.error("Contact Error:", error);

        res.status(500).json({
            message: "Failed to submit contact",
            error: error.message
        });
    }
};


// GET ALL CONTACTS
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Contacts fetched successfully",
            contacts
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch contacts",
            error: error.message
        });
    }
};


// GET CONTACT BY ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json({
            message: "Contact found",
            contact
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch contact",
            error: error.message
        });
    }
};
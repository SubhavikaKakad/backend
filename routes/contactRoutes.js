const express = require("express");

const router = express.Router();

const {
    createContact,
    getAllContacts,
    getContactById
} = require("../controllers/contactController");

// CREATE CONTACT
router.post("/", createContact);

// GET ALL CONTACTS
router.get("/", getAllContacts);

// GET CONTACT BY ID
router.get("/:id", getContactById);

module.exports = router;
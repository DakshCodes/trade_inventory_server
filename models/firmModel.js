const mongoose = require("mongoose")

const firmSchema = new mongoose.Schema({
    firm_name: {
        type: String,
        required: true,
        default: "",
    },
    firm_code: {
        type: String,
        required: true,
        default: "",
    },
    firm_mobile_no: {
        type: String,
        required: true,
        default: "",
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

    firm_address: {
        type: String,
        required: true,
        default: "",
    },
    firm_bank_AC_name: {
        type: String,
        required: true,
        default: "",
    },
    firm_bank_address: {
        type: String,
        required: true,
        default: "",
    },
    contact_person: {
        type: String,
        required: true,
        default: "",
    },

    person_email: {
        type: String,
        required: true,
        default: "",
    },
    person_bank_AC_no: {
        type: String,
        required: true,
        default: "",
    },
    person_bank_name: {
        type: String,
        required: true,
        default: "",
    },
    person_bank_IFSC: {
        type: String,
        required: true,
        default: "",
    },
    footer_img: {
        type: String,
        required: true,
    },
    header_img: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const firms = mongoose.model("firms", firmSchema);
module.exports = firms;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const generate_1 = require("../helper/generate");
const userSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    tokenUser: {
        type: String,
        default: (0, generate_1.generateRandomString)(20)
    },
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ],
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', userSchema, "users");
exports.default = User;

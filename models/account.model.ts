import mongoose from "mongoose";
import {generateRandomString} from "../helper/generate";

const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    token: {
        type: String,
        default: generateRandomString(20)
    },
    avatar: String,
    role_id: String,
    status: String,
    createdBy: {
        account_id: String,
        createdAt:{
            type:Date,
            default: Date.now
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy:{
        account_id:String,
        deletedAt: Date
    },
    updatedBy:[
        {
            account_id: String,
            updatedAt: Date
        }
    ]
},
    {
        timestamps: true
    });

const Account = mongoose.model('Account', accountSchema, "accounts");

export default Account;
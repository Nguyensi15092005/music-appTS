import mongoose from "mongoose";

const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: { //thời gian nó tự đông hết hạng lấy thời gian hiện tại + 10ss
            type: Date,
            expires: 180
        }
    },
    {
        timestamps: true
    });

const ForgotPassword = mongoose.model('ForgetPassword', forgotPasswordSchema, "forgot-password");

export default ForgotPassword
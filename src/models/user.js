import Joi from 'joi';
import mongoose from 'mongoose';
import *  as roleType from './roleType.js';

const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: roleType.USER },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String },
    emailVerificationExpires: { type: Date } 
}, { timestamps: true });

export const User = mongoose.model("user", userSchema);

export const userValidator = (userTovalidate) => {
    let userJoi = Joi.object({
        userName: Joi.string().max(20).required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string()
    }).unknown()
    return userJoi.validate(userTovalidate);
};
export const userValidator2 = (userToValidate) => {
    let userJoi = Joi.object({
        userName: Joi.string().max(20).required(),
        email: Joi.string().required(),
    }).unknown()
    return userJoi.validate(userToValidate);
}
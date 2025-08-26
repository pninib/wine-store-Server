import Joi from "joi";
import mongoose from "mongoose";

const minimalProduct = mongoose.Schema({
    qty: Number,
    productCode: String,
    name: String
})

const orderSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now() },
    toDate: { type: Date, default: Date.now() },
    address: { type: String, required: true },
    orderCode: String,
    product: [minimalProduct],
    isCare: Boolean,
    userName: { type: String, required: true }
})


export const Order = mongoose.model("orders", orderSchema)

export const orderValidator = (orderToValidate) => {
    let orderJoi = Joi.object({
        orderDate: Joi.date(),
        toDate: Joi.date(),
        address: Joi.string(),
        orderCode: Joi.string(),
        product: Joi.array().items(Joi.object({
            qty: Joi.number(),
            productCode: Joi.string(),
            name: Joi.string()
        })),
        isCare: Joi.boolean(),
        userName: Joi.string().required()

    });
    return orderJoi.validate(orderToValidate);
}
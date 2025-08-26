import Joi from "joi";
import mongoose from "mongoose";

const wineSchema = mongoose.Schema({
    name: { type: String, required: true },
    company: String,
    type: { type: String, required: true },
    price: Number,
    imgUrl: String,
    story: String,
    productionDate: { type: Date, default: Date.now() },

});
export const Wine = mongoose.model("wine", wineSchema);

export const wineValidator = (wineToValidate) => {

    const wineJoi = Joi.object({
        name: Joi.string().required(),
        company: Joi.string(),
        type: Joi.string().allow('אדום יבש', 'חצי יבש', 'מבעבע', 'מתוק', 'וודקה', 'וויסקי', 'רוזה', 'קינוח', 'לבן').required(),
        price: Joi.number(),
        productionDate: Joi.date(),
        story: Joi.string(),
    }).unknown();

    return wineJoi.validate(wineToValidate);
}
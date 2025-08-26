import { Wine, wineValidator } from "../models/wine.js";
import mongoose from "mongoose";

export const addwine = async (req, res) => {

    let { name, company, type, price, productionDate, imgUrl, story } = req.body;
    let validate = wineValidator(req.body);
    if (validate.error)
        return res.status(400).send(validate.error[0])


    try {
        let samewines = await Wine.find({ name, type });
        if (samewines.length > 0)
            return res.status(409).send("כבר קיים יין בשם כזה עם אות סוג ")
        let newwine = await Wine.create({ name, type, imgUrl, price, productionDate, company, story })
        return res.status(201).json(newwine)
    }
    catch (err) {
        res.status(400).send(" יין זה אא להוסיף" + err)
    }
}

export const updatewine = async (req, res) => {



    let { wineid } = req.params;
    if (!mongoose.isValidObjectId(wineid))
        return res.status(400).send("not valid id");
    try {


        let wineToUpdate = await Wine.findById(wineid);
        if (!wineToUpdate)
            return res.status(404).send("לא נמצא יין עם קוד כזה")
        wineToUpdate.name = req.body.name || wineToUpdate.name;
        wineToUpdate.company = req.body.company || wineToUpdate.company;
        wineToUpdate.type = req.body.type || wineToUpdate.type;
        wineToUpdate.productionDate = req.body.productionDate || wineToUpdate.productionDate;
        wineToUpdate.price = req.body.price || wineToUpdate.price;
        wineToUpdate.story = req.body.story || wineToUpdate.story;


        await wineToUpdate.save();
        res.json(wineToUpdate);
    } catch (err) {
        res.status(400).send("אא לעדכן" + err)
    }


}

export const deletewine = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id");


    let deletedwine = await Wine.findByIdAndDelete(id)
    if (!deletedwine)
        return res.status(404).send("לא נמצא יין עם כזה קוד למחיקה")
    return res.json(deletedwine);


}
export const getwineById = async (req, res) => {

    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return res.status(400).send("קוד אינו תקין")
        let wine = await Wine.findById(req.params.id)
        if (!wine)
            return res.status(404).send("לא קיים יין עם כזה קוד")
        res.json(wine)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את היין " + err.message)
    }
}
export const getAllwines = async (req, res) => {
    let { search, page, perPage = 5 } = req.query;
    try {
        let serachObject = {};
        if (search)
            serachObject.name = new RegExp(search, "i");
        const totalCount = await Wine.countDocuments(serachObject);
        const allwines = await Wine.find(serachObject)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ "name": 1 });
        res.json({ wines: allwines, totalCount });
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את כל היינות" + err.message)
    }
}

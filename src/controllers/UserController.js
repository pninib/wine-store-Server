import { userValidator, userValidator2 } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from '../config/jwt.js';
import { User } from "../models/user.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

// הוספת משתמש
export const addUser = async (req, res) => {
    const { userName, email, password, role } = req.body;

    const userValidat = userValidator(req.body);
    if (userValidat.error)
        return res.status(400).send("אתה נופל על הכנסת פרטי משתמש לא תקינים: " + userValidat.error.message);

    try {
        let user = await User.findOne({ email });
        if (user)
            return res.status(409).send("כבר קיים משתמש עם כתובת מייל זו");

        const hashedPassword = await bcrypt.hash(password, 10);
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        let newUser = await User.create({ userName, email, password: hashedPassword, role, emailVerificationCode: code, emailVerificationExpires: expires });

        console.log("✅ המשתמש נשמר בהצלחה במסד הנתונים:");
        console.log("role!!", newUser.role);

        console.log("name", newUser.userName, "email:", newUser.email, "role:", newUser.role, "password:", newUser.password);
        console.log("emailVerificationCode:", newUser.emailVerificationCode);
        await sendVerificationEmail(email, code);

        return res.status(201).json({ message: "נשלח קוד אימות למייל. יש לאמת את המייל.", email });
    }
    catch (error) {
        return res.status(500).send("שגיאה בשרת: " + error.message);
    }
}

// התחברות
export const login = async (req, res) => {
    let { userName, email } = req.body;
    let userValidat = userValidator2(req.body);
    if (userValidat.error)
        return res.status(400).send(userValidat.error.message);

    try {
        let user = await User.findOne({ userName, email });
        if (!user)
            return res.status(404).send("לא קיים משתמש עם כזה קוד");
        let token = generateToken(user);
        res.json({ userName: user.userName, email: user.email, token, role: user.role });
        console.log("name:", user.userName);
        console.log("email:", user.email);
        console.log("role:", user.role);
        console.log("token:", token);


    }
    catch (err) {
        res.status(500).send("לא ניתן להתחבר: " + err.message);
    }
}

// שליפת כל המשתמשים
export const getAllUsers = async (req, res) => {
    try {
        let allusers = await User.find({});
        res.json(allusers);
    }
    catch (err) {
        res.status(500).send("לא ניתן לקבל את כל המשתמשים: " + err.message);
    }
}
export const deleteUser = async (req, res) => {
    const { id } = req.params; // This is the MongoDB _id
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser)
            return res.status(404).send("המשתמש לא נמצא");
        return res.json({ message: "המשתמש נמחק בהצלחה" });
    } catch (err) {
        res.status(500).send("לא ניתן למחוק את המשתמש: " + err.message);
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user)
            return res.status(404).send("המשתמש לא נמצא");
        res.json(user);
    } catch (err) {
        res.status(500).send("לא ניתן לקבל את המשתמש: " + err.message);
    }
};

export const getCurrentUser = async (req, res) => {
    try {
         console.log("REQ.USER", req.user);
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send("לא ניתן לקבל את המשתמש הנוכחי: " + err.message);
    }   
};

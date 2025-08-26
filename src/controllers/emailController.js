import { User } from "../models/user.js";

export const verifyEmail = async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).send("משתמש לא נמצא");

        if (user.emailVerified)
            return res.status(400).send("המייל כבר אומת");

        if (
            user.emailVerificationCode !== code ||
            !user.emailVerificationExpires ||
            user.emailVerificationExpires < new Date()
        ) {
            return res.status(400).send("קוד לא תקין או שפג תוקפו");
        }

        user.emailVerified = true;
        user.emailVerificationCode = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.json({ message: "האימייל אומת בהצלחה! אפשר להתחבר." });
    } catch (err) {
        res.status(500).send("שגיאה באימות המייל: " + err.message);
    }
};
import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, code) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "b99524@GMAIL.COM",
            pass: process.env.GMAIL_APP_PASSWORD 
        }
    });

    await transporter.sendMail({
        from: '"Wine Store" <b99524@GMAIL.COM>',
        to,
        subject: "קוד אימות לאתר Wine Store",
        text: `קוד האימות שלך הוא: ${code}`,
        html: `<h2>קוד האימות שלך הוא: <b>${code}</b></h2>`
    });
};
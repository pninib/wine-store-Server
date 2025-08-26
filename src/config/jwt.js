import jwt from "jsonwebtoken";
export const generateToken = (user) => {
    console.log(user._id);
    console.log(user.userName);
    console.log(user.role);
    let token = jwt.sign(
        { _id: user._id, userName: user.userName, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "600m"
        }
    )

    return token;

    }
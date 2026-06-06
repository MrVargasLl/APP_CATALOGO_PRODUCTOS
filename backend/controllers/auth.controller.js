import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { config } from 'dotenv' // para usara variables de entorno
config()


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();

        jwt.sign(
            {
                id: userSaved._id, //Payload
            },
            process.env.SECRET_KEY, //secret key
            {
                expiresIn: "1d", //duración
            },
            (err, token) => {
                if (err) console.log(err);
                res.cookie("token", token);
                res.json({
                    id: userSaved._id,
                    username: userSaved.username,
                    email: userSaved.email,
                    createdAt: userSaved.createdAt,
                    updatedAt: userSaved.updatedAt,
                });
            },

        );



    } catch (error) {
        res.status(500).json({ message: error.message })

    }

    /* res.send("Registrando...."); */
};

export const login = async (req, res) => {

    const { email, password } = req.body
    try {

        const userFound = await User.findOne({email})
        if (!userFound) return res.status(400).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" })

        jwt.sign(
            {
                id: userFound._id, //Payload
            },
            process.env.SECRET_KEY, //secret key
            {
                expiresIn: "1d", //duración
            },
            (err, token) => {
                if (err) console.log(err);
                res.cookie("token", token);
                res.json({
                    id: userFound._id,
                    username: userFound.username,
                    email: userFound.email,
                    createdAt: userFound.createdAt,
                    updatedAt: userFound.updatedAt,

                });
            },

        );
        ////////////////////////

    } catch (error) {       
        res.status(500).json({ message: error.message });
    }


    
};

export const logout = (req, res) => {
    res.cookie( "token", "", {
        expires: new Date(0)
    } )
    return res.sendStatus(200)
}

export const profile = (req, res) => {
    res.send("Bienvenido a tu perfil")
}

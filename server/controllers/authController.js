import User from "../models/userModel.js";

import bcrypt from "bcrypt";


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "all fields required" });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"user already exists"});
        }


        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();

        return res.status(201).json({message:"user created successfully"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req,res) => {

    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"all field required"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"user does not exits"});
        }

        const isMatch = await bcrypt.compare(password,User.password);

        if(!isMatch){
            return res.json({message:"incorrect password"});
        }
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}


const logout = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}


export default {register,login,logout};

import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const generateToken = (userId) => {
    return jwt.sign({id:userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}



export const registerUser = async (req, res) => {
   try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    if(password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(newUser._id);
    res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email, token: token });
   } catch (error) {
    res.status(500).json({ message: 'Internal server error' ,error: error.message});
   }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ message: 'User not found' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(500).json({ message: 'Invalid password' });
        }
        const token = generateToken(user._id);
        res.status(200).json({ id: user._id, name: user.name, email: user.email, token: token });
    }
     catch (error) {
        res.status(500).json({ message: 'Internal server error' ,error: error.message});
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' ,error: error.message});
    }
}

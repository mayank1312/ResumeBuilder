import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
   try{
    let token=req.headers.authorization;
    if(token && token.startsWith('Bearer')){
        token=token.split(' ')[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user=user;
        next();
    }
    else{
        return res.status(401).json({ message: 'Unauthorized' });
    }
   }
   catch(error){
    res.status(401).json({ message: 'Token Failed ' ,error: error.message});
   }
}
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    console.log('token:', token);

    if (!token || token==="") {
        res.status(401).json({ message: 'You must be logged in to access this route'});
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
        if(error) {
            console.error('JWT Error:', error.message);
            res.status(401).json({ message: 'You must be logged in to access this route' });
            return;
        }

        const user = await User.findOne({where: {id: payload.id}});

        if(!user) {
            res.status(401).json({ message: 'You must be logged in to access this route' });
            return;
        }

        req.user = user;
        next();
    


    });
} 

module.exports = {validateToken};
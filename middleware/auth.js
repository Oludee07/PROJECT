const User = require("../models/User");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1]
    

    if (!token || token==="") {
        res.status(401).json({ message: 'login to access this route or Empty token passed'});
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
        if(error) {
            console.error('JWT Error:', error.message);
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        try {
            const user = await User.findOne({where: {id: payload.id}});

        if(!user) {
            res.status(401).json({ message: 'Invalid user' });
            return;
        }

        req.user = user;
        next();
        } catch (dbError) {
            console.error('Database Error:', dbError.message);
            return
            res.status(500).json({ message: 'Internal server error'})
        }
    

        
    


    });
};

module.exports = {validateToken};
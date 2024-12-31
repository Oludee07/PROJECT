const User = require("../models/User");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const token = req.headers['auhtorization'];
    console.log('token:', token);

    if (!token) {
        res.status(401).json({ message: 'You must be logged in to access this route'});
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if(error) {
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
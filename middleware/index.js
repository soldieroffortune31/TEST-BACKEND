const config = require('../config')
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({code : 401, message : "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({code : 400, message : err.message})
  }
}

module.exports = {
    auth
}
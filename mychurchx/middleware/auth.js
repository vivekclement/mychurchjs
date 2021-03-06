const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        
        // const token = req.headers.authorization.split(" ")[1];
        // const decoded = jwt.verify(token, process.env.JWT_KEY);
        // req.userData = decoded;
        // next();
        console.log(req.headers);
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;        
            return next(); // This needs to be here
          }
        
          req.userData = undefined;
          return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed '
        });
    }
};

const jwt = require('jsonwebtoken');
const { REFRESH_TYP } = require('../../infrastructure/security/authTokens');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified.typ === REFRESH_TYP) {
            return res.status(403).json({
                message: 'Wrong token — use POST /api/auth/refresh'
            });
        }
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;

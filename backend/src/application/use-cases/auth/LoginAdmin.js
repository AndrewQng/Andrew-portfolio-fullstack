const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signAccess, signRefresh } = require('../../../infrastructure/security/authTokens');

/** Sign in the single portfolio owner (you). Issues a short-lived access JWT and a refresh token (stored in an httpOnly cookie by the HTTP layer). */
class LoginAdmin {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute({ username, password }) {
        if (!process.env.JWT_SECRET) throw new Error('Server misconfigured');

        const user = await this.userRepository.findByUsername(username);
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const accessToken = signAccess(user.id);
        const refreshToken = signRefresh(user.id);
        const accessDecoded = jwt.decode(accessToken);

        return {
            username: user.username,
            accessToken,
            refreshToken,
            accessExpiresAt: accessDecoded.exp
        };
    }
}

module.exports = LoginAdmin;

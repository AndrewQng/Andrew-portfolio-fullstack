const jwt = require('jsonwebtoken');
const {
    signAccess,
    signRefresh,
    verifyRefresh
} = require('../../../infrastructure/security/authTokens');

class RefreshAccessToken {
    async execute(refreshJwt) {
        if (!refreshJwt) throw new Error('Missing refresh token');

        const { id } = verifyRefresh(refreshJwt);

        const accessToken = signAccess(id);
        const accessDecoded = jwt.decode(accessToken);
        const accessExpiresAt = accessDecoded.exp;

        const rotateRefresh =
            process.env.JWT_REFRESH_ROTATE === '1' ||
            process.env.JWT_REFRESH_ROTATE === 'true';

        if (!rotateRefresh) {
            return {
                accessToken,
                accessExpiresAt,
                refreshJwt: null,
                refreshExpiresAt: null
            };
        }

        const nextRefresh = signRefresh(id);
        const refreshDecoded = jwt.decode(nextRefresh);

        return {
            accessToken,
            accessExpiresAt,
            refreshJwt: nextRefresh,
            refreshExpiresAt: refreshDecoded.exp
        };
    }
}

module.exports = RefreshAccessToken;

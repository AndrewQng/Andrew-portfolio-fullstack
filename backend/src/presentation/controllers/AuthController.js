const jwt = require('jsonwebtoken');
const {
    REFRESH_COOKIE_NAME,
    refreshCookieOptionsWithMaxAge,
    clearanceCookieOptions
} = require('../../infrastructure/security/authTokens');

function allowRefreshTokenBody() {
    return (
        process.env.NODE_ENV !== 'production' ||
        process.env.ALLOW_REFRESH_BODY === '1' ||
        process.env.ALLOW_REFRESH_BODY === 'true'
    );
}

class AuthController {
    constructor({ loginAdmin, refreshAccessToken }) {
        this.loginAdmin = loginAdmin;
        this.refreshAccessToken = refreshAccessToken;
    }

    login = async (req, res) => {
        try {
            const result = await this.loginAdmin.execute(req.body);
            const decodedRefresh = jwt.decode(result.refreshToken);
            const maxAgeMs = Math.max(0, decodedRefresh.exp * 1000 - Date.now());

            res.cookie(
                REFRESH_COOKIE_NAME,
                result.refreshToken,
                refreshCookieOptionsWithMaxAge(maxAgeMs)
            );

            res.json({
                username: result.username,
                token: result.accessToken,
                accessExpiresAt: result.accessExpiresAt
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    };

    refresh = async (req, res) => {
        try {
            const fromCookie = req.cookies[REFRESH_COOKIE_NAME];
            const fromBody =
                allowRefreshTokenBody() && req.body && req.body.refreshToken
                    ? req.body.refreshToken
                    : null;
            const refreshJwt = fromCookie || fromBody;
            if (!refreshJwt) {
                return res.status(401).json({ error: 'Missing refresh token' });
            }

            const out = await this.refreshAccessToken.execute(refreshJwt);

            if (out.refreshJwt) {
                const maxAgeMs = Math.max(
                    0,
                    out.refreshExpiresAt * 1000 - Date.now()
                );
                res.cookie(
                    REFRESH_COOKIE_NAME,
                    out.refreshJwt,
                    refreshCookieOptionsWithMaxAge(maxAgeMs)
                );
            }

            res.json({
                token: out.accessToken,
                accessExpiresAt: out.accessExpiresAt
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    };

    logout = async (_req, res) => {
        res.clearCookie(REFRESH_COOKIE_NAME, clearanceCookieOptions());
        res.status(204).send();
    };
}

module.exports = AuthController;

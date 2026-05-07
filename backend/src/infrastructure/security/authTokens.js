const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const ACCESS_TYP = 'access';
const REFRESH_TYP = 'refresh';

const REFRESH_COOKIE_NAME = process.env.JWT_REFRESH_COOKIE_NAME || 'portfolio_rt';

function accessSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Missing JWT_SECRET');
    return secret;
}

function refreshSecret() {
    if (process.env.JWT_REFRESH_SECRET) return process.env.JWT_REFRESH_SECRET;
    return crypto.createHmac('sha256', accessSecret()).update('jwt-refresh:v1').digest('hex');
}

function signAccess(userId) {
    const expiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
    return jwt.sign({ id: String(userId), typ: ACCESS_TYP }, accessSecret(), { expiresIn });
}

function signRefresh(userId) {
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
    return jwt.sign({ id: String(userId), typ: REFRESH_TYP }, refreshSecret(), { expiresIn });
}

function verifyRefresh(token) {
    const payload = jwt.verify(token, refreshSecret());
    if (payload.typ !== REFRESH_TYP) throw new Error('Invalid refresh token');
    return payload;
}

function refreshCookieBaseOptions() {
    const insecure = process.env.FORCE_INSECURE_COOKIES === '1';
    const isProd = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        path: '/api/auth',
        secure: insecure ? false : isProd,
        sameSite: insecure ? 'lax' : isProd ? 'none' : 'lax'
    };
}

function refreshCookieOptionsWithMaxAge(maxAgeMs) {
    return { ...refreshCookieBaseOptions(), maxAge: Math.max(0, maxAgeMs) };
}

function clearanceCookieOptions() {
    return refreshCookieBaseOptions();
}

module.exports = {
    REFRESH_COOKIE_NAME,
    ACCESS_TYP,
    REFRESH_TYP,
    signAccess,
    signRefresh,
    verifyRefresh,
    refreshCookieOptionsWithMaxAge,
    clearanceCookieOptions
};

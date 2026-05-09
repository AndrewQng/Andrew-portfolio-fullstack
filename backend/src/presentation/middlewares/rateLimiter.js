const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 10, // Giới hạn tối đa 10 lần yêu cầu từ cùng một IP trong windowMs
    message: { error: 'Yêu cầu quá thường xuyên. Vui lòng thử lại sau 15 phút.' },
    standardHeaders: true, // Trả về thông tin RateLimit trong standard headers (RFC 5789)
    legacyHeaders: false, // Tắt X-RateLimit headers cũ
});

module.exports = { authLimiter };

const express = require('express');
if (!process.env.VERCEL) {
    const dns = require('node:dns'); // Thêm thư viện dns tích hợp sẵn của Node.js
    dns.setServers(['1.1.1.1', '8.8.8.8']);
}
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const ensureMongoConnection = require('./presentation/middlewares/ensureMongoConnection');

if (!process.env.VERCEL) {
    require('dotenv').config();
}

function buildCorsOptions() {
    const raw = process.env.FRONTEND_URL;
    const isProd = process.env.NODE_ENV === 'production';

    if (!raw) {
        if (isProd) {
            // Ngăn chặn hoàn toàn bảo mật yếu ở production
            throw new Error('SECURITY ERROR: Missing FRONTEND_URL in production environment!');
        }
        // Ở development, phản chiếu origin động kèm credentials để tiện lợi phát triển
        return { origin: true, credentials: true };
    }
    const origins = raw.split(',').map((s) => s.trim().replace(/\/$/, '')).filter(Boolean);
    return {
        origin: origins.length === 1 ? origins[0] : origins,
        credentials: true
    };
}

function createApp() {
    const app = express();
    app.set('trust proxy', 1);

    // Cấu hình Helmet bảo mật HTTP Headers (XSS, Clickjacking, MIME type sniffing, hide power-by)
    app.use(helmet({
        contentSecurityPolicy: false // Tắt CSP để tránh xung đột với ảnh hoặc CDN bên thứ ba trong API Client độc lập
    }));

    app.use(cors(buildCorsOptions()));
    app.use(cookieParser());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));

    app.get('/api/health', (_req, res) => {
        res.status(200).json({ ok: true });
    });

    app.use(ensureMongoConnection);

    const authRoutes = require('./presentation/routes/authRoutes');
    const adminRoutes = require('./presentation/routes/adminRoutes');
    const projectRoutes = require('./presentation/routes/projectRoutes');
    const skillRoutes = require('./presentation/routes/skillRoutes');
    const certificationRoutes = require('./presentation/routes/certificationRoutes');
    const userRoutes = require('./presentation/routes/userRoutes');

    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/projects', projectRoutes);
    app.use('/api/skills', skillRoutes);
    app.use('/api/certifications', certificationRoutes);
    app.use('/api/users', userRoutes);

    app.use((err, _req, res, _next) => {
        const status = err.statusCode || err.status || 500;
        const message =
            process.env.NODE_ENV === 'production' && status === 500
                ? 'Internal server error'
                : err.message || 'Internal server error';
        if (status >= 500) console.error(err);
        res.status(status).json({ error: message });
    });

    return app;
}

module.exports = { createApp };

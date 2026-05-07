const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ensureMongoConnection = require('./presentation/middlewares/ensureMongoConnection');

if (!process.env.VERCEL) {
    require('dotenv').config();
}

function buildCorsOptions() {
    const raw = process.env.FRONTEND_URL;
    if (!raw) {
        return { origin: true, credentials: false };
    }
    const origins = raw.split(',').map((s) => s.trim()).filter(Boolean);
    return {
        origin: origins.length === 1 ? origins[0] : origins,
        credentials: true
    };
}

function createApp() {
    const app = express();
    app.set('trust proxy', 1);

    app.use(cors(buildCorsOptions()));
    app.use(cookieParser());
    app.use(express.json({ limit: '1mb' }));

    app.get('/api/health', (_req, res) => {
        res.status(200).json({ ok: true });
    });

    app.use(ensureMongoConnection);

    const authRoutes = require('./presentation/routes/authRoutes');
    const adminRoutes = require('./presentation/routes/adminRoutes');
    const projectRoutes = require('./presentation/routes/projectRoutes');
    const skillRoutes = require('./presentation/routes/skillRoutes');
    const certificationRoutes = require('./presentation/routes/certificationRoutes');

    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/projects', projectRoutes);
    app.use('/api/skills', skillRoutes);
    app.use('/api/certifications', certificationRoutes);

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

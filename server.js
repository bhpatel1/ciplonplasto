const express = require('express');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            baseUri: ["'self'"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
            frameAncestors: ["'self'"],
            frameSrc: ["'self'", 'https://www.google.com'],
            imgSrc: ["'self'", 'data:'],
            objectSrc: ["'none'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com']
        }
    }
}));
app.use(express.json());
app.use(express.static(__dirname, {
    dotfiles: 'deny',
    index: 'index.html'
}));

app.get('/api/videos', (req, res) => {
    const videoDir = path.join(__dirname, 'video');
    fs.readdir(videoDir, (err, files) => {
        if (err) {
            console.error('Unable to read video directory:', err);
            return res.status(500).json({ success: false, message: 'Could not read video folder.' });
        }

        const videoFiles = files
            .filter(file => /\.(mp4|webm|ogg)$/i.test(file))
            .map(file => ({
                file,
                title: path.basename(file, path.extname(file)).replace(/[-_]/g, ' ')
            }));

        res.json({ success: true, videos: videoFiles });
    });
});

app.listen(PORT, () => {
    console.log(`Ciplon Plasto Server running at http://localhost:${PORT}`);
});
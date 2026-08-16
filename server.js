const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

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
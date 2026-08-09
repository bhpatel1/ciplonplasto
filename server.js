require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MAIL_SERVICE = process.env.MAIL_SERVICE || 'gmail';
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
const MAIL_TO = process.env.MAIL_TO || MAIL_USER;

if (!MAIL_USER || !MAIL_PASS || !MAIL_TO) {
    console.error('Missing mail configuration. Set MAIL_USER, MAIL_PASS, and MAIL_TO in .env or environment variables.');
}

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
});

app.post('/api/send-quote', async (req, res) => {
    const { name, email, phone, neckSize, message } = req.body;

    if (!name || !email || !phone || !neckSize) {
        return res.status(400).json({ success: false, message: 'Please fill out all required fields.' });
    }

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: MAIL_TO,
        subject: `New PET Preform Inquiry from ${name} - Ciplon Plasto Website`,
        html: `
            <h2>New Inquiry Received on Ciplon Plasto Website</h2>
            <hr>
            <p><strong>Client / Company Name:</strong> ${name}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Required Neck Finish:</strong> ${neckSize}</p>
            <p><strong>Quantity / Special Instructions:</strong></p>
            <p style="background: #f4f4f4; padding: 12px; border-left: 4px solid #00828a;">${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Your inquiry has been sent to Ciplon Plasto!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send inquiry. Please check backend setup.' });
    }
});

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
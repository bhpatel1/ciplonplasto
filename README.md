# Ciplon Plasto Website

Static marketing website for Ciplon Plasto, a PET preform manufacturing company.

## Features

- Fully responsive landing page with hero, product catalog, gallery, specifications, and contact sections
- Carousel gallery displaying all available images from `images/`
- Video playlist that auto-plays videos from the `video/` folder and supports manual `Previous` / `Next` controls
- Contact form with backend email delivery using Node.js, Express, and Nodemailer
- Responsive table and mobile-friendly navigation

## Project Structure

- `index.html` - main website content
- `css/style.css` - styles for layout and responsiveness
- `js/script.js` - carousel, video playlist, and form submission logic
- `server.js` - Express server handling static hosting, form submission, and video listing
- `images/` - image assets used on the site
- `video/` - video assets for the playlist
- `.env.example` - example environment variables for email configuration

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with the following values:
   ```env
   MAIL_SERVICE=gmail
   MAIL_USER=infociplon@gmail.com
   MAIL_PASS=your_gmail_app_password
   MAIL_TO=infociplon@gmail.com
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open the site in your browser:
   ```
   http://localhost:3000
   ```

## Deployment

### Static-only deployment
If you only want the frontend live, deploy the site to a static host such as:
- Netlify
- Vercel
- GitHub Pages

### Full site with contact email
If you want the contact form to send email, use a Node.js host such as:
- Render
- Railway
- Vercel (with serverless functions)
- Heroku

Set the environment variables in the host dashboard to match the `.env` file.

## Notes

- Add any additional video files to `video/` and the playlist will detect them automatically.
- Add extra image assets to `images/` and update `index.html` if needed for custom captions.

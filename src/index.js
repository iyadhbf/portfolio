import nodemailer from 'nodemailer';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// ✅ Serve static files from src/
app.use(express.static(path.join(__dirname)));

// ✅ Route for "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ Optional: /contact
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,  
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

// Email route
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'iyadh1309@gmail.com',
    subject: `Contact Form Submission: ${subject}`,
    html: `<h1>${name} (${email}) says:</h1><p>${message}</p>`
  };
  
  transporter.sendMail(mailOptions)
    .then(() => res.status(200).send({ message: 'Email sent successfully' }))
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: 'Error sending email' });
    });
});

// ✅ Use process.env.PORT for Render deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

import nodemailer from 'nodemailer';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS if your front-end is on a different origin

// Email sending logic
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,  
  auth: {
    user: 'iyadhbelfetni975@gmail.com',
    pass: 'dewa piyw cptb kedj'
  },
});

// Create a POST route to handle the form data
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Compose the email
  const mailOptions = {
    from: email,
    to: 'iyadh1309@gmail.com',
    subject: `Contact Form Submission: ${subject}`,
    html: `<h1>${name} (${email}) says:</h1><p>${message}</p>`
  };

  // Send the email
  transporter.sendMail(mailOptions)
    .then(() => {
      res.status(200).send({ message: 'Email sent successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: 'Error sending email' });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

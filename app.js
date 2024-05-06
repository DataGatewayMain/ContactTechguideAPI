// app.js

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


// Middleware to parse JSON body
app.use(bodyParser.json());

// POST endpoint for handling form submissions
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validation: You might want to add more validation here

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vectoronenine4@gmail.com',
            pass: 'awuo aagx bavf exap'
        }
    });

    // Define email options
    const mailOptions = {
        from: email,
        to: 'vectoronenine4@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };


    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

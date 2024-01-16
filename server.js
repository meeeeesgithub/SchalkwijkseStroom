const express = require('express')
const app = express()
const port = process.env.PORT || 80
const logger = require('morgan')
const NodeMailer = require('nodemailer')
require('dotenv').config()

app.use(logger('dev'))
app.use(express.static('client'))
app.use(express.json())

let transporter = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

app.post('/email', (req, res) => {
    let mailOptions = {
        from: process.env.EMAIL,
        to: 'hansvandijk@affluent.nl',
        subject: 'Bericht van: ' + req.body.naam,
        text: '\n' + req.body.message + '\n\n Bericht verstuurd door: ' + req.body.email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('error in server')
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('email send')
        }
    })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
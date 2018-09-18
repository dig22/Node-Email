'use strict';
const nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors')
var app = express()
app.use(cors())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/send-mail', function (req, res) {

    console.log(req.body);
    let MailName = req.body.MailName || '';
    let Mailfrom = req.body.Mailfrom || '';

    let Mailto = req.body.Mailto || '';
    let subject = req.body.MailSubject || '';
    //let text = req.body.MailText || '';  // use to send plain text
    let html = req.body.MailHtml || '';


    let transporter = nodemailer.createTransport({
        host: 'smtp.yandex.com',  //set stmp server  [smtp.gmail.com,smtp.yahoo.com,...] 
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            //user: '', // stmp account (hardcoded)
            //pass: '', // stmp account (hardcoded)
            user: Mailfrom, // stmp account
            pass: process.env.NoReplyMailPass //  stmp account password (if you have generic password saved as env)
            
        }
    });


    let mailOptions = {
        from: '"' +MailName + '"' + '<'+ Mailfrom +'>', // sender address
        to:  Mailto, // list of receivers
        subject:subject, // Subject line
        // text: text, // plain text body
        html: html // html body
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.json('Failed');
        }
        console.log('Success');
        return res.json('Success');

    });
    
});

/* Set port for express server*/
app.listen(8082, function () {
    console.log('Listening on port lol 8082...'); 
})

//Test Jenkins 2
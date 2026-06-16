
const nodemailer = require("nodemailer");
require('dotenv').config()
//s1-create a transport 
let mail = async (email,username) => {
    let transporter=await nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user:process.env.GMAILUSER,
            pass: process.env.GMAILPASS
        },
    });
    //s2-compose a message
    let message = {
      from: process.env.GMAILUSER, // sender address
      to: email, // list of recipients
      subject: "account creation", // subject line
      //  // plain text body
      html: `<b> "hi,${username} your account is created successfully"</b>`,
    };
    //s3-send a mail
    await transporter.sendMail(message)
    console.log('email sent✅')

}
module.exports=mail
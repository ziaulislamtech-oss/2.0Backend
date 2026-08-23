import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth : {
//         type : 'OAuth2',
//         user : process.env.GOOGLE_USER,
//         clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//         refreshToken : process.env.GOOGLE_REFRESH_TOKEN,
//         clientId : process.env.GOOGLE_CLIENT_ID
//     }
// })

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_USER ,
    pass: process.env.GOOGLE_ACCOUNT_APP_PASS // Yahan 16-digit ka App Password likhen (bina spaces ke bhi likh sakte hain)
  }
});


transporter.verify()
.then(()=>{console.log('Email transporter is ready to send emails')})
.catch((err)=>{console.error("Email transporter verification failed : ",err)})

export async function sendEmail(to,subject,html,text){

    const mailOptions = {
        from : process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }

    await transporter.sendMail(mailOptions);

}
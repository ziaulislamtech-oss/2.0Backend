import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_USER ,
    pass: process.env.GOOGLE_ACCOUNT_APP_PASS // Yahan 16-digit ka App Password likhen (bina spaces ke bhi likh sakte hain)
  },
  connectionTimeout: 10000, // 10s — fail fast instead of hanging on a blocked/slow connection
  greetingTimeout: 10000,
  socketTimeout: 15000
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
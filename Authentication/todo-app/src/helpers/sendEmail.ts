import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async(email:string,token:string)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PSWD
        }
    })
    const resetLink = `http://localhost:3000/auth/reset-password/${token}`
    const mailOptions = {
        from:"bhanuchandar668@gmail.com",
        to:email,
        subject:"Password reset link",
        // text:`Click the following link to reset your password: http://localhost:3000/auth/reset-password/${token}`
        html: `<p>Hello,</p>
        <p>We received a request to reset your password. Click the link below to reset it:</p>
        <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thanks,</p>`
    }
    try{
        await transporter.sendMail(mailOptions)
        // return successMsg(c,"Password reset link sent successfully",200);
    }
    catch(e){
        throw e;
    }
}
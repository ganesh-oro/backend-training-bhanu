import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';
dotenv.config();

const apiInstance:any = new brevo.TransactionalEmailsApi();
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (email: string,token: string) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();
        const resetLink = `http://localhost:3000/auth/reset-password/${token}`;
        sendSmtpEmail.subject = "Password Reset Request";
        sendSmtpEmail.htmlContent = `
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the link below to reset it:</p>
        <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thanks,</p>`;
        sendSmtpEmail.sender = { name: "BHANU CHANDAR", email: "bhanuchandar668@gmail.com" };
        sendSmtpEmail.to = [{ email }];
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        return true;
    } catch (error) {
        throw error;
    }
};

export default sendEmail;

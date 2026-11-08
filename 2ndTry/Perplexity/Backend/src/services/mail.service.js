import { Resend } from 'resend';

// Initialize Resend with your API Key from your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email using the Resend SDK.
 * 
 * NOTE: If you are using Resend's free testing domain, 
 * the 'from' email MUST be 'onboarding@resend.dev' 
 * and the 'to' email must be the email address you signed up to Resend with.
 */
export async function sendEmail(to, subject, html, text) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your custom verified domain later if you get one
      to: to,
      subject: subject,
      html: html,
      text: text, // Resend accepts a plain text fallback alongside HTML
    });

    if (error) {
      console.error("Resend API error details:", error);
      throw new Error(`Resend failed to send email: ${error.message}`);
    }

    console.log("Email sent successfully! ID:", data.id);
    return data;
  } catch (err) {
    console.error("Failed to execute sendEmail:", err);
    throw err;
  }
}

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const nodemailer = require('nodemailer');

// Create Gmail transporter if credentials exist and are valid
const createTransporter = () => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

  console.log('[EmailService] GMAIL_USER:', user);
  console.log('[EmailService] GMAIL_PASS length:', pass ? pass.length : 0);

  if (!user || !pass) {
    console.log('[EmailService] Missing credentials — falling back to simulation');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000
  });
};

/**
 * Send OTP verification email via Gmail API / Nodemailer
 * @param {string} toEmail - Recipient email address
 * @param {string} otpCode - 6-digit OTP code
 * @param {string} [userName] - Optional user full name
 */
const sendOTPEmail = async (toEmail, otpCode, userName = 'Farmer') => {
  const transporter = createTransporter();

  const textContent = `Hello ${userName},\n\nYour KrishiMitra AI Login verification code is: ${otpCode}\n\nThis OTP is valid for 10 minutes. Do not share this code with anyone.\n\n- KrishiMitra AI Team`;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0;">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="display: inline-block; width: 48px; height: 48px; background-color: #10b981; border-radius: 16px; line-height: 48px; color: white; font-size: 24px;">🌱</div>
        <h2 style="color: #0f172a; margin-top: 12px; margin-bottom: 4px; font-size: 22px; font-weight: 800;">KrishiMitra AI</h2>
        <p style="color: #64748b; font-size: 13px; margin: 0;">Smart AI Agriculture & Plant Doctor</p>
      </div>

      <div style="background-color: #ffffff; padding: 24px; border-radius: 16px; border: 1px solid #cbd5e1; text-align: center;">
        <h3 style="color: #1e293b; font-size: 16px; margin-top: 0;">Login Verification OTP</h3>
        <p style="color: #475569; font-size: 13px; line-height: 1.5; margin-bottom: 20px;">
          Hello <strong>${userName}</strong>,<br>
          Use the following 6-digit One-Time Password (OTP) to complete your login or registration on KrishiMitra AI.
        </p>

        <div style="background-color: #ecfdf5; border: 2px dashed #10b981; padding: 14px 28px; border-radius: 12px; display: inline-block; margin-bottom: 20px;">
          <span style="font-family: monospace; font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #047857;">${otpCode}</span>
        </div>

        <p style="color: #94a3b8; font-size: 11px; margin: 0;">
          ⏱️ This OTP is valid for 10 minutes. Do not share this code with anyone.
        </p>
      </div>

      <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 11px;">
        © ${new Date().getFullYear()} KrishiMitra AI. Empowering Indian Agriculture.
      </div>
    </div>
  `;

  if (!transporter) {
    console.log(`\n==================================================`);
    console.log(`[Gmail OTP Service] Real Gmail credentials not configured in server/.env`);
    console.log(`[Simulated Email Sent] To: ${toEmail} | OTP Code: ${otpCode}`);
    console.log(`==================================================\n`);
    return { success: true, simulated: true, otp: otpCode };
  }

  try {
    const info = await transporter.sendMail({
      from: `"KrishiMitra AI Support" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      replyTo: process.env.GMAIL_USER,
      subject: `KrishiMitra AI Verification Code: ${otpCode}`,
      text: textContent,
      html: htmlContent
    });

    console.log(`[Gmail OTP Service] Real Email sent to ${toEmail}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Gmail OTP Service Error] Failed to send email to ${toEmail}:`, error.message);
    console.log(`\n==================================================`);
    console.log(`[Gmail OTP Service Fallback] Real Gmail SMTP failed (${error.message}).`);
    console.log(`[Simulated Email Sent] To: ${toEmail} | OTP Code: ${otpCode}`);
    console.log(`==================================================\n`);
    return { success: true, simulated: true, otp: otpCode };
  }
};

module.exports = { sendOTPEmail };

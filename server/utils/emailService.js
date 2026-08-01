const { Resend } = require('resend');

const sendOTPEmail = async (toEmail, otpCode, userName = 'Farmer') => {
  const apiKey = process.env.RESEND_API_KEY;

  console.log('[EmailService] Sending OTP to:', toEmail);

  if (!apiKey) {
    console.warn('[EmailService] No RESEND_API_KEY — simulation mode');
    return { success: true, simulated: true, otp: otpCode };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'KrishiMitra AI <noreply@krishidhara.co.in>',
      to: toEmail,
      subject: `KrishiMitra AI OTP: ${otpCode}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:16px;border:1px solid #e2e8f0;">
          <div style="text-align:center;margin-bottom:20px;">
            <h2 style="color:#0f172a;font-size:22px;font-weight:800;">🌱 KrishiMitra AI</h2>
            <p style="color:#64748b;font-size:13px;margin:0;">Smart AI Agriculture & Plant Doctor</p>
          </div>
          <div style="background:#fff;padding:24px;border-radius:12px;border:1px solid #cbd5e1;text-align:center;">
            <h3 style="color:#1e293b;">Email Verification OTP</h3>
            <p style="color:#475569;font-size:13px;">Hello <strong>${userName}</strong>, use this OTP to verify your KrishiMitra AI account.</p>
            <div style="background:#ecfdf5;border:2px dashed #10b981;padding:14px 28px;border-radius:12px;display:inline-block;margin:16px 0;">
              <span style="font-family:monospace;font-size:36px;font-weight:900;letter-spacing:10px;color:#047857;">${otpCode}</span>
            </div>
            <p style="color:#94a3b8;font-size:11px;">⏱️ Valid for 10 minutes. Do not share this code.</p>
          </div>
          <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:16px;">© ${new Date().getFullYear()} KrishiMitra AI — krishidhara.co.in</p>
        </div>
      `
    });

    if (error) {
      console.error('[EmailService] Resend error:', error);
      throw new Error(error.message);
    }

    console.log('[EmailService] OTP sent instantly via Resend! ID:', data.id);
    return { success: true, simulated: false, messageId: data.id };
  } catch (err) {
    console.error('[EmailService] Failed:', err.message);
    throw err;
  }
};

module.exports = { sendOTPEmail };

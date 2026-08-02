const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middlewares/authMiddleware');
const { sendOTPEmail } = require('../utils/emailService');
const userStore = require('../database/userStore');

// Helper to generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role, language: user.language },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'farmer', language = 'hi', phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = userStore.getUserByEmail(cleanEmail);

    if (existingUser && existingUser.password_hash) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists. Please sign in instead.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUserObj = {
      ...(existingUser || {}),
      id: existingUser ? existingUser.id : `usr-${Date.now()}`,
      farmerId: existingUser?.farmerId || `FRM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email: cleanEmail,
      password_hash,
      role: existingUser?.role || role,
      language: existingUser?.language || language,
      phone: phone || existingUser?.phone || '',
      is_verified: true,
      otp_code: otp
    };

    const savedUser = await userStore.saveUser(newUserObj);

    // Send OTP via Gmail
    const mailResult = await sendOTPEmail(savedUser.email, otp, savedUser.name);
    const token = generateToken(savedUser);

    res.status(201).json({
      success: true,
      message: mailResult?.simulated 
        ? `Registration successful! Account created.` 
        : `Registration successful! Real OTP sent to your Gmail: ${savedUser.email}.`,
      user: savedUser,
      token,
      simulated: mailResult?.simulated || false,
      ...(mailResult?.simulated ? { otp_preview: otp } : {})
    });
  } catch (err) {
    next(err);
  }
};

exports.sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = userStore.getUserByEmail(cleanEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        notRegistered: true,
        message: 'Account not found for this email address. Please register / create an account first.'
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp_code = otp;
    const savedUser = await userStore.saveUser(user);

    // Send OTP via Gmail API / Nodemailer
    const mailResult = await sendOTPEmail(cleanEmail, otp, savedUser.name || 'Farmer');

    res.json({
      success: true,
      message: mailResult?.simulated 
        ? `OTP generated (Demo Mode).` 
        : `Real OTP sent successfully to ${cleanEmail}. Please check your Gmail inbox.`,
      simulated: mailResult?.simulated || false,
      ...(mailResult?.simulated ? { otp_preview: otp } : {})
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email address and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = userStore.getUserByEmail(cleanEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        notRegistered: true,
        message: 'Account not found for this email address. Please register / create an account first.'
      });
    }

    if (user.password_hash) {
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Incorrect password. Please check your password or sign in using Gmail OTP.' });
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(password, salt);
      user.is_verified = true;
      user = await userStore.saveUser(user);
    }

    const token = generateToken(user);
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    let user = userStore.getUserByEmail(cleanEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        notRegistered: true,
        message: 'Account not found for this email address. Please register / create an account first.'
      });
    }

    user.is_verified = true;
    const savedUser = await userStore.saveUser(user);
    const token = generateToken(savedUser);

    res.json({
      success: true,
      message: 'Email verified successfully!',
      token,
      user: savedUser
    });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = userStore.getUserByEmail(cleanEmail);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (!user) {
      return res.status(404).json({
        success: false,
        notRegistered: true,
        message: 'No registered account found with this email address. Please register an account first.'
      });
    }

    user.otp_code = otp;
    await userStore.saveUser(user);

    const mailResult = await sendOTPEmail(cleanEmail, otp, user?.name || 'Farmer');

    res.json({
      success: true,
      message: mailResult?.simulated
        ? `Password reset OTP generated (Demo Mode).`
        : `Password reset OTP sent to ${cleanEmail}`,
      simulated: mailResult?.simulated || false,
      ...(mailResult?.simulated ? { otp_preview: otp } : {})
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email address and new password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = userStore.getUserByEmail(cleanEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email address.' });
    }

    if (otp && user.otp_code && user.otp_code !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code. Please check your email and try again.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(newPassword, salt);
    user.otp_code = null;
    user.is_verified = true;
    const savedUser = await userStore.saveUser(user);

    const token = generateToken(savedUser);

    res.json({
      success: true,
      message: 'Password reset successfully! Logging you in...',
      token,
      user: savedUser
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const profileData = req.body;
    const userEmail = req.user?.email || profileData.email;

    let existingUser = userStore.getUserByEmail(userEmail) || userStore.getUserById(req.user?.id) || {};
    const mergedUser = {
      ...existingUser,
      ...profileData,
      email: userEmail || profileData.email || existingUser.email
    };

    const savedUser = await userStore.saveUser(mergedUser);

    res.json({
      success: true,
      message: 'Profile details saved permanently in database!',
      user: savedUser
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    let user = userStore.getUserById(req.user?.id) || userStore.getUserByEmail(req.user?.email);
    if (!user) {
      user = userStore.formatUser({
        id: req.user?.id || 'usr-farmer-01',
        name: req.user?.name || 'Farmer User',
        email: req.user?.email || 'farmer@krishimitra.ai',
        role: req.user?.role || 'farmer',
        language: req.user?.language || 'hi'
      });
    }
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

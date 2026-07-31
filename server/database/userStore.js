const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const DB_FILE_PATH = path.join(__dirname, 'users_db.json');

// Default initial demo users
const DEFAULT_USERS = [
  {
    id: 'usr-farmer-01',
    farmerId: 'FRM-2026-1001',
    name: 'Ramesh Patel',
    email: 'farmer@krishimitra.ai',
    phone: '+91 9876543210',
    role: 'farmer',
    language: 'hi',
    gender: 'Male',
    dob: '1985-05-15',
    state: 'Maharashtra',
    district: 'Nashik',
    taluka: 'Niphad',
    village: 'Pimpalgaon',
    pincode: '422209',
    landArea: '4.5',
    landUnit: 'Acres',
    farmPlots: '3',
    soilType: 'Black',
    irrigationSource: ['Well', 'Drip'],
    waterAvailability: 'Medium',
    primaryCrops: 'Tomato, Grapes, Wheat',
    is_verified: true,
    password_hash: '$2a$10$wT8K4S.kXk1Xf8uV2N7x3.S5C6t5V6W7X8Y9Z0a1b2c3d4e5f6'
  },
  {
    id: 'usr-expert-01',
    farmerId: 'EXP-2026-2002',
    name: 'Dr. Anita Sharma',
    email: 'expert@krishimitra.ai',
    phone: '+91 9812345678',
    role: 'expert',
    language: 'en',
    gender: 'Female',
    dob: '1980-08-20',
    state: 'Delhi',
    district: 'New Delhi',
    is_verified: true,
    password_hash: '$2a$10$wT8K4S.kXk1Xf8uV2N7x3.S5C6t5V6W7X8Y9Z0a1b2c3d4e5f6'
  },
  {
    id: 'usr-admin-01',
    farmerId: 'ADM-2026-3003',
    name: 'Admin Officer',
    email: 'admin@krishimitra.ai',
    phone: '+91 9900112233',
    role: 'admin',
    language: 'en',
    gender: 'Male',
    is_verified: true,
    password_hash: '$2a$10$wT8K4S.kXk1Xf8uV2N7x3.S5C6t5V6W7X8Y9Z0a1b2c3d4e5f6'
  }
];

// Helper to load users from JSON file database
const loadUsersFromFile = () => {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const data = fs.readFileSync(DB_FILE_PATH, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('[UserStore] Error loading users from JSON db file:', err.message);
  }
  // Initialize file database if empty
  saveUsersToFile(DEFAULT_USERS);
  return DEFAULT_USERS;
};

// Helper to save users array to JSON file database
const saveUsersToFile = (usersArray) => {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(usersArray, null, 2), 'utf8');
  } catch (err) {
    console.error('[UserStore] Error writing users to JSON db file:', err.message);
  }
};

let usersMemoryStore = loadUsersFromFile();

/**
 * Format complete user profile object with all user fields
 */
const formatUser = (u) => {
  if (!u) return null;
  return {
    id: u.id || `usr-${Date.now()}`,
    farmerId: u.farmerId || `FRM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    name: u.name || '',
    email: u.email ? u.email.toLowerCase() : '',
    phone: u.phone || '',
    role: u.role || 'farmer',
    language: u.language || 'hi',
    gender: u.gender || 'Male',
    dob: u.dob || '',
    state: u.state || '',
    district: u.district || '',
    taluka: u.taluka || '',
    village: u.village || '',
    pincode: u.pincode || '',
    landArea: u.landArea || u.farm_acres || '',
    landUnit: u.landUnit || 'Acres',
    farmPlots: u.farmPlots || '',
    soilType: u.soilType || 'Black',
    irrigationSource: Array.isArray(u.irrigationSource) 
      ? u.irrigationSource 
      : (typeof u.irrigationSource === 'string' ? u.irrigationSource.split(',').map(s => s.trim()) : []),
    waterAvailability: u.waterAvailability || 'Medium',
    primaryCrops: u.primaryCrops || '',
    photo: u.photo || '',
    is_verified: u.is_verified || false,
    otp_code: u.otp_code || null,
    password_hash: u.password_hash || null
  };
};

const getAllUsers = () => {
  return usersMemoryStore.map(formatUser);
};

const getUserByEmail = (email) => {
  if (!email) return null;
  const cleanEmail = email.trim().toLowerCase();
  let found = usersMemoryStore.find(u => u.email && u.email.trim().toLowerCase() === cleanEmail);
  if (!found) {
    // Reload from file to ensure disk persistence sync
    usersMemoryStore = loadUsersFromFile();
    found = usersMemoryStore.find(u => u.email && u.email.trim().toLowerCase() === cleanEmail);
  }
  return found ? formatUser(found) : null;
};

const getUserById = (id) => {
  if (!id) return null;
  let found = usersMemoryStore.find(u => u.id === id);
  if (!found) {
    usersMemoryStore = loadUsersFromFile();
    found = usersMemoryStore.find(u => u.id === id);
  }
  return found ? formatUser(found) : null;
};

/**
 * Save or update full user profile in JSON file database and MySQL database
 */
const saveUser = async (userObj) => {
  if (!userObj || !userObj.email) return null;

  const formatted = formatUser(userObj);
  const emailLower = formatted.email.toLowerCase();

  const index = usersMemoryStore.findIndex(u => u.email && u.email.toLowerCase() === emailLower);

  if (index !== -1) {
    // Merge existing details with updated profile details
    usersMemoryStore[index] = {
      ...usersMemoryStore[index],
      ...formatted,
      password_hash: formatted.password_hash || usersMemoryStore[index].password_hash,
      otp_code: formatted.otp_code || usersMemoryStore[index].otp_code
    };
  } else {
    usersMemoryStore.push(formatted);
  }

  // Persist to JSON file database on disk
  saveUsersToFile(usersMemoryStore);

  // Sync to MySQL database if connected
  await saveUserToMySQL(formatted);

  return getUserByEmail(emailLower);
};

/**
 * Save / Upsert single user profile into MySQL Workbench database
 */
const saveUserToMySQL = async (userObj) => {
  if (!userObj || !userObj.email || !db.isDbConnected()) return;
  try {
    const formatted = formatUser(userObj);
    const emailLower = formatted.email.toLowerCase();

    // 1. Ensure MySQL tables exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password_hash VARCHAR(255),
        role VARCHAR(20) DEFAULT 'farmer',
        language VARCHAR(10) DEFAULT 'hi',
        is_verified TINYINT(1) DEFAULT 0,
        photo LONGTEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    try {
      await db.query(`ALTER TABLE users ADD COLUMN photo LONGTEXT`);
    } catch (e) {
      // Column already exists or table setup complete
    }

    await db.query(`
      CREATE TABLE IF NOT EXISTS farmers (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) UNIQUE,
        farm_size_acres DECIMAL(10, 2),
        primary_crops TEXT,
        soil_type VARCHAR(50),
        district VARCHAR(100),
        state VARCHAR(100),
        pincode VARCHAR(10),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const passHash = formatted.password_hash || '$2a$10$wT8K4S.kXk1Xf8uV2N7x3.S5C6t5V6W7X8Y9Z0a1b2c3d4e5f6';

    // 2. Upsert into MySQL users table (including profile photo)
    await db.query(
      `INSERT INTO users (id, name, email, phone, password_hash, role, language, is_verified, photo) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE name=?, phone=?, language=?, is_verified=?, photo=?`,
      [formatted.id, formatted.name, emailLower, formatted.phone, passHash, formatted.role, formatted.language, formatted.is_verified ? 1 : 0, formatted.photo || '',
       formatted.name, formatted.phone, formatted.language, formatted.is_verified ? 1 : 0, formatted.photo || '']
    );

    // 3. Upsert into MySQL farmers table
    const farmerRowId = `frm-${formatted.id}`;
    const acres = parseFloat(formatted.landArea) || parseFloat(formatted.farm_acres) || 0;
    const cropsStr = formatted.primaryCrops || '';
    const soil = formatted.soilType || 'Black';
    const dist = formatted.district || '';
    const st = formatted.state || '';
    const pin = formatted.pincode || '';

    await db.query(
      `INSERT INTO farmers (id, user_id, farm_size_acres, primary_crops, soil_type, district, state, pincode) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE farm_size_acres=?, primary_crops=?, soil_type=?, district=?, state=?, pincode=?`,
      [farmerRowId, formatted.id, acres, cropsStr, soil, dist, st, pin,
       acres, cropsStr, soil, dist, st, pin]
    );

    console.log(`[MySQL Database] Synced farmer record for ${emailLower} in MySQL 'farmers' table.`);
  } catch (mysqlErr) {
    console.error('[MySQL Database Error] Failed to save farmer record:', mysqlErr.message);
  }
};

/**
 * Startup sync to mirror all user profiles to MySQL
 */
const syncAllUsersToMySQL = async () => {
  if (!db.isDbConnected()) return;
  try {
    for (const u of usersMemoryStore) {
      await saveUserToMySQL(u);
    }
  } catch (err) {
    console.error('[MySQL Sync Startup Error]:', err.message);
  }
};

setTimeout(syncAllUsersToMySQL, 1500);

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  saveUser,
  saveUserToMySQL,
  formatUser,
  usersMemoryStore
};

-- KrishiMitra AI Database Schema (MySQL Workbench Compatible)
-- Run this file in MySQL Workbench to set up the database

CREATE DATABASE IF NOT EXISTS krishimitra;
USE krishimitra;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('farmer', 'expert', 'admin') DEFAULT 'farmer',
    language ENUM('en', 'hi', 'mr') DEFAULT 'hi',
    profile_pic VARCHAR(255),
    is_verified TINYINT(1) DEFAULT 0,
    otp_code VARCHAR(6),
    otp_expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. FARMERS PROFILE TABLE
CREATE TABLE IF NOT EXISTS farmers (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) UNIQUE,
    farm_size_acres DECIMAL(10, 2),
    primary_crops TEXT,
    soil_type VARCHAR(50),
    district VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. EXPERTS PROFILE TABLE
CREATE TABLE IF NOT EXISTS experts (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) UNIQUE,
    qualification VARCHAR(150) NOT NULL,
    specialization TEXT,
    organization VARCHAR(150),
    experience_years INT DEFAULT 0,
    license_number VARCHAR(100),
    rating DECIMAL(3, 2) DEFAULT 5.0,
    consultation_count INT DEFAULT 0,
    is_available TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. DISEASES KNOWLEDGE BASE TABLE
CREATE TABLE IF NOT EXISTS diseases (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    crop_name VARCHAR(100) NOT NULL,
    disease_name VARCHAR(150) NOT NULL,
    scientific_name VARCHAR(150),
    affected_part ENUM('Leaf', 'Fruit', 'Stem', 'Flower', 'Whole Plant'),
    symptoms TEXT NOT NULL,
    causes TEXT NOT NULL,
    organic_treatment TEXT NOT NULL,
    chemical_treatment TEXT NOT NULL,
    medicines_recommended TEXT,
    preventive_measures TEXT,
    avg_recovery_days INT DEFAULT 14,
    severity_level ENUM('Low', 'Moderate', 'High', 'Critical') DEFAULT 'Moderate',
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. PREDICTIONS (DIAGNOSES) TABLE
CREATE TABLE IF NOT EXISTS predictions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    farmer_id VARCHAR(36),
    disease_id VARCHAR(36),
    image_url VARCHAR(255) NOT NULL,
    plant_part VARCHAR(50) DEFAULT 'Leaf',
    crop_name VARCHAR(100),
    detected_disease VARCHAR(150) NOT NULL,
    confidence_score DECIMAL(5, 2) NOT NULL,
    severity VARCHAR(20) DEFAULT 'Moderate',
    voice_note_transcript TEXT,
    voice_language VARCHAR(10) DEFAULT 'hi',
    expert_verified TINYINT(1) DEFAULT 0,
    expert_notes TEXT,
    verified_by_expert_id VARCHAR(36),
    recovery_status ENUM('Detected', 'In Treatment', 'Recovered', 'Crop Lost') DEFAULT 'In Treatment',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE SET NULL
);

-- 6. MEDICINES TABLE
CREATE TABLE IF NOT EXISTS medicines (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    brand_name VARCHAR(150) NOT NULL,
    chemical_composition VARCHAR(200) NOT NULL,
    target_diseases TEXT NOT NULL,
    dosage_instructions TEXT NOT NULL,
    application_method VARCHAR(100),
    safety_precautions TEXT,
    government_approved TINYINT(1) DEFAULT 1,
    price_estimate VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. CHATS TABLE
CREATE TABLE IF NOT EXISTS chats (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    farmer_id VARCHAR(36),
    prediction_id VARCHAR(36),
    sender_type ENUM('farmer', 'ai', 'expert') DEFAULT 'farmer',
    message TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    audio_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (prediction_id) REFERENCES predictions(id) ON DELETE SET NULL
);

-- 8. WEATHER LOGS TABLE
CREATE TABLE IF NOT EXISTS weather_logs (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    temperature DECIMAL(4, 1),
    humidity INT,
    wind_speed DECIMAL(4, 1),
    rainfall_probability INT,
    disease_risk_level VARCHAR(20) DEFAULT 'Low',
    risk_notes TEXT,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 9. GOVERNMENT SCHEMES TABLE
CREATE TABLE IF NOT EXISTS government_schemes (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    scheme_name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    applicable_state VARCHAR(100) DEFAULT 'All India',
    target_crop VARCHAR(100) DEFAULT 'All Crops',
    description TEXT NOT NULL,
    benefits TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    application_url VARCHAR(255),
    helpline_number VARCHAR(50),
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36),
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('Medicine Reminder', 'Water Reminder', 'Weather Alert', 'Disease Alert', 'Scheme Alert'),
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 11. SYSTEM AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS system_logs (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36),
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- -----------------------------------------------
-- SEED DATA
-- -----------------------------------------------

INSERT INTO users (id, name, email, phone, password_hash, role, language, is_verified) VALUES
('usr-farmer-01', 'Ramesh Patel',  'farmer@krishimitra.ai', '+91 9876543210', '$2a$10$wT8K4S.kXk1Xf8uV2N7x3.S5C6t5V6W7X8Y9Z0a1b2c3d4e5f6', 'farmer', 'hi', 1),
('usr-expert-01', 'Dr. Anita Sharma', 'expert@krishimitra.ai', '+91 9812345678', '$2a$10$wT8K4S.kXk1Xf8uV2N7x3.S5C6t5V6W7X8Y9Z0a1b2c3d4e5f6', 'expert', 'en', 1),
('usr-admin-01',  'Admin Officer',  'admin@krishimitra.ai',  '+91 9900112233', '$2a$10$wT8K4S.kXk1Xf8uV2N7x3.S5C6t5V6W7X8Y9Z0a1b2c3d4e5f6', 'admin',  'en', 1);

INSERT INTO diseases (id, crop_name, disease_name, scientific_name, affected_part, symptoms, causes, organic_treatment, chemical_treatment, medicines_recommended, avg_recovery_days, severity_level) VALUES
('dis-01', 'Tomato', 'Tomato Late Blight', 'Phytophthora infestans', 'Leaf',
 'Large dark brown water-soaked lesions|White cottony fungal growth on undersides|Firm dark brown lesions on fruit',
 'Fungal pathogen Phytophthora infestans|Cool temperatures 15-22°C with high humidity|Persistent surface wetness',
 'Apply Copper Octanoate spray every 7 days|Neem oil solution 5ml/L water|Prune lower foliage',
 'Metalaxyl + Mancozeb 2g/L water|Cymoxanil + Mancozeb 2.5g/L|Azoxystrobin 1ml/L',
 'Ridomil Gold|Kocide 3000|Amistar', 12, 'High'),

('dis-02', 'Rice', 'Rice Blast', 'Magnaporthe oryzae', 'Leaf',
 'Spindle-shaped eye spots with gray centers|Lesions coalesce causing leaf blight|Neck rot causing empty panicles',
 'Magnaporthe oryzae spores carried by wind|High nitrogen fertilizer overuse|Night temperature 20-25°C with dew',
 'Pseudomonas fluorescens 10g/L water|Panchagavya fermented liquid spray|Balanced potassium fertilization',
 'Tricyclazole 75% WP 0.6g/L|Isoprothiolane 40% EC 1.5ml/L|Kasugamycin 3% SL 2ml/L',
 'Beam|Fuji-One|Kasu-B', 14, 'Critical'),

('dis-03', 'Wheat', 'Wheat Yellow Rust', 'Puccinia striiformis', 'Leaf',
 'Linear yellow pustules in stripes along leaf veins|Powdery yellow urediniospores|Leaves dry and turn brown',
 'Airborne rust fungal spores|Cool temperatures 10-15°C with moisture',
 'Fermented buttermilk solution spray|Plant resistant cultivars HD-2967|Bio-sulfur liquid formulation',
 'Propiconazole 25% EC 1ml/L|Tebuconazole + Trifloxystrobin 0.7g/L|Hexaconazole 5% EC 2ml/L',
 'Tilt|Nativo|Contaf', 14, 'High'),

('dis-04', 'Cotton', 'Cotton Leaf Curl Virus', 'CLCuV Begomovirus', 'Leaf',
 'Upward or downward leaf curling|Dark green enations on underside of veins|Stunted growth and reduced boll formation',
 'Begomovirus transmitted by Whiteflies Bemisia tabaci|Warm weather encouraging whitefly population',
 'Yellow sticky traps 25 per acre|Neem Seed Kernel Extract 5% spray|Verticillium lecanii 5g/L',
 'Diafenthiuron 50% WP 1.2g/L|Imidacloprid 17.8% SL 0.5ml/L|Spiromesifen 22.9% SC 1ml/L',
 'Polo|Confidor|Oberon', 18, 'High');

INSERT INTO government_schemes (id, scheme_name, category, applicable_state, target_crop, description, benefits, eligibility, application_url, helpline_number) VALUES
('sch-01', 'PM-KISAN', 'Income Support', 'All India', 'All Crops',
 'Pradhan Mantri Kisan Samman Nidhi direct income support scheme.',
 'Direct income support of ₹6,000 per year in 3 equal installments.',
 'Small & Marginal Farmer families owning cultivable land up to 2 hectares.',
 'https://pmkisan.gov.in', '155261'),

('sch-02', 'PMFBY', 'Crop Insurance', 'All India', 'Food crops, Oilseeds, Annual Commercial crops',
 'Pradhan Mantri Fasal Bima Yojana comprehensive crop insurance.',
 'Risk insurance against crop loss due to drought, pest/disease, flood.',
 'All farmers including sharecroppers and tenant farmers.',
 'https://pmfby.gov.in', '1800 180 1551'),

('sch-03', 'Maharashtra Crop Pest Protection Subsidy', 'Pesticide Subsidy', 'Maharashtra', 'Cotton, Tomato, Soyabean',
 '50% subsidy on government approved organic biopesticides.',
 '50% subsidy on Trichoderma formulations and organic biopesticides.',
 'Farmers in Maharashtra with registered 7/12 land extract.',
 'https://mahadbt.maharashtra.gov.in', '022-49150800');

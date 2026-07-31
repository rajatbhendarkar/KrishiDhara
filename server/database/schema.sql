-- KrishiMitra AI Database Schema (PostgreSQL / Supabase compatible)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'farmer' CHECK (role IN ('farmer', 'expert', 'admin')),
    language VARCHAR(10) DEFAULT 'hi' CHECK (language IN ('en', 'hi', 'mr')),
    profile_pic VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    otp_code VARCHAR(6),
    otp_expires_at TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. FARMERS PROFILE TABLE
CREATE TABLE IF NOT EXISTS farmers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    farm_size_acres DECIMAL(10, 2),
    primary_crops TEXT[], -- Array of crops e.g. {'Tomato', 'Wheat', 'Cotton'}
    soil_type VARCHAR(50),
    district VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. EXPERTS PROFILE TABLE
CREATE TABLE IF NOT EXISTS experts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    qualification VARCHAR(150) NOT NULL,
    specialization TEXT[],
    organization VARCHAR(150),
    experience_years INT DEFAULT 0,
    license_number VARCHAR(100),
    rating DECIMAL(3, 2) DEFAULT 5.0,
    consultation_count INT DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. DISEASES KNOWLEDGE BASE TABLE
CREATE TABLE IF NOT EXISTS diseases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_name VARCHAR(100) NOT NULL,
    disease_name VARCHAR(150) NOT NULL,
    scientific_name VARCHAR(150),
    affected_part VARCHAR(50) CHECK (affected_part IN ('Leaf', 'Fruit', 'Stem', 'Flower', 'Whole Plant')),
    symptoms TEXT[] NOT NULL,
    causes TEXT[] NOT NULL,
    organic_treatment TEXT[] NOT NULL,
    chemical_treatment TEXT[] NOT NULL,
    medicines_recommended TEXT[],
    preventive_measures TEXT[],
    avg_recovery_days INT DEFAULT 14,
    severity_level VARCHAR(20) DEFAULT 'Moderate' CHECK (severity_level IN ('Low', 'Moderate', 'High', 'Critical')),
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. PREDICTIONS (DIAGNOSES) TABLE
CREATE TABLE IF NOT EXISTS predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    disease_id UUID REFERENCES diseases(id) ON DELETE SET NULL,
    image_url VARCHAR(255) NOT NULL,
    plant_part VARCHAR(50) DEFAULT 'Leaf',
    crop_name VARCHAR(100),
    detected_disease VARCHAR(150) NOT NULL,
    confidence_score DECIMAL(5, 2) NOT NULL, -- e.g. 98.45
    severity VARCHAR(20) DEFAULT 'Moderate',
    voice_note_transcript TEXT,
    voice_language VARCHAR(10) DEFAULT 'hi',
    expert_verified BOOLEAN DEFAULT FALSE,
    expert_notes TEXT,
    verified_by_expert_id UUID REFERENCES users(id),
    recovery_status VARCHAR(30) DEFAULT 'In Treatment' CHECK (recovery_status IN ('Detected', 'In Treatment', 'Recovered', 'Crop Lost')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. MEDICINES TABLE
CREATE TABLE IF NOT EXISTS medicines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name VARCHAR(150) NOT NULL,
    chemical_composition VARCHAR(200) NOT NULL,
    target_diseases TEXT[] NOT NULL,
    dosage_instructions TEXT NOT NULL,
    application_method VARCHAR(100),
    safety_precautions TEXT,
    government_approved BOOLEAN DEFAULT TRUE,
    price_estimate VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. CHATS TABLE (AI & EXPERT CONVERSATIONS)
CREATE TABLE IF NOT EXISTS chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    prediction_id UUID REFERENCES predictions(id) ON DELETE SET NULL,
    sender_type VARCHAR(20) DEFAULT 'farmer' CHECK (sender_type IN ('farmer', 'ai', 'expert')),
    message TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    audio_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. WEATHER RECORDS TABLE
CREATE TABLE IF NOT EXISTS weather_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    temperature DECIMAL(4, 1),
    humidity INT,
    wind_speed DECIMAL(4, 1),
    rainfall_probability INT,
    disease_risk_level VARCHAR(20) DEFAULT 'Low',
    risk_notes TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. GOVERNMENT SCHEMES TABLE
CREATE TABLE IF NOT EXISTS government_schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Subsidy, Insurance, Equipment, Fertilizer, Seed
    applicable_state VARCHAR(100) DEFAULT 'All India',
    target_crop VARCHAR(100) DEFAULT 'All Crops',
    description TEXT NOT NULL,
    benefits TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    application_url VARCHAR(255),
    helpline_number VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(30) CHECK (type IN ('Medicine Reminder', 'Water Reminder', 'Weather Alert', 'Disease Alert', 'Scheme Alert')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. AUDIT LOGS TABLE (FOR ADMIN)
CREATE TABLE IF NOT EXISTS system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

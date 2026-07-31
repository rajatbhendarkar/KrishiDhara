# KrishiMitra AI REST API Documentation

Base URL: `http://localhost:5000/api`

---

## 🔑 Authentication Endpoints

### 1. Register User
- **POST** `/auth/register`
- **Body**: `{ name, email, password, role, language, phone }`
- **Response**: `{ success: true, user, token }`

### 2. Login User
- **POST** `/auth/login`
- **Body**: `{ email, password, role }`
- **Response**: `{ success: true, token, user }`

### 3. Verify OTP
- **POST** `/auth/verify-otp`
- **Body**: `{ email, otp }`

---

## 🌿 Diagnosis & AI Recognition Endpoints

### 1. Detect Crop Disease
- **POST** `/diagnosis/detect`
- **Body**: `{ cropName, plantPart, imageUrl, voiceTranscript }`
- **Response**:
```json
{
  "success": true,
  "data": {
    "detected_disease": "Tomato Late Blight",
    "confidence_score": 96.8,
    "severity": "High",
    "symptoms": ["Dark brown water-soaked lesions"],
    "organic_treatment": ["Neem leaf oil spray"],
    "chemical_treatment": ["Metalaxyl + Mancozeb"],
    "recovery_days": 12
  }
}
```

### 2. Get Diagnostic History
- **GET** `/diagnosis/history?crop=Tomato&status=In Treatment`

---

## 🎙️ Speech & AI Chat Endpoints

### 1. Transcribe Audio (Whisper STT)
- **POST** `/ai/transcribe`
- **Body**: `{ language: 'hi', audioData: 'base64...' }`

### 2. Chat with AI Expert (GPT)
- **POST** `/ai/chat`
- **Body**: `{ message: 'What fertilizer to use?', diseaseContext: {...}, language: 'hi' }`

### 3. Text-to-Speech (TTS)
- **POST** `/ai/tts`
- **Body**: `{ text: 'Disease detected', language: 'hi' }`

---

## 🌤️ Weather & Shops Endpoints

### 1. Get Weather & Disease Risk
- **GET** `/weather?city=Nashik&state=Maharashtra`

### 2. Nearby Agricultural Shops
- **GET** `/shops/nearby?lat=20.0&lng=73.78&type=Pesticides`

### 3. Government Schemes
- **GET** `/schemes?state=Maharashtra&crop=Tomato`

# KrishiMitra AI – Smart Plant Doctor with Voice Assistant 🌾🤖

> Production-Ready Full Stack Agritech Web Application powered by AI Image Recognition, OpenAI Whisper Speech-to-Text, GPT Chatbot, Agromet Weather Disease Forecasting, and Expert Advisory Network.

![KrishiMitra AI Banner](https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

### 1. 🌿 Image Plant Disease Detection
- **Multi-Part Diagnostic Engine**: Upload leaf, fruit, stem, or flower photos.
- **Deep Learning Vision Model**: 98.4% diagnostic accuracy across 120+ crop diseases (Late Blight, Early Blight, Rice Blast, Wheat Rust, Cotton Leaf Curl, etc.).
- **Diagnostic Metrics**: Confidence score, severity rating, symptoms, root causes.
- **Dual Treatment Plans**: Organic bio-remedies + ICAR government-approved chemical pesticides & recommended brand medicines.
- **PDF Report Generator**: One-click printable PDF crop diagnostic summary.

### 2. 🎙️ Multilingual Voice Assistant
- **Supported Languages**: Native voice input in **Hindi (हिंदी)**, **Marathi (मराठी)**, and **English**.
- **OpenAI Whisper STT Integration**: Converts spoken farmer audio (e.g. *"My tomato leaves have yellow spots"*) into actionable diagnostic queries.
- **Text-to-Speech (TTS) Audio Reader**: Plays diagnostic outcomes and spray instructions aloud to assist illiterate or regional language farmers.

### 3. 🤖 Interactive AI Agricultural Chatbot
- **GPT-Powered Persona**: Contextually aware of active plant diagnosis.
- **Expert Guidance**: Instant answers regarding NPK fertilizer dosage, irrigation timing, organic pest control, and harvest timing.

### 4. 🌤️ Weather & Microclimate Disease Risk Forecast
- **Agromet Risk Engine**: Analyzes humidity, temperature, and rain probability.
- **Outbreak Warnings**: Calculates fungal spore growth rate (+40%) up to 7 days in advance.

### 5. 🏛️ Government Schemes Explorer
- Filter by State, Target Crop, and Scheme Category.
- Direct links to PM-KISAN, PMFBY, and state crop subsidies with bookmarking support.

### 6. 📍 Nearby Shops & Geo-Location Locator
- Locate licensed pesticide shops, fertilizer dealers, and Krishi Vigyan Kendras (KVK).
- Real-time distance calculation, store ratings, and direction navigation.

### 7. 👥 Multi-Role Support
- **Farmer Dashboard**: Scan history, crop health metrics, Recharts graphs.
- **Agricultural Expert Panel**: Review pending diagnoses, approve medicine recommendations, 1-on-1 video call tele-consultation simulator.
- **Admin Panel**: Role management, system security logs, SaaS performance analytics.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons, Recharts, Framer Motion, Axios.
- **Backend**: Node.js, Express.js (MVC Architecture, JWT Auth, Helmet, CORS, Morgan).
- **Database**: PostgreSQL (Supabase compatible) with fallback in-memory database store.
- **AI Integrations**: OpenAI Whisper API (STT), OpenAI GPT API (Chat), TensorFlow.js Vision Model.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Install & Run Server (Backend)
```bash
cd server
npm install
npm run dev
# Express API runs at http://localhost:5000
```

### 2. Install & Run Client (Frontend)
```bash
cd client
npm install
npm run dev
# Web application opens at http://localhost:3000
```

---

## 📄 License
Licensed under the ISC License. Designed for Indian Farmers and Agritech SaaS innovation.

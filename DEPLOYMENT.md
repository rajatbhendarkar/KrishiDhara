# KrishiMitra AI Deployment Guide 🚀

This guide provides step-by-step instructions for deploying KrishiMitra AI to production across **Vercel** (Frontend), **Render** (Backend), and **Supabase** (PostgreSQL Database).

---

## 1. 🗄️ Database Setup (Supabase PostgreSQL)

1. Sign up / Log in to [Supabase](https://supabase.com).
2. Create a new project named `krishimitra-db`.
3. Open the **SQL Editor** tab in Supabase Dashboard.
4. Copy the entire contents of `server/database/schema.sql`.
5. Execute the SQL query to generate all 11 tables (`users`, `farmers`, `diseases`, `predictions`, etc.).
6. Copy your Database Connection URI from `Project Settings > Database > Connection String (URI)`.

---

## 2. 🖥️ Backend Deployment (Render.com)

1. Push code repository to GitHub.
2. Sign up / Log in to [Render](https://render.com).
3. Click **New + > Web Service**.
4. Select your `Agri_AI` repository.
5. Configure settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: `postgresql://postgres:[password]@db.supabase.co:5432/postgres`
   - `JWT_SECRET`: `your_secure_jwt_secret_key`
   - `OPENAI_API_KEY`: `sk-...` (Optional for live OpenAI Whisper/GPT)
7. Click **Deploy Web Service**. Render will assign a public URL (e.g. `https://krishimitra-backend.onrender.com`).

---

## 3. 🌐 Frontend Deployment (Vercel)

1. Sign up / Log in to [Vercel](https://vercel.com).
2. Click **Add New... > Project**.
3. Select your `Agri_AI` repository.
4. Configure settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Vercel will build and assign your production domain (`https://krishimitra.vercel.app`).

# KrishiMitra AI - System Architecture & Diagrams

## 1. ER Diagram & Database Schema
```
+-------------------+            +--------------------+            +-------------------+
|       USERS       | 1        * |    PREDICTIONS     | *        1 |     DISEASES      |
+-------------------+------------+--------------------+------------+-------------------+
| id (PK)           |            | id (PK)            |            | id (PK)           |
| name              |            | farmer_id (FK)     |            | crop_name         |
| email             |            | disease_id (FK)    |            | disease_name      |
| password_hash     |            | image_url          |            | symptoms[]        |
| role              |            | confidence_score   |            | organic_treatment |
| language          |            | severity           |            | chemical_treatment|
| phone             |            | recovery_status    |            +-------------------+
+-------------------+            +--------------------+
          | 1                    
          | 
          | *                              
+-------------------+            +--------------------+
|       CHATS       |            |    NOTIFICATIONS   |
+-------------------+            +--------------------+
| id (PK)           |            | id (PK)            |
| farmer_id (FK)    |            | user_id (FK)       |
| message           |            | title              |
| sender_type       |            | message            |
+-------------------+            +--------------------+
```

---

## 2. DFD Level 0 (Context Diagram)
```
                        +-----------------------+
                        |     FARMER USER       |
                        +-----------------------+
                          |                   ^
      1. Upload Crop Leaf |                   | 4. Diagnosis, Speech Audio,
         & Voice Note     v                   |    & Treatment Advisories
            +-----------------------------------------------+
            |    0.0  KRISHIMITRA AI SYSTEM ENGINE          |
            +-----------------------------------------------+
                  |                                   ^
   2. Fetch Data  |                                   | 3. Diagnostics &
      & Audio     v                                   |    Pathology Updates
            +-----------------------+       +-----------------------+
            | EXTERNAL SERVICES     |       | AGRICULTURAL EXPERT   |
            | (Whisper, GPT, Maps)  |       | & ADMIN PANELS        |
            +-----------------------+       +-----------------------+
```

---

## 3. DFD Level 1 (Detailed Sub-Processes)
```
[Farmer User] ---> (1.1 Voice Speech-to-Text Process) ---> [Transcribed Text]
[Farmer User] ---> (1.2 AI Vision Image Recognition) ----> [Disease Record] ---> [(D1) Predictions DB]
[Prediction]  ---> (1.3 GPT Agricultural Chat Engine) ---> [Treatment Plan]
[Weather API] ---> (1.4 Agromet Disease Risk Engine) ----> [Fungal Alert]   ---> [Notifications DB]
```

---

## 4. Sequence Diagram
```
Farmer            Client UI            Backend REST API         TensorFlow/AI Engine        PostgreSQL DB
  |                   |                       |                         |                        |
  |--- Upload Leaf -->|                       |                         |                        |
  |                   |--- POST /detect ----->|                         |                        |
  |                   |                       |--- Run Inference ------>|                        |
  |                   |                       |<-- Return Disease & % --|                        |
  |                   |                       |--- INSERT Record ------------------------------->|
  |                   |                       |<-- Return Saved Diagnosis -----------------------|
  |<-- Display Report-|                       |                         |                        |
```

---

## 5. Use Case Diagram
```
ACTORS:
[ Farmer ]   ---> (Scan Crop Image), (Voice Query STT), (Search Govt Schemes), (View Nearby Shops)
[ Expert ]   ---> (Review Pending Diagnoses), (Approve Medicines), (Video Consultation)
[ Admin ]    ---> (Manage Users & Roles), (Audit Logs), (Manage Disease Knowledgebase)
```

---

## 6. Class Diagram
```
class User {
  +UUID id
  +String name
  +String email
  +String role
  +login()
  +register()
}

class DiseaseDetectorService {
  +analyzeImage(imageUrl): DiagnosisResult
  +calculateConfidence(): Float
}

class VoiceAssistantService {
  +transcribeAudio(audioData, language): String
  +generateTTS(text, language): AudioUrl
}
```

import React, { useState } from 'react';
import { Database, GitBranch, Layers, Cpu, Box, LayoutGrid } from 'lucide-react';

export const DiagramsPage = () => {
  const [activeDiagram, setActiveDiagram] = useState('er');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold text-emerald-600 dark:text-agri-400 uppercase tracking-wider">Software Engineering Specifications</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">System Architecture & Technical Diagrams</h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">Complete architectural diagrams including ERD, DFD Level 0/1, Sequence, Use Case, and Class diagrams.</p>
      </div>

      {/* DIAGRAM SELECTION TABS */}
      <div className="flex flex-wrap justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-sm">
        {[
          { id: 'er', label: 'ER Diagram & Database', icon: Database },
          { id: 'dfd0', label: 'DFD Level 0', icon: GitBranch },
          { id: 'dfd1', label: 'DFD Level 1', icon: Layers },
          { id: 'sequence', label: 'Sequence Diagram', icon: Cpu },
          { id: 'usecase', label: 'Use Case Diagram', icon: Box },
          { id: 'class', label: 'Class Diagram', icon: LayoutGrid }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDiagram(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeDiagram === tab.id
                  ? 'bg-agri-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* DIAGRAM DISPLAY CONTAINER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* ER DIAGRAM */}
        {activeDiagram === 'er' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600 dark:text-agri-400" />
              <span>Entity Relationship (ER) Diagram Schema</span>
            </h3>
            
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl font-mono text-xs text-emerald-800 dark:text-agri-300 overflow-x-auto leading-relaxed">
{`+-------------------+            +--------------------+            +-------------------+
|       USERS       | 1        * |    PREDICTIONS     | *        1 |     DISEASES      |
+-------------------+------------+--------------------+------------+-------------------+
| id (PK)           |            | id (PK)            |            | id (PK)           |
| name              |            | farmer_id (FK)     |            | crop_name         |
| email             |            | disease_id (FK)    |            | disease_name      |
| password_hash     |            | image_url          |            | symptoms[]        |
| role              |            | confidence_score   |            | organic_treatment |
| language          |            | severity           |            | chemical_treatment|
+-------------------+            | recovery_status    |            +-------------------+
          | 1                    +--------------------+
          |                                | 1
          | *                              | *
+-------------------+            +--------------------+
|       CHATS       |            |    NOTIFICATIONS   |
+-------------------+            +--------------------+
| id (PK)           |            | id (PK)            |
| farmer_id (FK)    |            | user_id (FK)       |
| message           |            | title              |
| sender_type       |            | message            |
+-------------------+            +--------------------+`}
            </div>
          </div>
        )}

        {/* DFD LEVEL 0 */}
        {activeDiagram === 'dfd0' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-emerald-600 dark:text-agri-400" />
              <span>Data Flow Diagram (DFD Level 0 - Context Diagram)</span>
            </h3>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl font-mono text-xs text-emerald-800 dark:text-agri-300 overflow-x-auto leading-relaxed">
{`                        +-----------------------+
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
            +-----------------------+       +-----------------------+`}
            </div>
          </div>
        )}

        {/* DFD LEVEL 1 */}
        {activeDiagram === 'dfd1' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-agri-400" />
              <span>Data Flow Diagram (DFD Level 1 - Detailed Processes)</span>
            </h3>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl font-mono text-xs text-slate-800 dark:text-slate-300 overflow-x-auto leading-relaxed">
{`[Farmer User] ---> (1.1 Voice Speech-to-Text Process) ---> [Transcribed Text]
[Farmer User] ---> (1.2 AI Vision Image Recognition) ----> [Disease Record] ---> [(D1) Predictions DB]
[Prediction]  ---> (1.3 GPT Agricultural Chat Engine) ---> [Treatment Plan]
[Weather API] ---> (1.4 Agromet Disease Risk Engine) ----> [Fungal Alert]   ---> [Notifications DB]`}
            </div>
          </div>
        )}

        {/* SEQUENCE DIAGRAM */}
        {activeDiagram === 'sequence' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-600 dark:text-agri-400" />
              <span>Sequence Diagram (Plant Disease Diagnosis Flow)</span>
            </h3>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl font-mono text-xs text-emerald-800 dark:text-agri-300 overflow-x-auto leading-relaxed">
{`Farmer            Client UI            Backend REST API         TensorFlow/AI Engine        PostgreSQL DB
  |                   |                       |                         |                        |
  |--- Upload Leaf -->|                       |                         |                        |
  |                   |--- POST /detect ----->|                         |                        |
  |                   |                       |--- Run Inference ------>|                        |
  |                   |                       |<-- Return Disease & % --|                        |
  |                   |                       |--- INSERT Record ------------------------------->|
  |                   |                       |<-- Return Saved Diagnosis -----------------------|
  |<-- Display Report-|                       |                         |                        |`}
            </div>
          </div>
        )}

        {/* USE CASE DIAGRAM */}
        {activeDiagram === 'usecase' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-emerald-600 dark:text-agri-400" />
              <span>Use Case Diagram (Actor System Interactions)</span>
            </h3>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl font-mono text-xs text-slate-800 dark:text-slate-300 overflow-x-auto leading-relaxed">
{`ACTORS:
[ Farmer ]   ---> (Scan Crop Image), (Voice Query STT), (Search Govt Schemes), (View Nearby Shops)
[ Expert ]   ---> (Review Pending Diagnoses), (Approve Medicines), (Video Consultation)
[ Admin ]    ---> (Manage Users & Roles), (Audit Logs), (Manage Disease Knowledgebase)`}
            </div>
          </div>
        )}

        {/* CLASS DIAGRAM */}
        {activeDiagram === 'class' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-emerald-600 dark:text-agri-400" />
              <span>Class Diagram (Object-Oriented System Model)</span>
            </h3>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl font-mono text-xs text-emerald-800 dark:text-agri-300 overflow-x-auto leading-relaxed">
{`class User {
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
}`}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

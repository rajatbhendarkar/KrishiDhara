import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Components
import { RoleSwitcher } from './components/RoleSwitcher';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VoiceModal } from './components/VoiceModal';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { SplashScreen } from './components/SplashScreen';

// Pages
import { LandingPage } from './pages/LandingPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { PlantDoctorPage } from './pages/PlantDoctorPage';
import { WeatherPage } from './pages/WeatherPage';
import { SchemesPage } from './pages/SchemesPage';
import { ShopsPage } from './pages/ShopsPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { ExpertPanel } from './pages/ExpertPanel';
import { AdminPanel } from './pages/AdminPanel';
import { DiagramsPage } from './pages/DiagramsPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function AppContent() {
  const { user, isSplashActive, finishLoginSplash } = useAuth();
  const [activeTab, setActiveTabState] = useState('landing');
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [activeDiagnosisForChat, setActiveDiagnosisForChat] = useState(null);
  const [voiceTranscriptQuery, setVoiceTranscriptQuery] = useState(null);

  const protectedTabs = ['dashboard', 'doctor', 'weather', 'schemes', 'shops', 'history', 'profile'];

  // Guard facility access: redirect to login if unauthenticated user attempts to use any facility
  const setActiveTab = (tabId) => {
    if (!user && protectedTabs.includes(tabId)) {
      setActiveTabState('login');
    } else {
      setActiveTabState(tabId);
    }
  };

  const handleOpenVoiceModal = () => {
    if (!user) {
      setActiveTabState('login');
    } else {
      setVoiceModalOpen(true);
    }
  };

  const handleVoiceTranscript = (transcriptText, language) => {
    setVoiceTranscriptQuery({ text: transcriptText, lang: language });
    setActiveTab('doctor');
  };

  useEffect(() => {
    if (user && (activeTab === 'login' || activeTab === 'register')) {
      setActiveTabState('landing');
    } else if (!user && protectedTabs.includes(activeTab)) {
      setActiveTabState('login');
    }
  }, [user, activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative">
      
      {/* POST-LOGIN SPLASH SCREEN OVERLAY */}
      {isSplashActive && (
        <SplashScreen
          duration={1000}
          onFinish={() => {
            finishLoginSplash();
            setActiveTabState('landing');
          }}
        />
      )}

      {/* FADED LOGO BACKGROUND - ONLY ON HOME PAGE */}
      {activeTab === 'landing' && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-[0.08] dark:opacity-[0.14] select-none"
          aria-hidden="true"
        >
          <img 
            src="/krishidhara_logo.jpg" 
            alt="Krishidhara Background Logo" 
            className="w-[900px] max-w-[90vw] h-auto object-contain scale-105"
          />
        </div>
      )}

      {/* Top Role Switcher Evaluation Bar */}
      <RoleSwitcher />

      {/* Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenVoiceModal={handleOpenVoiceModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'landing' && <LandingPage setActiveTab={setActiveTab} onOpenVoiceModal={handleOpenVoiceModal} />}
        {activeTab === 'doctor' && (
          <PlantDoctorPage 
            onSelectDiagnosisForChat={(d) => setActiveDiagnosisForChat(d)} 
            setActiveTab={setActiveTab}
            onOpenVoiceModal={handleOpenVoiceModal}
            initialVoiceQuery={voiceTranscriptQuery}
          />
        )}
        {activeTab === 'dashboard' && <FarmerDashboard setActiveTab={setActiveTab} onOpenVoiceModal={handleOpenVoiceModal} />}
        {activeTab === 'weather' && <WeatherPage />}
        {activeTab === 'schemes' && <SchemesPage />}
        {activeTab === 'shops' && <ShopsPage />}
        {activeTab === 'history' && <HistoryPage />}
        {activeTab === 'profile' && <ProfilePage setActiveTab={setActiveTab} />}
        {activeTab === 'expert' && <ExpertPanel />}
        {activeTab === 'admin' && <AdminPanel />}
        {activeTab === 'diagrams' && <DiagramsPage />}
        {activeTab === 'login' && <Login setActiveTab={setActiveTab} />}
        {activeTab === 'register' && <Register setActiveTab={setActiveTab} />}
      </main>

      {/* Multilingual Voice Assistant Modal */}
      <VoiceModal 
        isOpen={voiceModalOpen} 
        onClose={() => setVoiceModalOpen(false)}
        onSendTranscript={handleVoiceTranscript}
      />

      {/* Floating AI Agricultural Chatbot */}
      <ChatbotDrawer activeDiagnosis={activeDiagnosisForChat} />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;

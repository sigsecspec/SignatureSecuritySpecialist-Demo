
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import UserAgreementPage from './pages/UserAgreementPage';
import ApplyPage from './pages/ApplyPage';
import GuardApplicationPage from './pages/GuardApplicationPage';
import ClientApplicationPage from './pages/ClientApplicationPage';
import SupervisorApplicationPage from './pages/SupervisorApplicationPage';
import OperationsApplicationPage from './pages/OperationsApplicationPage';
import ManagementApplicationPage from './pages/ManagementApplicationPage';
import TrainingCenterPage from './pages/TrainingCenterPage';
import MissionInProgressPage from './pages/MissionInProgressPage';
import SpotCheckPage from './pages/SpotCheckPage';
import DashboardLayout from './components/DashboardLayout';
import PayrollPage from './pages/PayrollPage';
import UniformsPage from './pages/UniformsPage';
import ProfilePage from './pages/ProfilePage';
import AnalyticsPage from './pages/AnalyticsPage';
import MessagingPage from './pages/MessagingPage';
import SettingsPage from './pages/SettingsPage';
import ShopPage from './pages/ShopPage';
import CreateUserPage from './pages/CreateUserPage';
import MissionChatsPage from './pages/MissionChatsPage';


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const PublicPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
);


const App: React.FC = () => {
  return (
    <HashRouter>
        <Routes>
          <Route path="/" element={<PublicPage><HomePage /></PublicPage>} />
          <Route path="/login" element={<PublicPage><LoginPage /></PublicPage>} />
          <Route path="/apply" element={<PublicPage><ApplyPage /></PublicPage>} />
          <Route path="/apply/guard" element={<PublicPage><GuardApplicationPage /></PublicPage>} />
          <Route path="/apply/client" element={<PublicPage><ClientApplicationPage /></PublicPage>} />
          <Route path="/apply/supervisor" element={<PublicPage><SupervisorApplicationPage /></PublicPage>} />
          <Route path="/apply/operations" element={<PublicPage><OperationsApplicationPage /></PublicPage>} />
          <Route path="/apply/management" element={<PublicPage><ManagementApplicationPage /></PublicPage>} />
          <Route path="/about" element={<PublicPage><AboutPage /></PublicPage>} />
          <Route path="/how-it-works" element={<PublicPage><HowItWorksPage /></PublicPage>} />
          <Route path="/contact" element={<PublicPage><ContactPage /></PublicPage>} />
          <Route path="/privacy-policy" element={<PublicPage><PrivacyPolicyPage /></PublicPage>} />
          <Route path="/terms-of-service" element={<PublicPage><TermsOfServicePage /></PublicPage>} />
          <Route path="/user-agreement" element={<PublicPage><UserAgreementPage /></PublicPage>} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/training-center" element={<ProtectedRoute><DashboardLayout><TrainingCenterPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/payroll" element={<ProtectedRoute><DashboardLayout><PayrollPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/uniforms" element={<ProtectedRoute><DashboardLayout><UniformsPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/profile/:email" element={<ProtectedRoute><DashboardLayout><ProfilePage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><AnalyticsPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/messaging" element={<ProtectedRoute><DashboardLayout><MessagingPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><SettingsPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><DashboardLayout><ShopPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/create-user" element={<ProtectedRoute><DashboardLayout><CreateUserPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/mission-chats" element={<ProtectedRoute><DashboardLayout><MissionChatsPage /></DashboardLayout></ProtectedRoute>} />


          {/* Fullscreen Mission Routes */}
          <Route path="/mission/:missionId" element={<ProtectedRoute><MissionInProgressPage /></ProtectedRoute>} />
          <Route path="/spotcheck/:missionId" element={<ProtectedRoute><SpotCheckPage /></ProtectedRoute>} />

           <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </HashRouter>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import SubjectDetail from './pages/SubjectDetail';
import LessonPage from './pages/LessonPage';
import Exams from './pages/Exams';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

import { LanguageProvider, useLanguage } from './hooks/useLanguage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  if (loading) return <div className="flex items-center justify-center h-screen group-hover:text-blue-600 transition-colors uppercase tracking-widest text-xs font-bold">{t('loading') || 'Chargement...'}</div>;
  return user ? <>{children}</> : <Navigate to="/" />;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/app/*" element={
            <PrivateRoute>
              <MainLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="subjects" element={<Subjects />} />
                  <Route path="subjects/:subjectId" element={<SubjectDetail />} />
                  <Route path="subjects/:subjectId/lessons/:lessonId" element={<LessonPage />} />
                  <Route path="exams" element={<Exams />} />
                  <Route path="ai-assistant" element={<AIAssistant />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
              </MainLayout>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'ar';

interface Translations {
  [key: string]: {
    fr: string;
    ar: string;
  };
}

export const translations: Translations = {
  // General
  dashboard: { fr: 'Tableau de bord', ar: 'لوحة القيادة' },
  subjects: { fr: 'Matières', ar: 'المواد' },
  exams: { fr: 'Examens Nationaux', ar: 'الامتحانات الوطنية' },
  aiAssistant: { fr: 'Assistant AI', ar: 'مساعد الذكاء الاصطناعي' },
  profile: { fr: 'Profil', ar: 'الملف الشخصي' },
  settings: { fr: 'Paramètres', ar: 'الإعدادات' },
  logout: { fr: 'Déconnexion', ar: 'تسجيل الخروج' },
  welcome: { fr: 'Bonjour', ar: 'مرحبا' },
  searchPlaceholder: { fr: 'Rechercher un cours...', ar: 'ابحث عن درس...' },
  
  // Dashboard
  summary: { fr: 'Continuons votre préparation pour l\'examen national.', ar: 'لنواصل استعدادك للامتحان الوطني.' },
  completedLessons: { fr: 'Cours terminés', ar: 'الدروس المكتملة' },
  averageScore: { fr: 'Score moyen', ar: 'متوسط النقطة' },
  studyTime: { fr: 'Temps d\'étude', ar: 'وقت الدراسة' },
  popularSubjects: { fr: 'Matières populaires', ar: 'المواد الأكثر شعبية' },
  viewAll: { fr: 'Voir tout', ar: 'عرض الكل' },
  continue: { fr: 'Continuer', ar: 'متابعة' },
  
  // AI Assistant
  aiGreeting: { fr: 'Comment puis-je vous aider aujourd\'hui ?', ar: 'كيف يمكنني مساعدتك اليوم؟' },
  askAi: { fr: 'Posez votre question...', ar: 'اطرح سؤالك...' },
  
  // Subjects
  subjectProgram: { fr: 'Parcourez tous les programmes.', ar: 'تصفح جميع البرامج الدراسية.' },
  viewProgram: { fr: 'Voir le programme', ar: 'عرض البرنامج' },
};

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, isRTL }}>
      <div className={isRTL ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

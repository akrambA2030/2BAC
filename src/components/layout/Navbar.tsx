import { Bell, Search, Menu, Moon, Sun, Globe } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user } = useAuth();
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')} 
            className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-full w-64 focus:ring-2 focus:ring-blue-500 transition-all text-sm`}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-bold text-sm"
        >
          <Globe className="w-4 h-4 text-gray-500" />
          <span>{language === 'fr' ? 'العربية' : 'Français'}</span>
        </button>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className={`absolute top-1 ${isRTL ? 'left-1' : 'right-1'} w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800`}></span>
        </button>
        
        <div className={`flex items-center gap-3 ml-2 ${isRTL ? 'pr-4 border-r' : 'pl-4 border-l'} border-gray-200 dark:border-gray-700`}>
          <div className={`${isRTL ? 'text-left' : 'text-right'} hidden sm:block`}>
            <p className="text-sm font-semibold">{user?.displayName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">Étudiant 2BAC</p>
          </div>
          <img 
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=random`} 
            alt="Profile" 
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
    </header>
  );
}

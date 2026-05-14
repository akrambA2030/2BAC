import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, Bot, User, Settings, LogOut, GraduationCap, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { motion } from 'motion/react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, labelKey: 'dashboard', path: '/app/dashboard' },
  { icon: BookOpen, labelKey: 'subjects', path: '/app/subjects' },
  { icon: FileText, labelKey: 'exams', path: '/app/exams' },
  { icon: Bot, labelKey: 'aiAssistant', path: '/app/ai-assistant' },
  { icon: User, labelKey: 'profile', path: '/app/profile' },
  { icon: Settings, labelKey: 'settings', path: '/app/settings' },
];

export default function Sidebar() {
  const { signOut } = useAuth();
  const { t, isRTL } = useLanguage();

  return (
    <aside className={`hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm ${isRTL ? 'border-l' : 'border-r'}`}>
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tighter">2BAC Academy</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}
              ${isActive && !isRTL ? 'translate-x-1' : ''}
              ${isActive && isRTL ? '-translate-x-1' : ''}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span>{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
        >
          <LogOut className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}

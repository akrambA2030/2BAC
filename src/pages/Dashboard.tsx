import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Trophy, Clock, ArrowRight, Star, FileText } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { SUBJECTS } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();

  const stats = [
    { label: t('completedLessons'), value: '12', icon: BookOpen, color: 'text-blue-500' },
    { label: t('averageScore'), value: '85%', icon: Trophy, color: 'text-yellow-500' },
    { label: t('studyTime'), value: '24h', icon: Clock, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          {t('welcome')}, {user?.displayName.split(' ')[0]} 👋
        </motion.h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{t('summary')}</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{t('popularSubjects')}</h2>
            <Link to="/app/subjects" className="text-sm text-blue-600 font-medium flex items-center gap-1">
              {t('viewAll')} <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SUBJECTS.slice(0, 4).map((subject, idx) => (
              <motion.div
                key={subject.id}
                whileHover={{ y: -4 }}
                className="group p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${subject.color} flex items-center justify-center mb-4`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{subject.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{subject.description}</p>
                <Link to={`/app/subjects/${subject.id}`} className="w-full py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors block text-center">
                  {t('continue')}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar content: Recent Activity & AI Proactive */}
        <div className="space-y-8">
          <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-lg">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              {t('aiAssistant')}
            </h3>
            <p className="text-blue-100 text-sm mb-6">
              Besoin d'aide pour comprendre un exercice de maths ? Je suis là pour vous aider !
            </p>
            <Link to="/app/ai-assistant" className="block w-full py-3 bg-white text-blue-700 rounded-2xl text-center font-bold text-sm shadow-sm hover:bg-blue-50 transition-colors">
              Discuter avec l'AI
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold mb-4">{t('exams')}</h3>
            <div className="space-y-4">
              {[2023, 2022].map(year => (
                <div key={year} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-2xl transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isRTL ? 'text-right' : ''}`}>Mathématiques {year}</p>
                    <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>Session Normale</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/app/exams" className="block w-full text-center mt-6 text-sm font-medium text-gray-500 hover:text-gray-900">
              {t('viewAll')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

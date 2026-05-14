import { motion } from 'motion/react';
import { BookOpen, Search, Filter } from 'lucide-react';
import { SUBJECTS } from '../data/mockData';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'react-router-dom';

export default function Subjects() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('subjects')}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t('subjectProgram')}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')} 
              className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 w-full md:w-64 transition-all text-sm`}
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS.map((subject, idx) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="group p-8 bg-white dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all"
          >
            <div className={`w-16 h-16 rounded-[24px] ${subject.color} flex items-center justify-center mb-6`}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{subject.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              {subject.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {subject.branches.map(branch => (
                <span key={branch} className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {branch}
                </span>
              ))}
            </div>

            <Link 
              to={`/app/subjects/${subject.id}`} 
              className="flex items-center justify-center gap-2 w-full py-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
            >
              {t('viewProgram')}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

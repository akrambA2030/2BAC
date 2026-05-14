import { motion } from 'motion/react';
import { Search, Filter, FileText, Download, Calendar, ExternalLink } from 'lucide-react';
import { EXAMS, SUBJECTS } from '../data/mockData';

export default function Exams() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Examens Nationaux</h1>
          <p className="text-gray-500 dark:text-gray-400">Archives des examens nationaux marocains avec corrections.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Année, matière, branche..." 
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 w-full md:w-64 transition-all text-sm"
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-gray-500">Matière / Année</th>
              <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-gray-500">Session</th>
              <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-gray-500">Option / Branche</th>
              <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {EXAMS.map((exam, idx) => {
              const subject = SUBJECTS.find(s => s.id === exam.subjectId);
              return (
                <motion.tr 
                  key={exam.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${subject?.color || 'bg-gray-100'} text-white`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold">{subject?.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {exam.year}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${exam.session === 'Normale' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {exam.session}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{exam.branch}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 hover:text-blue-600 transition-all" title="Ouvrir">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all text-sm">
                        <Download className="w-4 h-4" /> PDF
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        
        <div className="p-8 text-center bg-gray-50/30 dark:bg-gray-900/30 border-t border-gray-50 dark:border-gray-700">
           <button className="text-sm font-bold text-blue-600 hover:underline">Charger plus d'examens</button>
        </div>
      </div>
    </div>
  );
}

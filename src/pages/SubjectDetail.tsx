import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SUBJECTS, LESSONS } from '../data/mockData';
import { ArrowLeft, Play, CheckCircle, FileText, ChevronRight } from 'lucide-react';

export default function SubjectDetail() {
  const { subjectId } = useParams();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const subjectLessons = LESSONS[subjectId as keyof typeof LESSONS] || [];

  if (!subject) return <div>Matière non trouvée</div>;

  return (
    <div className="space-y-8">
      <header>
        <Link to="/app/subjects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Retour aux matières
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 rounded-3xl ${subject.color} flex items-center justify-center shadow-lg shadow-gray-200 dark:shadow-none`}>
              <FileText className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">{subject.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{subjectLessons.length} Chapitres disponibles</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="flex -space-x-2 mr-2">
                {[1,2,3].map(i => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" />
                ))}
             </div>
             <p className="text-sm font-medium text-gray-500">2.4k étudiants étudient ça</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold mb-4">Programme du cours</h2>
          
          <div className="space-y-4">
            {subjectLessons.map((lesson, idx) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                  {lesson.order}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{lesson.summary}</p>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-gray-200 dark:text-gray-700" />
                  <Link 
                    to={`/app/subjects/${subjectId}/lessons/${lesson.id}`}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all"
                  >
                    <Play className="w-5 h-5 fill-current" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-xl mb-6">Résumé de la matière</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700">
                <span className="text-gray-500">Difficulté</span>
                <span className="font-bold text-orange-500">Moyenne</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700">
                <span className="text-gray-500">Coefficient</span>
                <span className="font-bold">7</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700">
                <span className="text-gray-500">Durée d'examen</span>
                <span className="font-bold">3 Heures</span>
              </div>
            </div>
            
            <button className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              Télécharger le programme PDF <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[40px] border border-blue-100 dark:border-blue-900/30">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4">Quiz d'évaluation</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-6 leading-relaxed">Prêt à tester vos connaissances ? Commencez le quiz global de {subject.name}.</p>
            <button className="w-full py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-2xl font-bold shadow-sm hover:bg-blue-50 transition-all">
              Démarrer le quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

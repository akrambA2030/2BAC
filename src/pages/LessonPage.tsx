import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SUBJECTS, LESSONS } from '../data/mockData';
import { ArrowLeft, Play, FileText, Download, Bookmark, Share2, Bot, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function LessonPage() {
  const { subjectId, lessonId } = useParams();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const lessons = LESSONS[subjectId as keyof typeof LESSONS] || [];
  const lesson = lessons.find(l => l.id === lessonId);

  if (!lesson || !subject) return <div>Leçon non trouvée</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="space-y-4">
          <Link to={`/app/subjects/${subjectId}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Retour au chapitre
          </Link>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider">{subject.name}</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-xs font-bold">Chapitre {lesson.order}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">{lesson.title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
             <Bookmark className="w-5 h-5 text-gray-500" />
           </button>
           <button className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
             <Share2 className="w-5 h-5 text-gray-500" />
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all">
             <Download className="w-5 h-5" /> Télécharger PDF
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
           {/* Video Placeholder */}
           <div className="aspect-video bg-gray-900 rounded-[40px] flex items-center justify-center relative overflow-hidden group">
              <img 
                src={`https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop`} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px] transition-all group-hover:blur-0" 
                alt="Video thumbnail"
                referrerPolicy="no-referrer"
              />
              <div className="p-8 bg-blue-600 rounded-full shadow-2xl relative z-10 scale-125 cursor-pointer hover:scale-150 transition-transform">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">Vidéo explicative</p>
                <p className="text-xl font-bold">{lesson.title}</p>
              </div>
           </div>

           {/* Lesson Content */}
           <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="prose dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-blue">
                <ReactMarkdown>{lesson.content}</ReactMarkdown>
                
                <h2 className="text-2xl font-bold mt-12 mb-6">Résumé du cours</h2>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                  <p className="italic text-blue-900 dark:text-blue-100 leading-relaxed">{lesson.summary}</p>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6">Points clés à retenir</h2>
                <ul className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">Concept important numéro {i} pour réussir votre examen de {subject.name}.</span>
                    </li>
                  ))}
                </ul>
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
           <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
              <Bot className="w-12 h-12 mb-6 opacity-80" />
              <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">Besoin d'une explication ?</h3>
              <p className="text-indigo-100 text-sm mb-8 leading-relaxed">L'AI Academy est prête à vous expliquer n'importe quel point de ce cours.</p>
              <Link to="/app/ai-assistant" className="block w-full py-4 bg-white text-indigo-700 rounded-2xl text-center font-black text-sm hover:bg-blue-50 transition-colors shadow-lg">
                Demander à l'AI
              </Link>
           </div>

           <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm">
             <h3 className="font-bold text-lg mb-6">Prochaines leçons</h3>
              <div className="space-y-6">
                {lessons.filter(l => l.id !== lessonId).map((nextL, idx) => (
                  <Link key={nextL.id} to={`/app/subjects/${subjectId}/lessons/${nextL.id}`} className="group flex gap-4 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 flex-shrink-0 flex items-center justify-center font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                      {nextL.order}
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-blue-600 transition-colors leading-tight">{nextL.title}</p>
                      <p className="text-xs text-gray-400 mt-1">12 min de lecture</p>
                    </div>
                  </Link>
                ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}

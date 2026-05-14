import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, CheckCircle, ArrowRight, ShieldCheck, Zap, BookOpen, Bot } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const handleStart = async () => {
    if (user) {
      navigate('/app/dashboard');
      return;
    }
    try {
      await signIn();
      navigate('/app/dashboard');
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen font-sans">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tighter text-gray-900 dark:text-white">2BAC<span className="text-blue-600">Academy</span></span>
        </div>
        <div className="flex items-center gap-8">
          <button 
            onClick={handleStart}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none"
          >
            {user ? 'Aller au tableau de bord' : 'Commencer gratuitement'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold mb-8"
        >
          <Zap className="w-4 h-4" /> La plateforme #1 pour le Bac au Maroc
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white max-w-4xl tracking-tighter leading-none mb-8"
        >
          Réussissez votre <span className="text-blue-600">National</span> avec confiance et sérénité.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12"
        >
          Accédez à tous les cours, exercices corrigés, résumés et examens nationaux classés.Boostez votre apprentissage avec notre assistant AI dédié.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button 
            onClick={handleStart}
            className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all scale-105 shadow-xl shadow-blue-200 dark:shadow-none"
          >
            {user ? 'Continuer la révision' : 'Commencer la révision'} <ArrowRight className="w-5 h-5" />
          </button>
          <a href="#features" className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full text-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
            En savoir plus
          </a>
        </motion.div>

        {/* Feature list */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
        >
          {[
            { icon: CheckCircle, text: 'Cours 100% à jour' },
            { icon: CheckCircle, text: 'Examens Corrigés' },
            { icon: CheckCircle, text: 'Assistant AI 24/7' },
            { icon: CheckCircle, text: 'Quiz Interactifs' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <item.icon className="w-5 h-5 text-green-500" />
              <span className="font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Feature Sections */}
      <section id="features" className="bg-gray-50 dark:bg-gray-800/50 py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Tout ce dont vous avez besoin au même endroit</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Une expérience d'apprentissage complète conçue spécifiquement pour le système éducatif marocain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Bibliothèque Complète', 
                desc: 'Tous les cours, résumés et formules essentiels pour chaque chapitre des matières scientifiques et littéraires.',
                icon: BookOpen,
                color: 'bg-blue-100 text-blue-600'
              },
              { 
                title: 'Préparation Examen', 
                desc: 'Annales des examens nationaux depuis 2010 avec corrections détaillées et conseils méthodologiques.',
                icon: ShieldCheck,
                color: 'bg-orange-100 text-orange-600'
              },
              { 
                title: 'Tuteur AI Intelligent', 
                desc: 'Une intelligence artificielle entraînée pour expliquer les concepts complexes et résoudre vos exercices étape par étape.',
                icon: Bot,
                color: 'bg-indigo-100 text-indigo-600'
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-10 bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-32 text-center text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[100%] bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[120%] bg-white rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold mb-8 tracking-tighter">Prêt à obtenir votre Bac avec mention ?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12 font-medium">Rejoignez des milliers d'étudiants marocains qui utilisent 2BAC Academy pour leur préparation.</p>
          <button 
            onClick={handleStart}
            className="px-12 py-5 bg-white text-blue-600 rounded-full text-xl font-black shadow-2xl hover:scale-105 transition-all"
          >
            {user ? 'Ouvrir mon tableau de bord' : 'Créer mon compte gratuit'}
          </button>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 dark:border-gray-800 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter text-gray-900 dark:text-white">2BAC Academy</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 2BAC Academy Maroc. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

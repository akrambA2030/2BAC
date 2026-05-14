import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Award, BookOpen, Clock, Settings as SettingsIcon, Edit3 } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="relative py-12">
        <div className="absolute inset-0 bg-blue-600 rounded-[60px] shadow-2xl opacity-10 blur-3xl"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <img 
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&size=200`} 
              className="w-48 h-48 rounded-[60px] border-8 border-white dark:border-gray-800 shadow-2xl object-cover"
              alt="Profile"
            />
            <button className="absolute bottom-4 right-4 p-4 bg-blue-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-transform">
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-5xl font-black tracking-tighter">{user?.displayName}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="px-5 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl text-sm font-bold border border-blue-100 dark:border-blue-900/40 uppercase tracking-widest">Étudiant 2BAC</span>
              <span className="px-5 py-2 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-2xl text-sm font-bold uppercase tracking-widest">Sces Physiques</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-6 text-gray-500 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
           <div className="p-8 bg-white dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm">
             <h3 className="font-bold text-xl mb-6">Badges & Réussites</h3>
             <div className="grid grid-cols-3 gap-4">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className={`aspect-square rounded-2xl ${i < 4 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-300'} flex items-center justify-center`}>
                    <Award className="w-8 h-8" />
                 </div>
               ))}
             </div>
           </div>
        </div>

        <div className="md:col-span-2 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Cours suivis', value: '24', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
                { label: 'Temps total', value: '128h', icon: Clock, color: 'bg-purple-100 text-purple-600' },
              ].map((stat, idx) => (
                <div key={idx} className="p-8 bg-white dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-3xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-black">{stat.value}</p>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              ))}
           </div>

           <div className="p-8 bg-white dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h3 className="font-bold text-xl">Activité Récente</h3>
               <button className="text-sm font-bold text-blue-600">Voir tout</button>
             </div>
             <div className="space-y-6">
               {[
                 { title: 'Mathématiques: Continuité', date: 'il y a 2 heures', score: '85%' },
                 { title: 'Physique: Ondes mécaniques', date: 'Hier', score: '92%' },
                 { title: 'Anglais: Unit 1 Quiz', date: 'il y a 2 jours', score: '78%' }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-3xl transition-all cursor-pointer group">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center font-bold text-gray-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       {item.title[0]}
                     </div>
                     <div>
                       <p className="font-bold group-hover:text-blue-600 transition-colors">{item.title}</p>
                       <p className="text-xs text-gray-400">{item.date}</p>
                     </div>
                   </div>
                   <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl font-black text-sm">
                     {item.score}
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

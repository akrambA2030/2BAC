import { motion } from 'motion/react';
import { Bell, Moon, Shield, Lock, Smartphone, Globe, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { signOut } = useAuth();

  const settingsSections = [
    {
      title: 'Compte & Sécurité',
      items: [
        { icon: Lock, label: 'Changer le mot de passe', desc: 'Renforcez la sécurité de votre compte' },
        { icon: Shield, label: 'Confidentialité', desc: 'Gérez vos données personnelles' },
        { icon: Smartphone, label: 'Appareils connectés', desc: 'Voir les sessions actives' },
      ]
    },
    {
      title: 'Préférences',
      items: [
        { icon: Moon, label: 'Mode sombre', desc: 'Basculer entre clair et sombre', isToggle: true },
        { icon: Bell, label: 'Notifications', desc: 'Gérer les alertes de révision', isToggle: true },
        { icon: Globe, label: 'Langue de l\'interface', desc: 'Français (Maroc)' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header>
        <h1 className="text-4xl font-black tracking-tight mb-2">Paramètres</h1>
        <p className="text-gray-500 dark:text-gray-400">Personnalisez votre expérience 2BAC Academy.</p>
      </header>

      <div className="space-y-12">
        {settingsSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 ml-4">{section.title}</h3>
            <div className="bg-white dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
               {section.items.map((item, iIdx) => (
                 <div key={iIdx} className={`p-8 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all cursor-pointer ${iIdx !== section.items.length - 1 ? 'border-b border-gray-50 dark:border-gray-700' : ''}`}>
                   <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                       <item.icon className="w-6 h-6 text-gray-500" />
                     </div>
                     <div>
                       <p className="font-bold text-lg">{item.label}</p>
                       <p className="text-sm text-gray-500">{item.desc}</p>
                     </div>
                   </div>
                   {item.isToggle ? (
                     <div className="w-14 h-8 bg-blue-600 rounded-full relative p-1 shadow-inner">
                       <div className="w-6 h-6 bg-white rounded-full absolute right-1"></div>
                     </div>
                   ) : (
                     <div className="text-gray-300">
                       <ArrowLeft className="w-5 h-5 rotate-180" />
                     </div>
                   )}
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10">
        <button 
          onClick={signOut}
          className="w-full py-6 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-[40px] font-black flex items-center justify-center gap-3 hover:bg-red-100 transition-all shadow-sm"
        >
          <LogOut className="w-6 h-6" /> Déconnexion du compte
        </button>
      </div>

      <footer className="text-center py-10 space-y-2">
        <p className="text-sm font-bold text-gray-400">2BAC Academy v1.0.0</p>
        <p className="text-xs text-gray-300">Conçu avec Passion pour les étudiants Marocains</p>
      </footer>
    </div>
  );
}

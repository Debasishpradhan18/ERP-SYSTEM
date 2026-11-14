import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ModuleCard = ({ title, icon: Icon, color, link, info = 'More info' }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      style={{ backgroundColor: color }}
      className="group relative rounded-xl p-5 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-28 sm:h-32">
        <div className="flex items-start justify-between">
          <div className="p-2.5 bg-black/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-white/90 group-hover:text-white">
            <span>{info}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;

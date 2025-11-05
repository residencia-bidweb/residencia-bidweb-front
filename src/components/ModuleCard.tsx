import { Shield, AlertTriangle, Key, Wifi, Lock } from 'lucide-react';
import type { Module } from '../lib/supabase';

const iconMap = {
  shield: Shield,
  'alert-triangle': AlertTriangle,
  key: Key,
  wifi: Wifi,
  lock: Lock,
};

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
}

export function ModuleCard({ module, onClick }: ModuleCardProps) {
  const Icon = iconMap[module.icon as keyof typeof iconMap] || Shield;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left transition-all hover:shadow-md hover:border-blue-300 hover:-translate-y-1 group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {module.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {module.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {module.estimated_duration} min
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

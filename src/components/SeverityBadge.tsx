import React from 'react';
import { SeverityScore } from '../types';
import { SEVERITY_DEFINITIONS } from '../data/evaluationData';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';

interface SeverityBadgeProps {
  score: SeverityScore;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  score,
  showText = true,
  size = 'md',
  id,
}) => {
  const def = SEVERITY_DEFINITIONS[score];

  const getStyle = () => {
    switch (score) {
      case 4:
        return 'bg-rose-50 text-rose-800 border-rose-200 ring-rose-500/20';
      case 3:
        return 'bg-amber-50 text-amber-900 border-amber-300 ring-amber-500/20';
      case 2:
        return 'bg-yellow-50 text-yellow-900 border-yellow-300 ring-yellow-500/20';
      case 1:
        return 'bg-sky-50 text-sky-800 border-sky-200 ring-sky-500/20';
      case 0:
      default:
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 ring-emerald-500/20';
    }
  };

  const getIcon = () => {
    switch (score) {
      case 4:
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
      case 3:
        return <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      case 2:
        return <AlertTriangle className="w-3.5 h-3.5 text-yellow-600 shrink-0" />;
      case 1:
        return <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />;
      case 0:
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs font-medium px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-medium px-3 py-1.5 gap-2',
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center rounded-full border shadow-2xs transition-colors ${getStyle()} ${sizeClasses[size]}`}
      title={`Score ${score}: ${def.label} - ${def.description}`}
    >
      {getIcon()}
      <span className="font-semibold tracking-tight">Score {score}</span>
      {showText && <span className="text-opacity-90 font-normal">· {def.label}</span>}
    </span>
  );
};

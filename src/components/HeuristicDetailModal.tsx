import React from 'react';
import { HeuristicEvaluationItem } from '../types';
import { SEVERITY_DEFINITIONS } from '../data/evaluationData';
import { SeverityBadge } from './SeverityBadge';
import { X, Sparkles, AlertTriangle, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';

interface HeuristicDetailModalProps {
  heuristic: HeuristicEvaluationItem | null;
  onClose: () => void;
}

export const HeuristicDetailModal: React.FC<HeuristicDetailModalProps> = ({
  heuristic,
  onClose,
}) => {
  if (!heuristic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-600 text-white font-mono">
                Area #{heuristic.number}
              </span>
              <span className="text-xs font-semibold text-slate-500">{heuristic.heuristicName}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{heuristic.area}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before Analysis */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Before App (Baseline)
                </span>
                <SeverityBadge score={heuristic.beforeSeverity} />
              </div>
              <h4 className="font-bold text-rose-950 text-sm mb-2">{heuristic.problemTitle}</h4>
              <p className="text-xs text-rose-900 leading-relaxed mb-3">
                {heuristic.beforeObservation}
              </p>
              <div className="bg-white/80 rounded-lg p-2.5 border border-rose-200 text-xs text-rose-900">
                <span className="font-semibold text-rose-950">Driver Impact: </span>
                {heuristic.beforeImpact}
              </div>
            </div>

            {/* Improved Solution */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Improved Version
                </span>
                <SeverityBadge score={heuristic.improvedSeverity} />
              </div>
              <h4 className="font-bold text-emerald-950 text-sm mb-2">Usability Enhancement</h4>
              <p className="text-xs text-emerald-900 leading-relaxed mb-3">
                {heuristic.improvedSolution}
              </p>
              <div className="bg-white/80 rounded-lg p-2.5 border border-emerald-200 text-xs text-emerald-900">
                <span className="font-semibold text-emerald-950">User Outcome: </span>
                {heuristic.improvedOutcome}
              </div>
            </div>
          </div>

          {/* Affected UI Elements */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h5 className="font-semibold text-xs text-slate-700 uppercase tracking-wider mb-2">
              Affected UI Components & Touchpoints
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {heuristic.affectedElements.map((el) => (
                <span
                  key={el}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-white border border-slate-300 text-slate-800 shadow-2xs"
                >
                  {el}
                </span>
              ))}
            </div>
          </div>

          {/* Nielsen Norman Group Guideline Note */}
          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-900">
            <span className="font-semibold">Heuristic Principle: </span>
            Systems should empower users with continuous feedback, natural language matching their physical reality, intuitive control with immediate undo mechanisms, and transparent error prevention.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};

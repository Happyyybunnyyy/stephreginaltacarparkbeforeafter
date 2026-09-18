import React from 'react';
import {
  ShieldAlert,
  Sparkles,
  Zap,
  TrendingDown,
  CheckCircle,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { HEURISTIC_EVALUATION_DATA } from '../data/evaluationData';

interface SummaryCardsProps {
  onScrollToTable: () => void;
  onScrollToCompare: () => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  onScrollToTable,
  onScrollToCompare,
}) => {
  const criticalCount = HEURISTIC_EVALUATION_DATA.filter((i) => i.beforeSeverity === 4).length;
  const majorCount = HEURISTIC_EVALUATION_DATA.filter((i) => i.beforeSeverity === 3).length;
  const minorCount = HEURISTIC_EVALUATION_DATA.filter((i) => i.beforeSeverity === 2).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Before Baseline Status */}
      <div className="bg-white rounded-2xl p-5 border border-rose-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-rose-50 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            Baseline (Before)
          </span>
          <span className="text-xs text-rose-700 font-mono font-bold">Score 2.8 / 4.0 Avg</span>
        </div>
        <h3 className="text-base font-bold text-slate-900">
          8 of 10 Heuristics Breached
        </h3>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          Critical bottlenecks in sorting, silent refresh failures, cryptic database codes (C23, DEV_ID), and missing 1-click filter undo.
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-rose-600 font-bold">{criticalCount} Critical</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-600 font-bold">{majorCount} Major</span>
            <span className="text-slate-300">·</span>
            <span className="text-yellow-600 font-bold">{minorCount} Minor</span>
          </div>
          <a
            href="https://ltacarpark18sept.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1"
          >
            <span>Original URL</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Card 2: Improved App Status */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-50 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Improved (Steph Regina)
          </span>
          <span className="text-xs text-emerald-700 font-mono font-bold">Score 0.0 / 4.0 Avg</span>
        </div>
        <h3 className="text-base font-bold text-slate-900">
          100% Usability Compliance
        </h3>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          Real-time status relative timestamps, 1-tap Available Only filter, visual capacity bars, instant undo/reset, and natural Singapore district tags.
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            10 / 10 Criteria Satisfied
          </span>
          <a
            href="https://stephreginaltacarparkbeforeafter.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1"
          >
            <span>Improved URL</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Card 3: Quick Navigation & Actions */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Interactive Verification</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Audit Mode & Live Comparator
          </h3>
          <p className="text-xs text-indigo-200 mt-1 leading-relaxed">
            Directly test both applications below. Filter carparks, trigger empty states, test reset buttons, and inspect heuristic touchpoints.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-indigo-800/80 flex items-center gap-2">
          <button
            onClick={onScrollToCompare}
            className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-xs text-center"
          >
            Launch Comparator
          </button>
          <button
            onClick={onScrollToTable}
            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-indigo-200 rounded-lg text-xs font-medium transition cursor-pointer border border-indigo-700/60"
          >
            View Table
          </button>
        </div>
      </div>
    </div>
  );
};

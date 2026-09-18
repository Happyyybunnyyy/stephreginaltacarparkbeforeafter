import React from 'react';
import { HeuristicEvaluationItem } from '../types';
import { HEURISTIC_EVALUATION_DATA } from '../data/evaluationData';
import { SeverityBadge } from './SeverityBadge';
import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  MousePointerClick,
  ExternalLink,
} from 'lucide-react';

interface ProblemSolutionNavigatorProps {
  selectedHeuristic: HeuristicEvaluationItem | null;
  onSelectHeuristic: (heuristic: HeuristicEvaluationItem) => void;
  onScrollToCompare: () => void;
}

export const ProblemSolutionNavigator: React.FC<ProblemSolutionNavigatorProps> = ({
  selectedHeuristic,
  onSelectHeuristic,
  onScrollToCompare,
}) => {
  const activeItem = selectedHeuristic || HEURISTIC_EVALUATION_DATA[0];

  const handleNext = () => {
    const currentIndex = HEURISTIC_EVALUATION_DATA.findIndex((h) => h.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % HEURISTIC_EVALUATION_DATA.length;
    onSelectHeuristic(HEURISTIC_EVALUATION_DATA[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = HEURISTIC_EVALUATION_DATA.findIndex((h) => h.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + HEURISTIC_EVALUATION_DATA.length) % HEURISTIC_EVALUATION_DATA.length;
    onSelectHeuristic(HEURISTIC_EVALUATION_DATA[prevIndex]);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              Interactive Navigator
            </span>
            <span className="text-xs text-slate-300">Nielsen Norman Usability Framework</span>
          </div>
          <h3 className="text-xl font-extrabold tracking-tight text-white mt-1 flex items-center gap-2">
            <MousePointerClick className="w-5 h-5 text-indigo-400" />
            <span>Areas of Problems & Improved Solutions (Side-by-Side)</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Click any button below to instantly inspect the problem against its improved counterpart and spotlight the difference in the live apps.
          </p>
        </div>

        {/* Quick Jump to comparator button */}
        <button
          onClick={onScrollToCompare}
          className="self-start md:self-center px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition shadow-sm cursor-pointer"
        >
          <span>Jump to Live Comparator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Side-by-Side 10 Areas Buttons Grid */}
      <div className="p-4 sm:p-6 bg-slate-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* LEFT COLUMN: Before (Original Problem Areas) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-2 py-1 bg-rose-50 border border-rose-200 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="font-bold text-xs text-rose-900 uppercase tracking-wide">
                  Before: Problem Areas (Original 18 Sept Build)
                </span>
              </div>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                8 Breaches Identified
              </span>
            </div>

            <div className="space-y-2">
              {HEURISTIC_EVALUATION_DATA.map((item) => {
                const isSelected = activeItem.id === item.id;
                return (
                  <button
                    key={`before-${item.id}`}
                    onClick={() => onSelectHeuristic(item)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                      isSelected
                        ? 'bg-rose-50/90 border-rose-400 shadow-sm ring-2 ring-rose-500/20'
                        : 'bg-white hover:bg-rose-50/40 border-slate-200 text-slate-700 hover:border-rose-200'
                    }`}
                  >
                    {/* Heuristic Number Tag */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      H{item.number}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-xs text-slate-900 truncate">
                          {item.area}
                        </div>
                        <SeverityBadge score={item.beforeSeverity} size="sm" showText={false} />
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                        <strong className="text-rose-900 font-semibold">Problem: </strong>
                        {item.problemTitle}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-rose-500 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Improved (Steph Regina Solution Areas) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold text-xs text-emerald-900 uppercase tracking-wide">
                  Improved: Solutions (Steph Regina Edition)
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                10/10 Solved (Score: 0)
              </span>
            </div>

            <div className="space-y-2">
              {HEURISTIC_EVALUATION_DATA.map((item) => {
                const isSelected = activeItem.id === item.id;
                return (
                  <button
                    key={`improved-${item.id}`}
                    onClick={() => onSelectHeuristic(item)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-400 shadow-sm ring-2 ring-emerald-500/20'
                        : 'bg-white hover:bg-emerald-50/40 border-slate-200 text-slate-700 hover:border-emerald-200'
                    }`}
                  >
                    {/* Solved Tag */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-xs text-slate-900 truncate">
                          {item.heuristicName}
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Score 0 · Solved
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                        <strong className="text-emerald-900 font-semibold">Solution: </strong>
                        {item.improvedSolution}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-500 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE SELECTION SIDE-BY-SIDE EXPANDED BREAKDOWN PANEL */}
      <div className="border-t border-slate-200 p-5 sm:p-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs">
              Selected: Heuristic #{activeItem.number}
            </span>
            <h4 className="font-extrabold text-base text-slate-900">
              {activeItem.area}
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              ({activeItem.heuristicName})
            </span>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition flex items-center gap-1 text-xs cursor-pointer"
              title="Previous problem area"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <span className="text-xs text-slate-400 font-mono px-1">
              {activeItem.number} / 10
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition flex items-center gap-1 text-xs cursor-pointer"
              title="Next problem area"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onScrollToCompare}
              className="ml-2 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Below</span>
            </button>
          </div>
        </div>

        {/* Side by side comparison card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Problem Card (Left) */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wide text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Original Problem (Baseline)
              </span>
              <SeverityBadge score={activeItem.beforeSeverity} size="sm" />
            </div>

            <h5 className="font-bold text-sm text-slate-900 leading-snug">
              {activeItem.problemTitle}
            </h5>

            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Observation:</span>
                <p className="leading-relaxed bg-white/70 p-2 rounded border border-rose-100">
                  {activeItem.beforeObservation}
                </p>
              </div>

              <div>
                <span className="font-bold text-rose-900 block mb-0.5">User Impact / Friction:</span>
                <p className="leading-relaxed text-rose-800 italic">
                  "{activeItem.beforeImpact}"
                </p>
              </div>
            </div>
          </div>

          {/* Improved Solution Card (Right) */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wide text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Improved Solution (Steph Regina)
              </span>
              <SeverityBadge score={activeItem.improvedSeverity} size="sm" />
            </div>

            <h5 className="font-bold text-sm text-slate-900 leading-snug">
              {activeItem.improvedSolution}
            </h5>

            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Design Solution & Implementation:</span>
                <p className="leading-relaxed bg-white/70 p-2 rounded border border-emerald-100">
                  {activeItem.improvedSolution}
                </p>
              </div>

              <div>
                <span className="font-bold text-emerald-900 block mb-0.5">Measurable Outcome:</span>
                <p className="leading-relaxed text-emerald-900 italic">
                  "{activeItem.improvedOutcome}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

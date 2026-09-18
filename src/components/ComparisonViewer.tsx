import React, { useState } from 'react';
import { HeuristicEvaluationItem, ViewMode } from '../types';
import { HEURISTIC_EVALUATION_DATA } from '../data/evaluationData';
import { BeforeAppView } from './BeforeAppView';
import { ImprovedAppView } from './ImprovedAppView';
import {
  Columns,
  Square,
  ExternalLink,
  Info,
  Maximize2,
  Minimize2,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  X,
  CheckCircle2,
} from 'lucide-react';

interface ComparisonViewerProps {
  selectedHeuristic: HeuristicEvaluationItem | null;
  onSelectHeuristic?: (heuristic: HeuristicEvaluationItem) => void;
  onClearSelectedHeuristic: () => void;
  onOpenLegend: () => void;
}

export const ComparisonViewer: React.FC<ComparisonViewerProps> = ({
  selectedHeuristic,
  onSelectHeuristic,
  onClearSelectedHeuristic,
  onOpenLegend,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className={`bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen ? 'fixed inset-3 z-50 bg-slate-950' : 'min-h-[700px]'
      }`}
    >
      {/* Top Controller Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h3 className="font-bold text-sm text-slate-100">
              Interactive Carpark Usability Comparison
            </h3>
          </div>
          <span className="text-xs text-slate-400 hidden md:inline">
            Side-by-side verification of LTA DataMall user experience
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition font-medium cursor-pointer ${
                viewMode === 'split' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split Comparison</span>
            </button>
            <button
              onClick={() => setViewMode('before')}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition font-medium cursor-pointer ${
                viewMode === 'before' ? 'bg-rose-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Before (Baseline)</span>
            </button>
            <button
              onClick={() => setViewMode('improved')}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition font-medium cursor-pointer ${
                viewMode === 'improved' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Improved (Steph Regina)</span>
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer border border-slate-700"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Compare'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Problem Areas Navigation Bar in Button Form */}
      <div className="bg-slate-900/95 px-4 py-2 border-b border-slate-800/90 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Area Buttons:</span>
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {HEURISTIC_EVALUATION_DATA.map((h) => {
            const isSelected = selectedHeuristic?.id === h.id;
            return (
              <button
                key={`comp-btn-${h.id}`}
                onClick={() => {
                  if (isSelected) {
                    onClearSelectedHeuristic();
                  } else {
                    onSelectHeuristic?.(h);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
                title={`H${h.number}: ${h.area}\nClick to toggle spotlight in both screens`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300 animate-pulse' : 'bg-slate-400'}`}></span>
                <span>H{h.number}</span>
                <span className="hidden sm:inline text-[11px] opacity-80">{h.area.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Heuristic Inspection Banner if selected with Side-by-Side Problem vs Solution */}
      {selectedHeuristic && (
        <div className="bg-indigo-950/95 border-b border-indigo-800/80 px-4 py-3 text-xs text-indigo-200">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-indigo-500 text-white font-bold font-mono text-[11px]">
                Heuristic #{selectedHeuristic.number} Focused
              </span>
              <span className="font-extrabold text-white text-sm">{selectedHeuristic.area}</span>
              <span className="text-indigo-300 text-[11px]">({selectedHeuristic.heuristicName})</span>
            </div>

            <button
              onClick={onClearSelectedHeuristic}
              className="px-2.5 py-1 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-300 hover:text-white rounded-lg text-xs transition cursor-pointer border border-indigo-700/60 flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Clear Focus</span>
            </button>
          </div>

          {/* Side-by-Side Problem vs Solution preview pill boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1 text-[11px]">
            <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-800/80 text-rose-100 flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0"></span>
              <div>
                <strong className="text-rose-300 font-bold block mb-0.5">Left / Before Problem:</strong>
                <p className="line-clamp-2 text-rose-100/90">{selectedHeuristic.problemTitle}</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-100 flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-emerald-300 font-bold block mb-0.5">Right / Improved Solution:</strong>
                <p className="line-clamp-2 text-emerald-100/90">{selectedHeuristic.improvedSolution}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vercel Deployment Link Notice Bar */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>
            Comparing original build vs improved right version. If Vercel SSO is enabled on preview URLs, open via direct links below:
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://ltacarpark18sept.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
          >
            <span>Before URL</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-600">vs</span>
          <a
            href="https://stephreginaltacarparkbeforeafter.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
          >
            <span>Improved URL (Steph Regina)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Comparison Main Area */}
      <div className="flex-1 p-3 bg-slate-950/60 overflow-hidden">
        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
            {/* Left Column: Before (Baseline) */}
            <div className="flex flex-col h-full min-h-[580px]">
              <div className="mb-2 flex items-center justify-between text-xs px-1">
                <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Left: Before (Original LTA Carpark)
                </span>
                <span className="text-slate-400 text-[11px]">8 Usability Breaches Identified</span>
              </div>
              <div className="flex-1 min-h-0">
                <BeforeAppView highlightedHeuristicId={selectedHeuristic?.id} />
              </div>
            </div>

            {/* Right Column: Improved (Steph Regina Edition) */}
            <div className="flex flex-col h-full min-h-[580px]">
              <div className="mb-2 flex items-center justify-between text-xs px-1">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Right: Improved Version (Steph Regina LTA Carpark)
                </span>
                <span className="text-emerald-400/80 text-[11px]">All 10 Heuristics Satisfied</span>
              </div>
              <div className="flex-1 min-h-0">
                <ImprovedAppView
                  highlightedHeuristicId={selectedHeuristic?.id}
                  onOpenLegend={onOpenLegend}
                />
              </div>
            </div>
          </div>
        ) : viewMode === 'before' ? (
          <div className="h-full min-h-[580px]">
            <BeforeAppView highlightedHeuristicId={selectedHeuristic?.id} />
          </div>
        ) : (
          <div className="h-full min-h-[580px]">
            <ImprovedAppView
              highlightedHeuristicId={selectedHeuristic?.id}
              onOpenLegend={onOpenLegend}
            />
          </div>
        )}
      </div>
    </div>
  );
};

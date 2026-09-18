import React, { useState } from 'react';
import { HeuristicEvaluationItem, ViewMode } from '../types';
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
} from 'lucide-react';

interface ComparisonViewerProps {
  selectedHeuristic: HeuristicEvaluationItem | null;
  onClearSelectedHeuristic: () => void;
  onOpenLegend: () => void;
}

export const ComparisonViewer: React.FC<ComparisonViewerProps> = ({
  selectedHeuristic,
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

      {/* Active Heuristic Inspection Banner if selected */}
      {selectedHeuristic && (
        <div className="bg-indigo-950/90 border-b border-indigo-800/80 px-4 py-2.5 flex items-center justify-between text-xs text-indigo-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-indigo-500 text-white font-bold font-mono">
              Heuristic #{selectedHeuristic.number}
            </span>
            <span className="font-bold text-white text-sm">{selectedHeuristic.area}:</span>
            <span className="text-indigo-200">{selectedHeuristic.problemTitle}</span>
          </div>

          <button
            onClick={onClearSelectedHeuristic}
            className="px-2 py-1 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-300 rounded text-xs transition cursor-pointer border border-indigo-700/60"
          >
            Clear Focus
          </button>
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

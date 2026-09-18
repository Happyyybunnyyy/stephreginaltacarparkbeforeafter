import React, { useState, useRef } from 'react';
import { HeuristicEvaluationItem } from './types';
import { SummaryCards } from './components/SummaryCards';
import { HeuristicsTable } from './components/HeuristicsTable';
import { ComparisonViewer } from './components/ComparisonViewer';
import { HeuristicDetailModal } from './components/HeuristicDetailModal';
import { LegendModal } from './components/LegendModal';
import {
  Car,
  ExternalLink,
  Info,
  CheckCircle2,
  Table as TableIcon,
  Columns,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [selectedHeuristic, setSelectedHeuristic] = useState<HeuristicEvaluationItem | null>(null);
  const [detailModalHeuristic, setDetailModalHeuristic] = useState<HeuristicEvaluationItem | null>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);

  const handleSelectHeuristicFromTable = (item: HeuristicEvaluationItem) => {
    setSelectedHeuristic(item);
    // Smooth scroll to comparison viewer to visually inspect
    compareRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTable = () => {
    tableRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCompare = () => {
    compareRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-slate-900">
                  LTA Carpark Usability Comparison
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  10 Heuristics Audit
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Baseline (18 Sept) vs Improved Version (Steph Regina)
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollToTable}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Findings Table</span>
            </button>
            <button
              onClick={scrollToCompare}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
            <button
              onClick={() => setIsLegendOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition cursor-pointer shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              <span>Scoring Scale</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner with context */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Usability Heuristic Benchmark Evaluation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Comparative Analysis: LTA Carpark Usability
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Rigorous evaluation comparing the baseline <strong>LTA Carpark app (18 Sept build)</strong> against the <strong>improved Steph Regina version</strong> on the right. Evaluated across all 10 Nielsen usability heuristics with severity ratings from 0 (Not a problem) to 4 (Critical problem).
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
              <a
                href="https://ltacarpark18sept-nv7j41k07-happyyybunnyyys-projects.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800 transition"
              >
                <span>Before App (18 Sept)</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://stephreginaltacarparkbeforeafter.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 transition"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Improved App (Steph Regina)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Top Summary Cards */}
        <SummaryCards
          onScrollToTable={scrollToTable}
          onScrollToCompare={scrollToCompare}
        />

        {/* Section 1: Findings Table (Explicitly requested by user) */}
        <div ref={tableRef} className="scroll-mt-20">
          <HeuristicsTable
            onSelectHeuristic={handleSelectHeuristicFromTable}
            selectedHeuristicId={selectedHeuristic?.id}
          />
        </div>

        {/* Section 2: Interactive Side-by-Side Comparison Viewer */}
        <div ref={compareRef} className="scroll-mt-20 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-600 text-white">
                  Live Comparator
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Interactive Side-by-Side Usability Testing
                </h3>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Test and interact with both versions. Click "Inspect" in the table above to spotlight the corresponding touchpoints.
              </p>
            </div>
          </div>

          <ComparisonViewer
            selectedHeuristic={selectedHeuristic}
            onClearSelectedHeuristic={() => setSelectedHeuristic(null)}
            onOpenLegend={() => setIsLegendOpen(true)}
          />
        </div>
      </main>

      {/* Modals */}
      <HeuristicDetailModal
        heuristic={detailModalHeuristic}
        onClose={() => setDetailModalHeuristic(null)}
      />

      <LegendModal
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>
              LTA Singapore Carpark Usability Comparison · Nielsen Norman Group 10 Heuristics Framework
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Score Scale: 0 (No Problem) to 4 (Critical)</span>
            <span>·</span>
            <button
              onClick={() => setIsLegendOpen(true)}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              View Guidance Legend
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

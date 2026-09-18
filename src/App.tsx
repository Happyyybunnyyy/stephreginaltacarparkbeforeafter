import React, { useState, useRef } from 'react';
import { HeuristicEvaluationItem } from './types';
import { SummaryCards } from './components/SummaryCards';
import { HeuristicsTable } from './components/HeuristicsTable';
import { ComparisonViewer } from './components/ComparisonViewer';
import { ProblemSolutionNavigator } from './components/ProblemSolutionNavigator';
import { FeelFreeYourThoughtsSection } from './components/FeelFreeYourThoughtsSection';
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
  MousePointerClick,
  MessageSquare,
} from 'lucide-react';

export default function App() {
  const [selectedHeuristic, setSelectedHeuristic] = useState<HeuristicEvaluationItem | null>(null);
  const [detailModalHeuristic, setDetailModalHeuristic] = useState<HeuristicEvaluationItem | null>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);
  const navigatorRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const thoughtsRef = useRef<HTMLDivElement>(null);

  const handleSelectHeuristicFromTable = (item: HeuristicEvaluationItem) => {
    setSelectedHeuristic(item);
    compareRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectHeuristicFromNavigator = (item: HeuristicEvaluationItem) => {
    setSelectedHeuristic(item);
  };

  const scrollToTable = () => {
    tableRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNavigator = () => {
    navigatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCompare = () => {
    compareRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToThoughts = () => {
    thoughtsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-slate-900">
                  LTA Carpark Usability Comparison
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  10 Heuristics
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Baseline (18 Sept) vs Improved Version (Steph Regina)
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollToNavigator}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100/90 rounded-lg transition cursor-pointer border border-indigo-200"
            >
              <MousePointerClick className="w-3.5 h-3.5 text-indigo-600" />
              <span>Problem & Solutions</span>
            </button>
            <button
              onClick={scrollToTable}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Findings</span>
            </button>
            <button
              onClick={scrollToCompare}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Comparator</span>
            </button>
            <button
              onClick={scrollToThoughts}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Leave your comments here! :)</span>
            </button>
            <button
              onClick={() => setIsLegendOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition cursor-pointer shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Scoring Scale</span>
              <span className="sm:hidden">Scale</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
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
                href="https://ltacarpark18sept.vercel.app/"
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

              <button
                onClick={scrollToThoughts}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3 h-3 text-indigo-200" />
                <span>Leave your comments here! :)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Top Summary Cards */}
        <SummaryCards
          onScrollToTable={scrollToTable}
          onScrollToCompare={scrollToCompare}
        />

        {/* Section 1: Findings Table */}
        <div ref={tableRef} className="scroll-mt-20">
          <HeuristicsTable
            onSelectHeuristic={handleSelectHeuristicFromTable}
            selectedHeuristicId={selectedHeuristic?.id}
          />
        </div>

        {/* Section 2: Areas of Problems vs Improved Solutions (Side-by-Side in Button Form) */}
        <div ref={navigatorRef} className="scroll-mt-20">
          <ProblemSolutionNavigator
            selectedHeuristic={selectedHeuristic}
            onSelectHeuristic={handleSelectHeuristicFromNavigator}
            onScrollToCompare={scrollToCompare}
          />
        </div>

        {/* Section 3: Interactive Side-by-Side Comparison Viewer */}
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
                Test and interact with both versions. Click any area button above to spotlight the corresponding touchpoints in real time.
              </p>
            </div>
          </div>

          <ComparisonViewer
            selectedHeuristic={selectedHeuristic}
            onSelectHeuristic={handleSelectHeuristicFromNavigator}
            onClearSelectedHeuristic={() => setSelectedHeuristic(null)}
            onOpenLegend={() => setIsLegendOpen(true)}
          />
        </div>

        {/* Section 4: Lowest bottom of the page - Feel free your thoughts (Disqus) */}
        <div ref={thoughtsRef}>
          <FeelFreeYourThoughtsSection />
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
          <div className="flex items-center gap-4 text-slate-400 flex-wrap">
            <button
              onClick={scrollToTable}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              Findings Table
            </button>
            <span>·</span>
            <button
              onClick={scrollToCompare}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              Side-by-Side Comparator
            </button>
            <span>·</span>
            <button
              onClick={scrollToThoughts}
              className="hover:text-indigo-600 transition cursor-pointer text-indigo-600 font-bold"
            >
              Leave your comments here! :)
            </button>
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

import React, { useState } from 'react';
import { HeuristicEvaluationItem, SeverityScore } from '../types';
import { HEURISTIC_EVALUATION_DATA, SEVERITY_DEFINITIONS } from '../data/evaluationData';
import { SeverityBadge } from './SeverityBadge';
import {
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Download,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface HeuristicsTableProps {
  onSelectHeuristic: (heuristic: HeuristicEvaluationItem) => void;
  selectedHeuristicId?: string | null;
}

export const HeuristicsTable: React.FC<HeuristicsTableProps> = ({
  onSelectHeuristic,
  selectedHeuristicId,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredData = HEURISTIC_EVALUATION_DATA.filter((item) => {
    if (filterSeverity !== 'ALL') {
      const targetScore = parseInt(filterSeverity, 10);
      if (item.beforeSeverity !== targetScore) return false;
    }
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.area.toLowerCase().includes(q) ||
      item.problemTitle.toLowerCase().includes(q) ||
      item.beforeObservation.toLowerCase().includes(q) ||
      item.improvedSolution.toLowerCase().includes(q)
    );
  });

  // Calculate scores
  const beforeAvg = (
    HEURISTIC_EVALUATION_DATA.reduce((acc, curr) => acc + curr.beforeSeverity, 0) /
    HEURISTIC_EVALUATION_DATA.length
  ).toFixed(1);

  const improvedAvg = (
    HEURISTIC_EVALUATION_DATA.reduce((acc, curr) => acc + curr.improvedSeverity, 0) /
    HEURISTIC_EVALUATION_DATA.length
  ).toFixed(1);

  const criticalCount = HEURISTIC_EVALUATION_DATA.filter((i) => i.beforeSeverity === 4).length;
  const majorCount = HEURISTIC_EVALUATION_DATA.filter((i) => i.beforeSeverity === 3).length;
  const minorCount = HEURISTIC_EVALUATION_DATA.filter((i) => i.beforeSeverity === 2).length;

  const handleCopyMarkdown = () => {
    let md = `| # | Usability Area | Before Problem | Before Score | Improved Solution | Improved Score | Status |\n`;
    md += `|---|---|---|---|---|---|---|\n`;
    HEURISTIC_EVALUATION_DATA.forEach((item) => {
      md += `| ${item.number} | **${item.area}** | ${item.problemTitle} | Score ${item.beforeSeverity} (${SEVERITY_DEFINITIONS[item.beforeSeverity].label}) | ${item.improvedSolution.slice(0, 80)}... | Score ${item.improvedSeverity} (${SEVERITY_DEFINITIONS[item.improvedSeverity].label}) | Resolved ✅ |\n`;
    });

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadCSV = () => {
    const headers = [
      'Number',
      'Usability Area',
      'Problem Title',
      'Before Severity Score',
      'Before Severity Label',
      'Before Observation',
      'Before User Impact',
      'Improved Severity Score',
      'Improved Severity Label',
      'Improved Solution',
      'Improved Outcome',
    ];

    const rows = HEURISTIC_EVALUATION_DATA.map((item) => [
      item.number,
      `"${item.area.replace(/"/g, '""')}"`,
      `"${item.problemTitle.replace(/"/g, '""')}"`,
      item.beforeSeverity,
      `"${SEVERITY_DEFINITIONS[item.beforeSeverity].label}"`,
      `"${item.beforeObservation.replace(/"/g, '""')}"`,
      `"${item.beforeImpact.replace(/"/g, '""')}"`,
      item.improvedSeverity,
      `"${SEVERITY_DEFINITIONS[item.improvedSeverity].label}"`,
      `"${item.improvedSolution.replace(/"/g, '""')}"`,
      `"${item.improvedOutcome.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'LTA_Carpark_Usability_Heuristic_Evaluation.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
              10 Usability Areas Evaluated
            </span>
            <span className="text-xs text-slate-500 font-medium">Nielsen Heuristics Framework</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Usability Heuristic Findings & Scoring Table
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
            Detailed evaluation comparing the baseline LTA Carpark app against the improved Steph Regina version across all 10 standard usability criteria, scored from 0 (Not a problem) to 4 (Critical problem).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyMarkdown}
            className="px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs flex items-center gap-1.5 transition cursor-pointer"
            title="Copy table formatted as Markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied MD' : 'Copy Table'}</span>
          </button>

          <button
            onClick={handleDownloadCSV}
            className="px-3 py-2 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg shadow-2xs flex items-center gap-1.5 transition cursor-pointer"
            title="Export CSV data"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Score Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-200 border-b border-slate-200 bg-white">
        <div className="p-4">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Before Avg Severity</div>
          <div className="text-2xl font-black text-rose-600 mt-1 flex items-baseline gap-1.5">
            <span>{beforeAvg}</span>
            <span className="text-xs text-slate-400 font-normal">/ 4.0</span>
          </div>
          <div className="text-[11px] text-rose-700 mt-0.5 font-medium">Major friction detected</div>
        </div>

        <div className="p-4">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Improved Avg Severity</div>
          <div className="text-2xl font-black text-emerald-600 mt-1 flex items-baseline gap-1.5">
            <span>{improvedAvg}</span>
            <span className="text-xs text-slate-400 font-normal">/ 4.0</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">All 10 areas addressed</div>
        </div>

        <div className="p-4">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">High Risk Problems</div>
          <div className="text-2xl font-black text-slate-800 mt-1 flex items-baseline gap-1.5">
            <span>{criticalCount + majorCount}</span>
            <span className="text-xs text-slate-400 font-normal">of 10</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-medium">1 Critical, 7 Major</div>
        </div>

        <div className="p-4">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Resolution Status</div>
          <div className="text-2xl font-black text-indigo-600 mt-1 flex items-baseline gap-1.5">
            <span>100%</span>
            <CheckCircle2 className="w-5 h-5 text-indigo-600 inline ml-1" />
          </div>
          <div className="text-[11px] text-indigo-700 mt-0.5 font-medium">All 10 resolved in Improved</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">Filter Severity:</span>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', '4', '3', '2', '1', '0'].map((val) => (
              <button
                key={val}
                onClick={() => setFilterSeverity(val)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  filterSeverity === val
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {val === 'ALL' ? 'All (10)' : `Score ${val}`}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems or solutions..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-slate-100/90 text-slate-700 uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4 min-w-[200px]">Usability Area</th>
              <th className="py-3 px-4 min-w-[260px]">Before Problem & Impact</th>
              <th className="py-3 px-3 text-center min-w-[130px]">Before Score</th>
              <th className="py-3 px-4 min-w-[280px]">Improved Version Solution</th>
              <th className="py-3 px-3 text-center min-w-[130px]">Improved Score</th>
              <th className="py-3 px-3 text-center min-w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredData.map((item) => {
              const isSelected = selectedHeuristicId === item.id;
              const isExpanded = expandedRows[item.id];

              return (
                <React.Fragment key={item.id}>
                  <tr
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/70 border-l-4 border-l-indigo-600'
                        : 'hover:bg-slate-50/80'
                    }`}
                    onClick={() => onSelectHeuristic(item)}
                  >
                    {/* Index */}
                    <td className="py-3 px-4 text-center font-bold text-slate-600">
                      {item.number}
                    </td>

                    {/* Area Name */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm">{item.area}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{item.heuristicName}</div>
                    </td>

                    {/* Before Observation */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-rose-950 text-xs mb-1">
                        {item.problemTitle}
                      </div>
                      <p className="text-slate-600 line-clamp-2 text-[11px] leading-relaxed">
                        {item.beforeObservation}
                      </p>
                      {isExpanded && (
                        <div className="mt-2 p-2 bg-rose-50/80 rounded border border-rose-100 text-[11px] text-rose-900">
                          <span className="font-semibold">Driver Impact: </span>
                          {item.beforeImpact}
                        </div>
                      )}
                    </td>

                    {/* Before Score */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <SeverityBadge score={item.beforeSeverity} />
                    </td>

                    {/* Improved Solution */}
                    <td className="py-3 px-4">
                      <div className="flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-slate-800 text-xs leading-relaxed">
                            {item.improvedSolution}
                          </p>
                          {isExpanded && (
                            <div className="mt-2 p-2 bg-emerald-50/80 rounded border border-emerald-100 text-[11px] text-emerald-900">
                              <span className="font-semibold">User Outcome: </span>
                              {item.improvedOutcome}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Improved Score */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <SeverityBadge score={item.improvedSeverity} />
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(item.id);
                          }}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded transition cursor-pointer"
                          title={isExpanded ? 'Collapse details' : 'Expand full details'}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectHeuristic(item);
                          }}
                          className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium flex items-center gap-1 shadow-2xs transition cursor-pointer"
                          title="View this heuristic in the comparison view"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer explanation of Scoring Scale */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs">
        <div className="font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
          <span>Usability Problem Severity Scoring Reference (Nielsen Scale 0–4):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px]">
          <div className="flex items-start gap-1.5 p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-950">
            <span className="font-bold">0:</span>
            <span>Not a usability problem; satisfies heuristic.</span>
          </div>
          <div className="flex items-start gap-1.5 p-2 rounded bg-sky-50 border border-sky-200 text-sky-950">
            <span className="font-bold">1:</span>
            <span>Cosmetic issue; fix if time allows.</span>
          </div>
          <div className="flex items-start gap-1.5 p-2 rounded bg-yellow-50 border border-yellow-200 text-yellow-950">
            <span className="font-bold">2:</span>
            <span>Minor problem; low priority.</span>
          </div>
          <div className="flex items-start gap-1.5 p-2 rounded bg-amber-50 border border-amber-200 text-amber-950">
            <span className="font-bold">3:</span>
            <span>Major problem; high priority.</span>
          </div>
          <div className="flex items-start gap-1.5 p-2 rounded bg-rose-50 border border-rose-200 text-rose-950">
            <span className="font-bold">4:</span>
            <span>Critical problem; must fix before release.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

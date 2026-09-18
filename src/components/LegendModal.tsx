import React from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Info, ShieldAlert } from 'lucide-react';
import { SEVERITY_DEFINITIONS } from '../data/evaluationData';

interface LegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegendModal: React.FC<LegendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">
              Scoring System & Usability Legend
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Section 1: Severity Scoring Scale (0 to 4) */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-3">
              1. Usability Severity Scoring Scale (0–4)
            </h4>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded font-black text-xs bg-emerald-600 text-white font-mono">
                  Score 0
                </span>
                <div>
                  <div className="font-bold text-emerald-950">Not a usability problem</div>
                  <div className="text-emerald-900 mt-0.5">
                    The interface satisfies user expectations; no design action needed.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded font-black text-xs bg-sky-600 text-white font-mono">
                  Score 1
                </span>
                <div>
                  <div className="font-bold text-sky-950">Cosmetic issue only</div>
                  <div className="text-sky-900 mt-0.5">
                    Need not be fixed unless extra time is available on project.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-300 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded font-black text-xs bg-yellow-600 text-white font-mono">
                  Score 2
                </span>
                <div>
                  <div className="font-bold text-yellow-950">Minor usability problem</div>
                  <div className="text-yellow-900 mt-0.5">
                    Fixing this should be given low priority; causes minor irritation.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded font-black text-xs bg-amber-600 text-white font-mono">
                  Score 3
                </span>
                <div>
                  <div className="font-bold text-amber-950">Major usability problem</div>
                  <div className="text-amber-900 mt-0.5">
                    Important to fix, so should be given high priority. Significantly delays driver tasks.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded font-black text-xs bg-rose-600 text-white font-mono">
                  Score 4
                </span>
                <div>
                  <div className="font-bold text-rose-950">Usability catastrophe</div>
                  <div className="text-rose-900 mt-0.5">
                    Imperative to fix before release. Blocks user from finding parking or causes task failure.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Singapore Carpark Status Thresholds */}
          <div className="border-t border-slate-200 pt-5">
            <h4 className="font-bold text-sm text-slate-900 mb-3">
              2. Improved App Real-Time Status Thresholds
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>&gt; 20 Lots</span>
                </div>
                <div className="text-emerald-950 font-semibold">Available</div>
                <p className="text-[11px] text-emerald-800 mt-1">
                  High probability of finding a parking space quickly.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-amber-200 bg-amber-50">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>1 to 20 Lots</span>
                </div>
                <div className="text-amber-950 font-semibold">Filling Fast</div>
                <p className="text-[11px] text-amber-800 mt-1">
                  Crowded. Lots may be occupied by the time motorist arrives.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-rose-200 bg-rose-50">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold mb-1">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>0 Lots</span>
                </div>
                <div className="text-rose-950 font-semibold">Carpark Full</div>
                <p className="text-[11px] text-rose-800 mt-1">
                  Avoid routing. Motorists should redirect to adjacent facilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

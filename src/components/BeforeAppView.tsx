import React, { useState } from 'react';
import { CarparkItem } from '../types';
import { INITIAL_CARPARKS } from '../data/carparkSampleData';
import { ExternalLink, RefreshCw, AlertOctagon } from 'lucide-react';

interface BeforeAppViewProps {
  highlightedHeuristicId?: string | null;
  activeFilter?: string;
}

export const BeforeAppView: React.FC<BeforeAppViewProps> = ({
  highlightedHeuristicId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [carparks] = useState<CarparkItem[]>(INITIAL_CARPARKS);
  const [selectedVehicle, setSelectedVehicle] = useState('ALL');

  // Strict case-sensitive and literal search representing before app
  const filtered = carparks.filter((item) => {
    if (selectedVehicle !== 'ALL' && item.vehicleType !== selectedVehicle) {
      return false;
    }
    if (!searchTerm) return true;
    // Before app: simple exact substring match, no synonyms or typo tolerance
    return (
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const isHighlighted = (areaNum: number) => highlightedHeuristicId === `h${areaNum}`;

  return (
    <div className="flex flex-col h-full bg-slate-100 text-slate-800 rounded-xl border border-slate-300 shadow-sm overflow-hidden text-sm font-sans">
      {/* Before App Header */}
      <div className="bg-slate-800 text-white px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400">Baseline (Before)</span>
            <span className="px-2 py-0.5 rounded text-[11px] bg-red-900/60 text-red-200 border border-red-700">
              18 Sept Build
            </span>
          </div>
          <h2 className="font-bold text-base text-slate-100 mt-0.5">LTA Carpark Availability System</h2>
        </div>
        <a
          href="https://ltacarpark18sept.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-300 hover:text-blue-100 flex items-center gap-1 bg-slate-700/80 px-2.5 py-1.5 rounded transition-colors"
          title="Open original Vercel deployment (May require Vercel SSO login)"
        >
          <span>Open Original</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Control bar with Heuristic 1, 2, 3 issues */}
      <div className="p-3 bg-slate-200 border-b border-slate-300 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div className={`flex items-center gap-1.5 ${isHighlighted(1) ? 'ring-2 ring-amber-500 p-1 bg-amber-100 rounded' : ''}`}>
            <span>Status: Connected</span>
            {/* Heuristic 1 issue: No timestamp, no last refreshed indicator */}
            <span className="text-slate-400 italic">(Last updated: N/A)</span>
          </div>
          <button
            type="button"
            onClick={() => {}}
            className="p-1.5 bg-slate-300 hover:bg-slate-400 rounded text-slate-700 transition"
            title="Silent refresh button (No loading spinner or status feedback)"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search row with Heuristic 3 & 5 issues */}
        <div className="flex gap-2">
          <div className={`relative flex-1 ${isHighlighted(3) || isHighlighted(5) ? 'ring-2 ring-amber-500 rounded p-0.5' : ''}`}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search carpark code or name..."
              className="w-full px-3 py-1.5 bg-white border border-slate-400 rounded text-xs text-slate-900 focus:outline-none"
            />
            {/* Note: NO Clear button (X) here representing lack of cancel/undo */}
          </div>

          <div className={isHighlighted(2) ? 'ring-2 ring-amber-500 rounded' : ''}>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="px-2 py-1.5 bg-white border border-slate-400 rounded text-xs text-slate-900"
            >
              <option value="ALL">VEH_TYPE: ALL</option>
              <option value="C">TYPE C</option>
              <option value="M">TYPE M</option>
              <option value="H">TYPE H</option>
            </select>
          </div>
        </div>

        {/* Heuristic 6 & 7: No active filter chips, no 'Available Only' toggle, no sorting options */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>Displaying {filtered.length} raw records</span>
          <span className="italic text-slate-400">Sort: Default DB order</span>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="flex-1 overflow-auto bg-white">
        {filtered.length === 0 ? (
          /* Heuristic 9 issue: Cryptic blank or zero recovery assistance */
          <div className={`p-8 text-center text-slate-400 ${isHighlighted(9) ? 'ring-2 ring-amber-500 m-4 rounded bg-amber-50' : ''}`}>
            <AlertOctagon className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="font-mono text-xs">[] No records found.</p>
            <p className="text-[11px] text-slate-400 mt-1">
              (No recovery button or spelling assistance provided)
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100 text-slate-600 border-b border-slate-300 sticky top-0">
                <tr>
                  <th className="py-2 px-3 font-semibold border-r border-slate-200">CARPARK_NO</th>
                  <th className="py-2 px-3 font-semibold border-r border-slate-200">NAME / LOCATION</th>
                  <th className="py-2 px-2 font-semibold border-r border-slate-200 text-center">TYPE</th>
                  <th className="py-2 px-3 font-semibold border-r border-slate-200 text-right">LOTS</th>
                  <th className="py-2 px-3 font-semibold text-slate-400">COORDINATES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                      {item.code}
                    </td>
                    <td className="py-2 px-3 font-sans text-slate-800 border-r border-slate-200">
                      <div className="font-medium text-xs">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">AGENCY_{item.agency}</div>
                    </td>
                    <td className="py-2 px-2 text-center border-r border-slate-200">
                      <span className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">{item.vehicleType}</span>
                    </td>
                    <td className="py-2 px-3 text-right font-bold border-r border-slate-200">
                      {/* Heuristic 1 & 4 issue: Raw unstyled number without status color or capacity bar */}
                      <span className="text-slate-800">{item.availableLots}</span>
                    </td>
                    <td className="py-2 px-3 text-[10px] text-slate-400 whitespace-nowrap">
                      {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer info showing lack of guidance (Heuristic 10) */}
      <div className="bg-slate-100 px-3 py-2 border-t border-slate-300 text-[11px] text-slate-500 flex justify-between items-center">
        <span>Raw LTA DataMall v2 Stream</span>
        <span className="text-slate-400">No legend / guidance</span>
      </div>
    </div>
  );
};

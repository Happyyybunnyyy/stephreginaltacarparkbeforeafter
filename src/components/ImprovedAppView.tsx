import React, { useState } from 'react';
import { CarparkItem } from '../types';
import { INITIAL_CARPARKS } from '../data/carparkSampleData';
import {
  Search,
  X,
  RefreshCw,
  SlidersHorizontal,
  Star,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Car,
  Bike,
  Truck,
  MapPin,
  Clock,
  Sparkles,
  RotateCcw,
  Info,
} from 'lucide-react';

interface ImprovedAppViewProps {
  highlightedHeuristicId?: string | null;
  onOpenLegend?: () => void;
}

export const ImprovedAppView: React.FC<ImprovedAppViewProps> = ({
  highlightedHeuristicId,
  onOpenLegend,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<'ALL' | 'C' | 'M' | 'H'>('ALL');
  const [selectedArea, setSelectedArea] = useState<string>('ALL');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'lots' | 'name'>('distance');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'cp-01': true,
    'cp-04': true,
  });

  const areas = ['ALL', 'Orchard', 'Marina Bay', 'Bugis', 'Tampines', 'Jurong', 'Chinatown'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshMessage('Syncing with LTA DataMall...');
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshMessage('Updated just now');
      setTimeout(() => setRefreshMessage(null), 2500);
    }, 600);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedVehicle('ALL');
    setSelectedArea('ALL');
    setAvailableOnly(false);
    setSortBy('distance');
  };

  const hasActiveFilters =
    searchTerm !== '' || selectedVehicle !== 'ALL' || selectedArea !== 'ALL' || availableOnly;

  // Filtering
  const filtered = INITIAL_CARPARKS.filter((item) => {
    if (selectedVehicle !== 'ALL' && item.vehicleType !== selectedVehicle) return false;
    if (selectedArea !== 'ALL' && item.area !== selectedArea) return false;
    if (availableOnly && item.availableLots === 0) return false;

    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.area.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term) ||
      item.rates.toLowerCase().includes(term)
    );
  }).sort((a, b) => {
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'lots') return b.availableLots - a.availableLots;
    return a.name.localeCompare(b.name);
  });

  const isHighlighted = (areaNum: number) => highlightedHeuristicId === `h${areaNum}`;

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 rounded-xl border border-indigo-200/80 shadow-md overflow-hidden text-sm font-sans">
      {/* Improved App Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 text-white px-4 py-3 border-b border-indigo-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-indigo-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Improved Usability Version
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
              Steph Regina Edition
            </span>
          </div>
          <h2 className="font-bold text-base text-white mt-0.5 flex items-center gap-1.5">
            <span>ParkSG · LTA Real-Time Carpark Availability</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {onOpenLegend && (
            <button
              onClick={onOpenLegend}
              className="text-xs bg-indigo-800/80 hover:bg-indigo-700 text-indigo-100 px-2 py-1.5 rounded flex items-center gap-1 border border-indigo-600 transition"
              title="View Color Legend & Guidance"
            >
              <Info className="w-3.5 h-3.5 text-indigo-300" />
              <span className="hidden sm:inline">Legend</span>
            </button>
          )}
          <a
            href="https://stephreginaltacarpark-5jn1k27qs-happyyybunnyyys-projects.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-200 hover:text-white flex items-center gap-1 bg-indigo-700/80 hover:bg-indigo-600 px-2.5 py-1.5 rounded transition shadow-sm"
            title="Open improved app on Vercel"
          >
            <span>Open Improved</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Heuristic 1: Visibility of system status */}
      <div
        className={`bg-white px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 ${
          isHighlighted(1) ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-700">
            {refreshMessage || 'Live LTA Stream · Updated 1m ago'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Controls Container */}
      <div className="p-3 bg-slate-100/80 border-b border-slate-200 space-y-2.5">
        {/* Search Bar with Heuristic 3 (Clear button) & Heuristic 5 (Error prevention) */}
        <div className="flex gap-2">
          <div
            className={`relative flex-1 ${
              isHighlighted(3) || isHighlighted(5) ? 'ring-2 ring-emerald-500 rounded-lg p-0.5' : ''
            }`}
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search mall, district, or road (e.g. Takashimaya, Orchard)..."
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 shadow-2xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Heuristic 2: Familiar Language & Icons for Vehicles */}
          <div
            className={`flex bg-white p-0.5 rounded-lg border border-slate-300 shadow-2xs ${
              isHighlighted(2) ? 'ring-2 ring-emerald-500' : ''
            }`}
          >
            <button
              onClick={() => setSelectedVehicle('ALL')}
              className={`px-2 py-1 text-xs rounded-md transition font-medium ${
                selectedVehicle === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="All Vehicles"
            >
              All
            </button>
            <button
              onClick={() => setSelectedVehicle('C')}
              className={`px-2 py-1 text-xs rounded-md transition flex items-center gap-1 ${
                selectedVehicle === 'C' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Cars"
            >
              <Car className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSelectedVehicle('M')}
              className={`px-2 py-1 text-xs rounded-md transition flex items-center gap-1 ${
                selectedVehicle === 'M' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Motorcycles"
            >
              <Bike className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSelectedVehicle('H')}
              className={`px-2 py-1 text-xs rounded-md transition flex items-center gap-1 ${
                selectedVehicle === 'H' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Heavy Vehicles"
            >
              <Truck className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Heuristic 5: Error Prevention via Popular Area Quick Chips */}
        <div
          className={`flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none ${
            isHighlighted(5) ? 'ring-2 ring-emerald-500 rounded p-1 bg-emerald-50' : ''
          }`}
        >
          <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">Districts:</span>
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedArea === area
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {area === 'ALL' ? 'All Singapore' : area}
            </button>
          ))}
        </div>

        {/* Heuristic 7: Efficient Workflows (Available Only & Sorting) */}
        <div
          className={`flex items-center justify-between gap-2 text-xs pt-1 border-t border-slate-200 ${
            isHighlighted(7) ? 'ring-2 ring-emerald-500 p-1 bg-emerald-50 rounded' : ''
          }`}
        >
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
            />
            <span>Available Lots Only</span>
          </label>

          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none"
            >
              <option value="distance">Nearest First</option>
              <option value="lots">Most Available Lots</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Heuristic 6: Recognition Rather than Recall (Visible Active Filters) */}
        {hasActiveFilters && (
          <div
            className={`flex items-center justify-between text-xs bg-indigo-50/80 px-2.5 py-1.5 rounded-lg border border-indigo-100 ${
              isHighlighted(6) ? 'ring-2 ring-emerald-500' : ''
            }`}
          >
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-indigo-900">Active filters:</span>
              {searchTerm && (
                <span className="bg-white px-2 py-0.5 rounded text-[11px] text-slate-700 border border-slate-200">
                  "{searchTerm}"
                </span>
              )}
              {selectedArea !== 'ALL' && (
                <span className="bg-white px-2 py-0.5 rounded text-[11px] text-slate-700 border border-slate-200">
                  Area: {selectedArea}
                </span>
              )}
              {selectedVehicle !== 'ALL' && (
                <span className="bg-white px-2 py-0.5 rounded text-[11px] text-slate-700 border border-slate-200">
                  Type: {selectedVehicle}
                </span>
              )}
              {availableOnly && (
                <span className="bg-white px-2 py-0.5 rounded text-[11px] text-emerald-700 border border-emerald-200">
                  Vacant Only
                </span>
              )}
            </div>
            {/* Heuristic 3: Reset control */}
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 ml-2 underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Main List View (Heuristic 8: Clean, focused card design) */}
      <div className="flex-1 overflow-auto p-3 space-y-2.5 bg-slate-100/50">
        {filtered.length === 0 ? (
          /* Heuristic 9: Clear error and easy recovery */
          <div
            className={`p-6 text-center bg-white rounded-xl border border-slate-200 shadow-sm ${
              isHighlighted(9) ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
            }`}
          >
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">No carparks match your filter</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-4">
              We couldn't find any carparks matching your active parameters in Singapore.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters & Reset</span>
            </button>
          </div>
        ) : (
          filtered.map((item) => {
            const isFull = item.availableLots === 0;
            const isCrowded = item.availableLots > 0 && item.availableLots <= 20;
            const percentage = Math.round((item.availableLots / item.totalLots) * 100);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl p-3 border transition shadow-2xs hover:shadow-sm ${
                  isFull
                    ? 'border-rose-200 hover:border-rose-300'
                    : isCrowded
                    ? 'border-amber-200 hover:border-amber-300'
                    : 'border-slate-200 hover:border-indigo-300'
                } ${isHighlighted(8) || isHighlighted(4) ? 'ring-2 ring-emerald-500' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 font-mono">
                        {item.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {item.area}
                      </span>
                      <span className="text-[11px] text-slate-400">· {item.agency}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm truncate leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="p-1 rounded-full text-slate-300 hover:text-amber-400 transition"
                    title={favorites[item.id] ? 'Remove from favorites' : 'Save as favorite'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        favorites[item.id] ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                </div>

                {/* Heuristic 1 & 6: Prominent Availability Status Badge & Capacity Bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isFull ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>CARPARK FULL</span>
                      </span>
                    ) : isCrowded ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{item.availableLots} LOTS (FILLING FAST)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{item.availableLots} LOTS AVAILABLE</span>
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-mono">
                      ({percentage}% of {item.totalLots})
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-xs text-slate-800">{item.rates}</div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-end gap-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.distanceKm} km away</span>
                    </div>
                  </div>
                </div>

                {/* Capacity Progress Indicator */}
                <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isFull ? 'bg-rose-500' : isCrowded ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(5, percentage))}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer with Heuristic 10 Guidance */}
      <div className="bg-slate-100 px-4 py-2 border-t border-slate-200 text-xs text-slate-600 flex justify-between items-center">
        <span className="flex items-center gap-1 text-[11px]">
          <Clock className="w-3 h-3 text-slate-400" />
          Data sourced from LTA DataMall (GovTech API)
        </span>
        <button
          onClick={onOpenLegend}
          className="text-indigo-600 hover:text-indigo-800 font-medium text-[11px] underline cursor-pointer"
        >
          View Usability Legend
        </button>
      </div>
    </div>
  );
};

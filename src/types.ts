export type SeverityScore = 0 | 1 | 2 | 3 | 4;

export interface HeuristicEvaluationItem {
  id: string;
  number: number;
  area: string; // The 10 requested areas
  heuristicName: string;
  problemTitle: string;
  beforeSeverity: SeverityScore;
  beforeObservation: string;
  beforeImpact: string;
  improvedSeverity: SeverityScore;
  improvedSolution: string;
  improvedOutcome: string;
  highlightCategory: 'status' | 'language' | 'control' | 'consistency' | 'prevention' | 'memory' | 'efficiency' | 'aesthetic' | 'error' | 'guidance';
  affectedElements: string[];
}

export interface CarparkItem {
  id: string;
  code: string;
  name: string;
  area: 'Orchard' | 'Marina Bay' | 'Bugis' | 'Tampines' | 'Jurong' | 'Chinatown';
  agency: 'LTA' | 'HDB' | 'URA';
  vehicleType: 'C' | 'M' | 'H'; // Car, Motorcycle, Heavy
  availableLots: number;
  totalLots: number;
  rates: string;
  distanceKm: number;
  lat: number;
  lng: number;
  isFavorite?: boolean;
}

export type ViewMode = 'split' | 'before' | 'improved' | 'embed';

export type ActiveTab = 'audit' | 'talk-to-us';

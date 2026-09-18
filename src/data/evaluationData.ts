import { HeuristicEvaluationItem } from '../types';

export const SEVERITY_DEFINITIONS = {
  0: { label: 'Not a problem', description: 'No usability obstacle detected.', color: 'emerald' },
  1: { label: 'Cosmetic issue', description: 'Fix if time allows; minor aesthetic flaw.', color: 'blue' },
  2: { label: 'Minor problem', description: 'Low priority; slight user friction or hesitation.', color: 'amber' },
  3: { label: 'Major problem', description: 'High priority; significantly impairs task completion.', color: 'orange' },
  4: { label: 'Critical problem', description: 'Must fix before release; blocking or severe task failure.', color: 'rose' },
};

export const HEURISTIC_EVALUATION_DATA: HeuristicEvaluationItem[] = [
  {
    id: 'h1',
    number: 1,
    area: 'Clear system status and feedback',
    heuristicName: 'Visibility of System Status',
    problemTitle: 'No timestamp of live data, zero loading feedback, and uncommunicated lot thresholds',
    beforeSeverity: 3, // Major problem
    beforeObservation:
      'The original app displays raw numbers without indicating when the LTA DataMall API was last polled. Clicking refresh yields no loading indicator or visual confirmation. Drivers cannot discern whether 0 lots means a carpark is full, closed for maintenance, or failing to load.',
    beforeImpact:
      'Drivers risk driving to a lot that became full 10 minutes ago, or re-clicking buttons multiple times assuming the app froze.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Implemented real-time relative timestamp ("Updated 1 min ago"), an active pulse refresh button with instant spinner feedback, and distinct visual availability status tags: High (>20 lots, Green), Moderate (1-20 lots, Amber), and Full (0 lots, Red).',
    improvedOutcome:
      'Drivers immediately recognize data freshness and receive instant affirmative feedback for every user interaction.',
    highlightCategory: 'status',
    affectedElements: ['header-status', 'refresh-btn', 'lot-status-pill'],
  },
  {
    id: 'h2',
    number: 2,
    area: 'Familiar language and logical workflows',
    heuristicName: 'Match Between System and Real World',
    problemTitle: 'Cryptic agency database codes (C23, DEV_ID, LOTS_CD) instead of destination landmarks',
    beforeSeverity: 3, // Major problem
    beforeObservation:
      'The baseline application displays raw government API identifiers like "Carpark ID: C23", "Agency: URA_EAST", and vehicle codes like "C" or "M". Drivers look for known commercial buildings or street addresses (e.g., "Ngee Ann City", "ION Orchard"), not alphanumeric database keys.',
    beforeImpact:
      'High cognitive friction: motorists must mentally translate cryptic government codes to physical destinations while driving or navigating.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Replaced internal keys with human-friendly building names, shopping mall titles, and recognizable geographic district tags (Orchard, Marina Bay, Tampines, Bugis). Replaced codes "C/M/H" with friendly icons and labels: "Cars", "Motorcycles", "Heavy Vehicles".',
    improvedOutcome:
      'Information is presented in the natural language and mental model of Singapore motorists.',
    highlightCategory: 'language',
    affectedElements: ['carpark-title', 'vehicle-type-tabs', 'agency-tag'],
  },
  {
    id: 'h3',
    number: 3,
    area: 'User control, cancel, and undo',
    heuristicName: 'User Control and Freedom',
    problemTitle: 'No 1-click search clear, unable to reset filters without hard page reload',
    beforeSeverity: 3, // Major problem
    beforeObservation:
      'Once a search term is typed or a filter applied, there is no "X" button inside the search input. To reset back to the complete carpark directory, users must manually backspace every single character or refresh the browser, losing their scroll position.',
    beforeImpact:
      'Forces repetitive manual correction, discouraging exploration and frustrating users in high-pressure driving scenarios.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Added an instant "Clear Search" icon inside the input field, individual dismissible filter pills, and a global "Reset All Filters" button with one-click undo capability.',
    improvedOutcome:
      'Motorists enjoy effortless recovery from unintended filter selections with zero penalty.',
    highlightCategory: 'control',
    affectedElements: ['search-clear-btn', 'filter-chip-remove', 'reset-all-btn'],
  },
  {
    id: 'h4',
    number: 4,
    area: 'Consistent design and behavior',
    heuristicName: 'Consistency and Standards',
    problemTitle: 'Inconsistent typography, erratic lot count alignment, and unstandardized UI components',
    beforeSeverity: 2, // Minor problem
    beforeObservation:
      'Table rows have varying padding, random font weights, unaligned lot count numbers, and mixed uppercase/lowercase terms ("Car", "MOTORCYCLE", "Heavy"). Buttons lack uniform hover/active interaction states.',
    beforeImpact:
      'Creates a disjointed, amateurish visual rhythm that slows down scanning speed across dozens of carpark rows.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Standardized on a clean design system using consistent typography hierarchy, tabular figures (font-mono) for numbers, uniform 12px pill badges, and predictable micro-interactions across every card.',
    improvedOutcome:
      'Clean optical alignment allows drivers to scan 20+ carpark rows effortlessly in seconds.',
    highlightCategory: 'consistency',
    affectedElements: ['table-row', 'status-badge', 'typography'],
  },
  {
    id: 'h5',
    number: 5,
    area: 'Error prevention',
    heuristicName: 'Error Prevention',
    problemTitle: 'Typo-intolerant exact-match query with no location suggestions or input constraints',
    beforeSeverity: 3, // Major problem
    beforeObservation:
      'The search input requires exact matching. A single typo like "Orchrd" or "Takashimya" returns an empty table without fuzzy matching or spell correction. Furthermore, vehicle dropdown and location filters can be set into impossible combinations silently.',
    beforeImpact:
      'Users frequently hit dead ends and erroneously assume a carpark does not exist or has closed.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Added one-tap Popular Area quick chips (Orchard, Marina Bay, Bugis, Jurong East, Tampines), tolerant substring searching across name, area, and street, and proactive lot availability safeguards.',
    improvedOutcome:
      'Prevents errors before they occur by letting users tap pre-verified location tags instead of typing on touchscreens.',
    highlightCategory: 'prevention',
    affectedElements: ['area-quick-chips', 'search-autocomplete', 'vehicle-selector'],
  },
  {
    id: 'h6',
    number: 6,
    area: 'Visible options without relying on memory',
    heuristicName: 'Recognition Rather Than Recall',
    problemTitle: 'Applied filters are invisible and rates/capacity details require memorizing prior screens',
    beforeSeverity: 3, // Major problem
    beforeObservation:
      'When users filter carparks, the applied criteria are hidden inside collapsed dropdowns. The user cannot see why only 3 results are showing without re-opening every menu. Parking rates, distance, and total lot capacities are completely hidden.',
    beforeImpact:
      'Forces heavy cognitive load on drivers who have to remember which filters they activated and recall parking rates from external memory.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Prominently displays active filter chips with active count badges, a visual capacity bar showing available lots vs total capacity (e.g., "142 / 350 lots"), and transparent hourly rate badges directly on each card.',
    improvedOutcome:
      'All critical decision criteria (rates, vacancy percentage, distance, vehicle type) are visible at a glance without taxing working memory.',
    highlightCategory: 'memory',
    affectedElements: ['active-filter-chips', 'capacity-progress-bar', 'rate-badge'],
  },
  {
    id: 'h7',
    number: 7,
    area: 'Efficient workflows',
    heuristicName: 'Flexibility and Efficiency of Use',
    problemTitle: 'No "Available Only" quick toggle, no sorting by distance or vacancy, forcing manual scanning',
    beforeSeverity: 4, // Critical problem
    beforeObservation:
      'Drivers need an immediate answer: "Where can I park right now near my destination?" The original app presents an unsorted, unfilterable monolithic list filled with full/0-lot carparks. Drivers must manually scroll through dozens of red zero-lot carparks.',
    beforeImpact:
      'Severe usability bottleneck during in-car navigation; increases distraction and requires several minutes of manual table browsing.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Introduced a 1-tap "Available Only" toggle, instant sorting controls (Nearest Distance, Most Lots Available, Lowest Rates), and quick bookmarking/favorites for frequently visited shopping or office carparks.',
    improvedOutcome:
      'Reduces task completion time from ~45 seconds to under 4 seconds, putting optimal parking choices at the very top.',
    highlightCategory: 'efficiency',
    affectedElements: ['available-only-toggle', 'sort-dropdown', 'favorite-star-btn'],
  },
  {
    id: 'h8',
    number: 8,
    area: 'Clean, focused design',
    heuristicName: 'Aesthetic and Minimalist Design',
    problemTitle: 'Cluttered raw API coordinates, irrelevant metadata columns, and poor responsive contrast',
    beforeSeverity: 2, // Minor problem
    beforeObservation:
      'The original table dedicates massive visual weight to raw decimal latitude/longitude numbers (e.g., 1.302482, 103.83492), technical agency abbreviations, and repetitive column headers that crowd out essential parking data on mobile viewports.',
    beforeImpact:
      'Visual clutter dilutes attention from primary decision factors (availability and distance), degrading readability under bright daylight.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Removed technical database columns from the primary card view, elevated key signals (Available Lots in large high-contrast numerals, building name in bold display type), and tucked technical coordinates into an optional detail toggle.',
    improvedOutcome:
      'High-contrast, scannable cards optimized for quick glanceability even in mobile holders.',
    highlightCategory: 'aesthetic',
    affectedElements: ['card-layout', 'typography-contrast', 'expanded-details'],
  },
  {
    id: 'h9',
    number: 9,
    area: 'Clear errors and easy recovery',
    heuristicName: 'Help Users Recognize, Diagnose, and Recover from Errors',
    problemTitle: 'Cryptic blank screen or empty brackets upon zero results with zero recovery suggestions',
    beforeSeverity: 3, // Major problem
    beforeObservation:
      'When search criteria yield zero matches, the baseline app simply shows a blank white container or unformatted empty table with no text. Users cannot tell whether the server crashed, the internet dropped, or no carparks matched.',
    beforeImpact:
      'Leaves users stranded with zero diagnostic feedback or remediation pathway.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Designed an empathetic empty state with a clear diagnostic message ("No carparks found matching your criteria"), constructive recovery suggestions ("Try clearing your vehicle filter or checking nearby Orchard"), and a direct "Reset Search" action button.',
    improvedOutcome:
      'Users immediately understand why no results appeared and can recover with a single click.',
    highlightCategory: 'error',
    affectedElements: ['empty-state-view', 'error-recovery-button', 'diagnostic-hint'],
  },
  {
    id: 'h10',
    number: 10,
    area: 'Helpful guidance and documentation',
    heuristicName: 'Help and Documentation',
    problemTitle: 'Zero explanation of update intervals, status thresholds, or Singapore carpark fee rules',
    beforeSeverity: 2, // Minor problem
    beforeObservation:
      'No onboarding, tooltip, or legend explains how often LTA updates its DataMall feeds, what parking grace periods apply (e.g., 10-minute grace period in URA/HDB), or what lot count threshold qualifies as "crowded".',
    beforeImpact:
      'New or infrequent drivers have no clarity regarding data accuracy delays or standard parking policies.',
    improvedSeverity: 0, // Not a usability problem
    improvedSolution:
      'Added an accessible Info drawer with a color-coded legend (Green = 20+ lots, Amber = 1-20 lots, Red = 0 lots), an explanation of the 1-2 minute LTA DataMall refresh cadence, and helpful parking tips for Singapore drivers.',
    improvedOutcome:
      'Contextual guidance is easily accessible on-demand without cluttering the primary workflow.',
    highlightCategory: 'guidance',
    affectedElements: ['info-drawer-trigger', 'legend-badge-info', 'help-modal'],
  },
];

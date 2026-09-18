import React, { useEffect, useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  MessageCircleQuestion,
  Car,
} from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config?: (this: any) => void }) => void;
    };
    disqus_config?: (this: any) => void;
  }
}

// Fixed canonical values for Disqus configuration
export const DISQUS_PAGE_URL = 'https://stephreginaltacarparkbeforeafter.vercel.app/talk-to-us';
export const DISQUS_PAGE_IDENTIFIER = 'stephregina-ltacarpark-talk-to-us-main';
export const DISQUS_PAGE_TITLE = 'Talk to Us - LTA Carpark Usability Comparison & Feedback';

interface TalkToUsTabProps {
  onSwitchToAudit?: () => void;
}

export const TalkToUsTab: React.FC<TalkToUsTabProps> = ({ onSwitchToAudit }) => {
  const [isReloading, setIsReloading] = useState(false);
  const [disqusStatus, setDisqusStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const loadOrReloadDisqus = () => {
    setIsReloading(true);

    try {
      // Configuration function with real fixed values
      const configureDisqus = function (this: any) {
        this.page.url = DISQUS_PAGE_URL;
        this.page.identifier = DISQUS_PAGE_IDENTIFIER;
        this.page.title = DISQUS_PAGE_TITLE;
      };

      if (typeof window !== 'undefined' && window.DISQUS) {
        // SPA reload: Disqus is already loaded, reset the thread with updated config
        window.DISQUS.reset({
          reload: true,
          config: configureDisqus,
        });
        setDisqusStatus('ready');
        setTimeout(() => setIsReloading(false), 500);
      } else {
        // First-time load: Assign global disqus_config and inject script
        window.disqus_config = configureDisqus;

        const existingScript = document.getElementById('disqus-embed-script');
        if (!existingScript) {
          const d = document;
          const s = d.createElement('script');
          s.id = 'disqus-embed-script';
          s.src = 'https://bunny-carpark.disqus.com/embed.js';
          s.setAttribute('data-timestamp', String(+new Date()));
          s.async = true;
          s.onload = () => {
            setDisqusStatus('ready');
            setIsReloading(false);
          };
          s.onerror = () => {
            setDisqusStatus('error');
            setIsReloading(false);
          };
          (d.head || d.body).appendChild(s);
        } else {
          setDisqusStatus('ready');
          setIsReloading(false);
        }
      }
    } catch (error) {
      console.error('Failed to initialize Disqus:', error);
      setDisqusStatus('error');
      setIsReloading(false);
    }
  };

  // Run on mount and whenever tab is displayed
  useEffect(() => {
    loadOrReloadDisqus();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Tab Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Community Forum & Feedback Hub</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Talk to Us</span>
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-white/10 text-slate-300 border border-white/15">
              Powered by Disqus
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Have questions about the 10 Nielsen heuristic findings, suggestions for further parking UX improvements, or feedback on the Steph Regina redesign? Join the discussion below.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fixed Config: Canonical URL & Identifier Active</span>
            </span>
            <button
              onClick={loadOrReloadDisqus}
              disabled={isReloading}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isReloading ? 'animate-spin' : ''}`} />
              <span>{isReloading ? 'Reloading Disqus...' : 'Reload Thread'}</span>
            </button>
            {onSwitchToAudit && (
              <button
                onClick={onSwitchToAudit}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Return to Usability Audit</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Discussion Topics & Guidelines Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Design Suggestions</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Suggest tweaks for lot availability thresholds, rate card clarity, or search efficiency improvements.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <MessageCircleQuestion className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Heuristic Methodology</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Inquire about our Nielsen Norman Group 10-heuristic scoring criteria and severity assessments.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Real Driver Friction</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Share Singapore carpark pain points: grace periods, height limits, season parking, or ERP integration.
          </p>
        </div>
      </div>

      {/* Technical Config Verification Badge */}
      <div className="bg-slate-100 rounded-xl p-3.5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
            disqus_config
          </span>
          <span className="text-slate-500">Fixed canonical configuration:</span>
          <code className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px] font-mono">
            url: {DISQUS_PAGE_URL}
          </code>
          <code className="text-slate-700 bg-white px-2 py-0.5 rounded text-[11px] font-mono">
            id: {DISQUS_PAGE_IDENTIFIER}
          </code>
        </div>
        <a
          href="https://bunny-carpark.disqus.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium shrink-0"
        >
          <span>Disqus Admin Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Disqus Thread Embed Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 min-h-[420px] relative">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">Live Comments & Feedback</h3>
          </div>
          <span className="text-xs text-slate-400">Moderated Discussion</span>
        </div>

        {/* The required Disqus Container */}
        <div id="disqus_thread" className="min-h-[300px]"></div>

        <noscript>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            Please enable JavaScript to view the{' '}
            <a
              href="https://disqus.com/?ref_noscript"
              className="underline font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              comments powered by Disqus.
            </a>
          </div>
        </noscript>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Lightbulb,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  MessageCircleQuestion,
} from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config?: (this: any) => void }) => void;
    };
    disqus_config?: (this: any) => void;
  }
}

// Fixed canonical values for Disqus configuration with real fixed values
export const DISQUS_PAGE_URL = 'https://stephreginaltacarparkbeforeafter.vercel.app/#leave-your-comments';
export const DISQUS_PAGE_IDENTIFIER = 'stephregina-ltacarpark-leave-your-comments';
export const DISQUS_PAGE_TITLE = 'Leave your comments here! :) - LTA Carpark Usability Comparison & Feedback';

export const FeelFreeYourThoughtsSection: React.FC = () => {
  const [isReloading, setIsReloading] = useState(false);

  const loadOrReloadDisqus = () => {
    setIsReloading(true);

    try {
      const configureDisqus = function (this: any) {
        this.page.url = DISQUS_PAGE_URL;
        this.page.identifier = DISQUS_PAGE_IDENTIFIER;
        this.page.title = DISQUS_PAGE_TITLE;
      };

      if (typeof window !== 'undefined' && window.DISQUS) {
        // SPA reload: Disqus is already loaded, reset thread with updated fixed config
        window.DISQUS.reset({
          reload: true,
          config: configureDisqus,
        });
        setTimeout(() => setIsReloading(false), 400);
      } else {
        // First time load
        window.disqus_config = configureDisqus;

        const existingScript = document.getElementById('disqus-embed-script');
        if (!existingScript) {
          const d = document;
          const s = d.createElement('script');
          s.id = 'disqus-embed-script';
          s.src = 'https://bunny-carpark.disqus.com/embed.js';
          s.setAttribute('data-timestamp', String(+new Date()));
          s.async = true;
          s.onload = () => setIsReloading(false);
          s.onerror = () => setIsReloading(false);
          (d.head || d.body).appendChild(s);
        } else {
          setIsReloading(false);
        }
      }
    } catch (error) {
      console.error('Failed to initialize Disqus:', error);
      setIsReloading(false);
    }
  };

  useEffect(() => {
    loadOrReloadDisqus();
  }, []);

  return (
    <section
      id="leave-your-comments"
      className="scroll-mt-24 pt-10 pb-6 space-y-6 border-t-2 border-slate-200/80"
    >
      {/* Lowest bottom banner: Leave your comments here! :) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Community Discussion & Feedback</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>Leave your comments here! :)</span>
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-white/10 text-slate-300 border border-white/15">
              Disqus
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Have questions about the 10 Nielsen heuristic findings, suggestions for further parking UX improvements, or feedback on the Steph Regina redesign? Leave your thoughts below.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real Fixed Disqus Config Active</span>
            </span>

            <button
              onClick={loadOrReloadDisqus}
              disabled={isReloading}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isReloading ? 'animate-spin' : ''}`} />
              <span>{isReloading ? 'Reloading Comments...' : 'Reload Comments'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Discussion Prompts Bento */}
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
          <h4 className="font-bold text-sm text-slate-900">Real Driver Friction in SG</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Share Singapore carpark pain points: grace periods, height limits, season parking, or ERP integration.
          </p>
        </div>
      </div>

      {/* Disqus Embed Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 min-h-[420px] relative">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">Leave Your Comment Below</h3>
          </div>
          <a
            href="https://bunny-carpark.disqus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <span>Disqus Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* The required Disqus target */}
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
    </section>
  );
};

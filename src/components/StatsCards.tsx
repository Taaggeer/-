import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Eye, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { StatMetric } from '../types';

interface StatsCardsProps {
  stats: StatMetric[];
  onCardClick?: (id: string) => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, onCardClick }) => {
  const [timeFilter, setTimeFilter] = useState<'month' | 'week' | 'year'>('month');

  const getIcon = (iconName: StatMetric['iconName']) => {
    switch (iconName) {
      case 'file-text':
        return FileText;
      case 'users':
        return Users;
      case 'eye':
        return Eye;
      case 'trending-up':
      default:
        return TrendingUp;
    }
  };

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          sparkStroke: '#10b981',
          sparkFill: 'rgba(16, 185, 129, 0.15)',
          glow: 'group-hover:border-emerald-500/30',
        };
      case 'indigo':
        return {
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          sparkStroke: '#6366f1',
          sparkFill: 'rgba(99, 102, 241, 0.15)',
          glow: 'group-hover:border-indigo-500/30',
        };
      case 'sky':
        return {
          badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
          iconBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
          sparkStroke: '#0ea5e9',
          sparkFill: 'rgba(14, 165, 233, 0.15)',
          glow: 'group-hover:border-sky-500/30',
        };
      case 'amber':
      default:
        return {
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          sparkStroke: '#f59e0b',
          sparkFill: 'rgba(245, 158, 11, 0.15)',
          glow: 'group-hover:border-amber-500/30',
        };
    }
  };

  return (
    <section className="space-y-4">
      {/* Top Filter Bar for Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-200">
            مؤشرات الأداء الرئيسية (KPIs)
          </h2>
        </div>

        {/* Time period toggle */}
        <div className="flex items-center p-0.5 bg-slate-800/80 border border-slate-700/60 rounded-xl text-xs">
          <button
            onClick={() => setTimeFilter('week')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              timeFilter === 'week' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            هذا الأسبوع
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              timeFilter === 'month' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            هذا الشهر
          </button>
          <button
            onClick={() => setTimeFilter('year')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              timeFilter === 'year' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            السنة الحالية
          </button>
        </div>
      </div>

      {/* Grid of 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const Icon = getIcon(stat.iconName);
          const colorStyles = getColorStyles(stat.color);

          // SVG Mini Sparkline generator
          const maxVal = Math.max(...stat.sparkline);
          const minVal = Math.min(...stat.sparkline);
          const range = maxVal - minVal || 1;
          const points = stat.sparkline
            .map((val, idx) => {
              const x = (idx / (stat.sparkline.length - 1)) * 90;
              const y = 32 - ((val - minVal) / range) * 26;
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <div
              key={stat.id}
              id={`stat-card-${stat.id}`}
              onClick={() => onCardClick && onCardClick(stat.id)}
              className={`group relative overflow-hidden bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 ${colorStyles.glow} rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-lg shadow-slate-950/20 cursor-pointer`}
            >
              {/* Card Header: Title & Icon */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-slate-400 truncate">{stat.title}</span>
                <div className={`p-2.5 rounded-xl border ${colorStyles.iconBg} transition-transform group-hover:scale-105`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Card Metric: Value & Trend */}
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  {stat.value}
                </span>

                <div
                  className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                    stat.isPositive
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  <span dir="ltr">{stat.change}</span>
                </div>
              </div>

              {/* Sparkline & Period Info */}
              <div className="flex items-end justify-between gap-2 mt-2 pt-2 border-t border-slate-700/40">
                <span className="text-[11px] text-slate-400 truncate">{stat.period}</span>

                {/* SVG Sparkline */}
                <div className="w-24 h-8 shrink-0 overflow-hidden">
                  <svg viewBox="0 0 90 32" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id={`grad-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={colorStyles.sparkStroke} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={colorStyles.sparkStroke} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <polygon
                      points={`0,32 ${points} 90,32`}
                      fill={`url(#grad-${stat.id})`}
                    />
                    {/* Line stroke */}
                    <polyline
                      fill="none"
                      stroke={colorStyles.sparkStroke}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

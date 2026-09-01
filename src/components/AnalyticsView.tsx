import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Users, 
  Globe, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Sparkles, 
  ArrowUpRight, 
  Calendar,
  Share2,
  PieChart,
  Award
} from 'lucide-react';
import { Article } from '../types';
import { CATEGORIES_STATS } from '../data/mockData';

interface AnalyticsViewProps {
  articles: Article[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ articles }) => {
  const [activeRange, setActiveRange] = useState<'30days' | '90days' | '1year'>('30days');

  // Monthly views mock dataset
  const monthlyData = [
    { month: 'يناير', views: 24000, readers: 18000 },
    { month: 'فبراير', views: 28500, readers: 21000 },
    { month: 'مارس', views: 34000, readers: 26000 },
    { month: 'أبريل', views: 31000, readers: 24000 },
    { month: 'مايو', views: 42000, readers: 33000 },
    { month: 'يونيو', views: 48000, readers: 38000 },
    { month: 'يوليو', views: 56000, readers: 44000 },
    { month: 'أغسطس', views: 68000, readers: 52000 },
  ];

  const maxMonthView = Math.max(...monthlyData.map((d) => d.views));

  // Top articles sorted by views
  const topArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/15 text-indigo-400 border border-indigo-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              مركز الإحصائيات والتحليلات البيانية
            </h2>
            <p className="text-xs text-slate-400">
              تتبع نمو الجمهور، المقالات الأكثر قراءة، وتوزيع مصادر الزيارات
            </p>
          </div>
        </div>

        <div className="flex items-center p-1 bg-slate-800/80 border border-slate-700/60 rounded-xl text-xs">
          <button
            onClick={() => setActiveRange('30days')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeRange === '30days' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            آخر 30 يوم
          </button>
          <button
            onClick={() => setActiveRange('90days')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeRange === '90days' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            آخر 3 أشهر
          </button>
          <button
            onClick={() => setActiveRange('1year')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeRange === '1year' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            السنة الماضية
          </button>
        </div>
      </div>

      {/* Main Charts Row: Monthly Traffic & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Traffic Chart (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-950/20">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                نمو المشاهدات الشهرية والقراء الفعليين
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                مقارنة بين إجمالي مشاهدات الصفحات وعدد القراء الفريدين
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded-md bg-indigo-500" />
                المشاهدات
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded-md bg-sky-400" />
                القراء
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 border-b border-slate-800">
            {monthlyData.map((item, idx) => {
              const viewHeightPct = (item.views / maxMonthView) * 100;
              const readerHeightPct = (item.readers / maxMonthView) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full">
                    {/* View Bar */}
                    <div
                      style={{ height: `${viewHeightPct}%` }}
                      className="w-full max-w-[20px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md group-hover:brightness-110 transition-all relative"
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-950 text-indigo-300 text-[10px] py-0.5 px-1.5 rounded-md border border-slate-700 whitespace-nowrap pointer-events-none transition-opacity z-10">
                        {item.views.toLocaleString()}
                      </span>
                    </div>

                    {/* Reader Bar */}
                    <div
                      style={{ height: `${readerHeightPct}%` }}
                      className="w-full max-w-[20px] bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md group-hover:brightness-110 transition-all"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ArrowUpRight className="w-4 h-4" />
              معدل النمو الشهري التراكمي: +34.8%
            </span>
            <span>أعلى شهر مشاهدة: أغسطس (68,000 مشاهدة)</span>
          </div>
        </div>

        {/* Categories Distribution Breakdown (1 col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-950/20 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-1">
              <PieChart className="w-4 h-4 text-sky-400" />
              توزيع المحتوى حسب الأقسام
            </h3>
            <p className="text-xs text-slate-400 mb-4">نسبة المقالات المنشورة لكل تخصص</p>

            <div className="space-y-3.5">
              {CATEGORIES_STATS.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200 flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </span>
                    <span className="text-slate-400">{cat.percentage}%</span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 mt-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-[11px] text-slate-400 leading-relaxed">
            قسم <strong className="text-indigo-300">الذكاء الاصطناعي</strong> هو الأكثر طلباً وتفاعلاً من قبل الزوار بنسبة 35%.
          </div>
        </div>
      </div>

      {/* Second Row: Top Performing Articles & Devices / Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Articles Leaderboard */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-950/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                المقالات الأكثر قراءة وتفاعلاً
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">ترتيب المقالات المتصدرة من حيث عدد الزيارات</p>
            </div>
            <span className="text-xs font-semibold text-indigo-400">تحديث فوري</span>
          </div>

          <div className="space-y-3">
            {topArticles.map((article, idx) => (
              <div
                key={article.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0 ${
                      idx === 0
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : idx === 1
                        ? 'bg-slate-300/20 text-slate-300 border border-slate-400/30'
                        : idx === 2
                        ? 'bg-amber-700/20 text-amber-600 border border-amber-700/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{idx + 1}
                  </div>

                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-10 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-200 truncate">{article.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.author.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-100 flex items-center gap-1 justify-end">
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      {article.views.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">قراءة مكتملة 92%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Devices & Channels Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-950/20 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-3">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              أجهزة القراء والزوار
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>الهواتف الذكية (Mobile)</span>
                </div>
                <span className="font-bold text-slate-100">68%</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <Laptop className="w-4 h-4 text-indigo-400" />
                  <span>أجهزة الحاسوب (Desktop)</span>
                </div>
                <span className="font-bold text-slate-100">26%</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <Tablet className="w-4 h-4 text-amber-400" />
                  <span>الأجهزة اللوحية (Tablet)</span>
                </div>
                <span className="font-bold text-slate-100">6%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 mb-2.5">مصادر الزيارات الأساسية</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>محركات البحث (Google / Bing)</span>
                <span className="font-semibold text-slate-200">54%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>وسائل التواصل الاجتماعي (X / LinkedIn)</span>
                <span className="font-semibold text-slate-200">32%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>الزيارات المباشرة والنشرات البريدية</span>
                <span className="font-semibold text-slate-200">14%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

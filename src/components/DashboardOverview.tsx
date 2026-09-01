import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Eye, 
  TrendingUp, 
  Plus, 
  ArrowLeft, 
  Clock, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Send, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Article, StatMetric, ActivityLog, TabType } from '../types';
import { StatsCards } from './StatsCards';

interface DashboardOverviewProps {
  stats: StatMetric[];
  articles: Article[];
  activities: ActivityLog[];
  onSelectTab: (tab: TabType) => void;
  onAddArticle: () => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
  onPreviewArticle: (article: Article) => void;
  onQuickDraftSubmit: (title: string, category: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats,
  articles,
  activities,
  onSelectTab,
  onAddArticle,
  onEditArticle,
  onDeleteArticle,
  onPreviewArticle,
  onQuickDraftSubmit,
}) => {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState('الذكاء الاصطناعي');
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const handleQuickDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    onQuickDraftSubmit(quickTitle.trim(), quickCategory);
    setQuickTitle('');
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 3000);
  };

  const recentArticles = articles.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 1. Top Stat Cards */}
      <StatsCards
        stats={stats}
        onCardClick={(id) => {
          if (id === 'stat-articles') onSelectTab('articles');
          if (id === 'stat-users') onSelectTab('users');
          if (id === 'stat-views' || id === 'stat-engagement') onSelectTab('analytics');
        }}
      />

      {/* 2. Middle Row: Recent Articles Table (2 cols) & Quick Draft / Activities (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles Table */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-950/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">أحدث المقالات المضافة</h3>
                <p className="text-xs text-slate-400">عرض فوري لآخر ما تم إدراجه أو تعديله</p>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('articles')}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>عرض كل المقالات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400">
                  <th className="pb-3 px-2">المقال</th>
                  <th className="pb-3 px-2">الكاتب</th>
                  <th className="pb-3 px-2 text-center">الحالة</th>
                  <th className="pb-3 px-2 text-center">المشاهدات</th>
                  <th className="pb-3 px-2 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs">
                {recentArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-2 max-w-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={art.coverImage}
                          alt={art.title}
                          className="w-10 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                        <div className="truncate">
                          <p
                            onClick={() => onPreviewArticle(art)}
                            className="font-bold text-slate-200 hover:text-indigo-400 cursor-pointer truncate"
                            title={art.title}
                          >
                            {art.title}
                          </p>
                          <span className="text-[10px] text-indigo-400">{art.category}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className="text-slate-300">{art.author.name}</span>
                    </td>

                    <td className="py-3 px-2 text-center whitespace-nowrap">
                      {art.status === 'published' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          منشور
                        </span>
                      )}
                      {art.status === 'draft' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          مسودة
                        </span>
                      )}
                      {art.status === 'archived' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-700 text-slate-300">
                          مؤرشف
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-2 text-center whitespace-nowrap font-medium text-slate-300">
                      {art.views.toLocaleString()}
                    </td>

                    <td className="py-3 px-2 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onPreviewArticle(art)}
                          className="p-1 rounded-md text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                          title="معاينة"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEditArticle(art)}
                          className="p-1 rounded-md text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                          title="تعديل"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteArticle(art.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onAddArticle}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-xl transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              إضافة مقال جديد الآن
            </button>
          </div>
        </div>

        {/* Right Column: Quick Draft & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Draft Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-950/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-slate-100">مسودة سريعة لمقال</h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              دوّن أفكار المقالات العاجلة ليتم حفظها كمسودة فورية
            </p>

            <form onSubmit={handleQuickDraft} className="space-y-3">
              <input
                type="text"
                placeholder="عنوان أو فكرة المقال..."
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              />

              <div className="flex items-center gap-2">
                <select
                  value={quickCategory}
                  onChange={(e) => setQuickCategory(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="الذكاء الاصطناعي">الذكاء الاصطناعي</option>
                  <option value="تطوير الويب">تطوير الويب</option>
                  <option value="الأمن السيبراني">الأمن السيبراني</option>
                  <option value="ريادة الأعمال">ريادة الأعمال</option>
                </select>

                <button
                  type="submit"
                  disabled={!quickTitle.trim()}
                  className="flex items-center gap-1 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold shadow-md transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  حفظ
                </button>
              </div>

              {draftSavedToast && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  تم حفظ المسودة بنجاح في جدول المقالات!
                </div>
              )}
            </form>
          </div>

          {/* Recent Activities List */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-950/20">
            <h3 className="text-sm font-bold text-slate-100 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              سجل النشاطات التحريرية
            </h3>

            <div className="space-y-3">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <img
                    src={act.userAvatar}
                    alt={act.user}
                    className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0 mt-0.5"
                  />
                  <div className="min-w-0">
                    <p className="text-slate-200 font-medium leading-snug">
                      <span className="font-bold text-indigo-300">{act.user}</span>: {act.action}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">"{act.target}"</p>
                    <span className="text-[10px] text-slate-500">{act.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

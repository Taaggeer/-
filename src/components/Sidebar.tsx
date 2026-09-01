import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  articlesCount: number;
  usersCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  articlesCount,
  usersCount,
  isMobileOpen,
  onCloseMobile,
}) => {
  const menuItems = [
    {
      id: 'dashboard' as TabType,
      label: 'الرئيسية',
      icon: LayoutDashboard,
      badge: null,
      description: 'نظرة عامة على النشاط',
    },
    {
      id: 'articles' as TabType,
      label: 'إدارة المقالات',
      icon: FileText,
      badge: articlesCount.toString(),
      description: 'إضافة وتعديل وحذف المحتوى',
    },
    {
      id: 'users' as TabType,
      label: 'إدارة المستخدمين',
      icon: Users,
      badge: usersCount.toString(),
      description: 'الصلاحيات وفريق العمل',
    },
    {
      id: 'analytics' as TabType,
      label: 'الإحصائيات',
      icon: BarChart3,
      badge: 'مباشر',
      description: 'تحليلات الزيارات والنمو',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          id="mobile-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 bottom-0 right-0 z-50 flex flex-col bg-slate-900/95 border-l border-slate-800/80 backdrop-blur-md transition-all duration-300 ease-in-out
          ${isCollapsed ? 'lg:w-20' : 'lg:w-68'}
          ${isMobileOpen ? 'translate-x-0 w-72' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-18 px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-base text-slate-100 tracking-tight flex items-center gap-1.5">
                  لوحة الإدارة
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    v2.5
                  </span>
                </span>
                <span className="text-xs text-slate-400 truncate">منظومة إدارة المحتوى الرقمي</span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            id="btn-toggle-sidebar"
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'توسيع القائمة' : 'طي القائمة'}
          >
            {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto">
          {(!isCollapsed || isMobileOpen) && (
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              القائمة الرئيسية
            </div>
          )}

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  if (isMobileOpen) onCloseMobile();
                }}
                className={`group relative flex items-center w-full px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                  }
                  ${isCollapsed && !isMobileOpen ? 'justify-center' : 'justify-between'}
                `}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors shrink-0
                      ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 group-hover:text-slate-200 bg-slate-800/40'}
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {(!isCollapsed || isMobileOpen) && (
                    <div className="flex flex-col text-right truncate">
                      <span className={`text-sm ${isActive ? 'font-semibold text-indigo-200' : 'text-slate-200'}`}>
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>

                {(!isCollapsed || isMobileOpen) && item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 transition-colors
                      ${
                        item.badge === 'مباشر'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse'
                          : isActive
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-slate-800 text-slate-400'
                      }
                    `}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Active subtle pill on left edge */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Pro Banner / Storage Indicator */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="p-3 mx-3 mb-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">النسخة السحابية الموثوقة</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
              تمت مزامنة جميع التغييرات محلياً مع مساحة تخزين متوافقة.
            </p>
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-500 h-1.5 rounded-full w-3/4" />
            </div>
          </div>
        )}

        {/* User Mini Profile Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
                alt="المسؤول"
                className="w-9 h-9 rounded-full object-cover border border-slate-700 ring-2 ring-indigo-500/20"
              />
              <span className="absolute bottom-0 left-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <div className="flex-1 min-w-0 text-right">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-slate-200 truncate">عبدالرحمن باجبير</p>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 truncate">مدير النظام الأعلى</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { TabType, ActivityLog } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onOpenMobileSidebar: () => void;
  onOpenNewArticleModal: () => void;
  activities: ActivityLog[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onResetToDemoData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenMobileSidebar,
  onOpenNewArticleModal,
  activities,
  searchQuery,
  onSearchChange,
  onResetToDemoData,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return { title: 'لوحة التحكم الرئيسية', subtitle: 'نظرة عامة على المقالات، التفاعل، وأداء المنصة' };
      case 'articles':
        return { title: 'إدارة المقالات والمحتوى', subtitle: 'إضافة وتعديل وحذف وأرشفة المقالات التحريرية' };
      case 'users':
        return { title: 'إدارة المستخدمين والصلاحيات', subtitle: 'التحكم في أعضاء الفريق والكتاب وصلاحيات الوصول' };
      case 'analytics':
        return { title: 'الإحصائيات والتحليلات', subtitle: 'رؤى بيانية تفصيلية حول سلوك القراء ومصادر الزيارات' };
      default:
        return { title: 'لوحة التحكم', subtitle: '' };
    }
  };

  const { title, subtitle } = getTabTitle();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-18 px-4 sm:px-6 lg:px-8 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md">
      {/* Left (RTL Start): Mobile Menu & View Title */}
      <div className="flex items-center gap-3.5">
        <button
          id="btn-open-mobile-menu"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="فتح القائمة الجانبية"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            {title}
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              النظام نشط
            </span>
          </h1>
          <p className="hidden md:block text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      {/* Right (RTL End): Actions & Search & Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Live Search Bar */}
        <div className="relative hidden md:block w-64 lg:w-72">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="header-global-search"
            type="text"
            placeholder="بحث سريع في المقالات والمستخدمين..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-3 pr-9 py-1.5 text-xs bg-slate-800/70 border border-slate-700/70 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
          />
        </div>

        {/* New Article Action Button */}
        <button
          id="btn-header-new-article"
          onClick={onOpenNewArticleModal}
          className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-98 transition-all"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">إضافة مقال جديد</span>
          <span className="sm:hidden">إضافة</span>
        </button>

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            id="btn-header-notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
            title="الإشعارات الأخيرة"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-900" />
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div
              id="notifications-dropdown"
              className="absolute left-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex items-center justify-between p-3.5 border-b border-slate-800 bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-200">سجل التنبيهات والنشاط</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-indigo-500/20 text-indigo-300">
                    {activities.length} جديد
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  إغلاق
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                {activities.map((act) => (
                  <div key={act.id} className="p-3 hover:bg-slate-800/40 transition-colors flex items-start gap-2.5">
                    <img
                      src={act.userAvatar}
                      alt={act.user}
                      className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 border border-slate-700"
                    />
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-xs text-slate-200 font-medium leading-snug">
                        <span className="font-bold text-indigo-300">{act.user}</span>: {act.action}{' '}
                        <span className="text-slate-300 italic truncate">"{act.target}"</span>
                      </p>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-slate-800 bg-slate-950/60 text-center">
                <button
                  onClick={onResetToDemoData}
                  className="text-xs text-slate-400 hover:text-indigo-400 flex items-center justify-center gap-1.5 w-full py-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  استعادة البيانات التوضيحية الافتراضية
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

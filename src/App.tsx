import React, { useState, useEffect, useMemo } from 'react';
import { 
  Article, 
  User, 
  StatMetric, 
  ActivityLog, 
  TabType, 
  ArticleStatus 
} from './types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_USERS, 
  INITIAL_STATS, 
  INITIAL_ACTIVITIES,
  loadStoredArticles,
  saveStoredArticles,
  loadStoredUsers,
  saveStoredUsers,
  loadStoredActivities,
  saveStoredActivities
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { ArticlesManagement } from './components/ArticlesManagement';
import { UsersManagement } from './components/UsersManagement';
import { AnalyticsView } from './components/AnalyticsView';
import { ArticleModal } from './components/ArticleModal';
import { UserModal } from './components/UserModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ArticlePreviewModal } from './components/ArticlePreviewModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Data States (loaded with LocalStorage fallback)
  const [articles, setArticles] = useState<Article[]>(() => loadStoredArticles());
  const [users, setUsers] = useState<User[]>(() => loadStoredUsers());
  const [activities, setActivities] = useState<ActivityLog[]>(() => loadStoredActivities());
  const [globalSearch, setGlobalSearch] = useState('');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Synchronize to localStorage whenever data changes
  useEffect(() => {
    saveStoredArticles(articles);
  }, [articles]);

  useEffect(() => {
    saveStoredUsers(users);
  }, [users]);

  useEffect(() => {
    saveStoredActivities(activities);
  }, [activities]);

  // Compute live dynamic stats
  const dynamicStats = useMemo<StatMetric[]>(() => {
    const totalArticles = articles.length;
    const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);
    const activeUsersCount = users.filter((u) => u.status === 'active').length;

    return [
      {
        id: 'stat-articles',
        title: 'إجمالي المقالات',
        value: totalArticles.toLocaleString(),
        rawNumber: totalArticles,
        change: '+14.2%',
        isPositive: true,
        period: 'مقارنة بالشهر الماضي',
        iconName: 'file-text',
        color: 'emerald',
        sparkline: [35, 42, 48, 55, 53, 62, 70, 78, 85, totalArticles],
      },
      {
        id: 'stat-views',
        title: 'إجمالي المشاهدات',
        value: totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}K` : totalViews.toString(),
        rawNumber: totalViews,
        change: '+28.6%',
        isPositive: true,
        period: 'مقارنة بالأسبوع السابق',
        iconName: 'eye',
        color: 'indigo',
        sparkline: [120, 140, 190, 220, 210, 280, 310, 340, 360, 385],
      },
      {
        id: 'stat-users',
        title: 'المستخدمين النشطين',
        value: activeUsersCount.toLocaleString(),
        rawNumber: activeUsersCount,
        change: '+8.4%',
        isPositive: true,
        period: `من إجمالي ${users.length} مستخدم`,
        iconName: 'users',
        color: 'sky',
        sparkline: [40, 45, 52, 58, 65, 62, 71, 79, 82, 89],
      },
      {
        id: 'stat-engagement',
        title: 'معدل التفاعل والقراءة',
        value: '76.8%',
        rawNumber: 76.8,
        change: '+3.9%',
        isPositive: true,
        period: 'متوسط وقت القراءة 5.2 دقيقة',
        iconName: 'trending-up',
        color: 'amber',
        sparkline: [62, 65, 68, 67, 72, 70, 74, 73, 75, 77],
      },
    ];
  }, [articles, users]);

  // Modal Dialog States
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState<Article | null>(null);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    type: 'article' | 'user' | 'bulk_articles';
    id?: string;
    ids?: string[];
    title?: string;
  }>({
    isOpen: false,
    type: 'article',
  });

  // Handler: Add or Update Article
  const handleSaveArticle = (articleData: Partial<Article>) => {
    if (articleToEdit) {
      // Update existing
      setArticles((prev) =>
        prev.map((a) => (a.id === articleToEdit.id ? ({ ...a, ...articleData } as Article) : a))
      );

      // Record Activity
      const newActivity: ActivityLog = {
        id: `act-${Date.now()}`,
        user: 'عبدالرحمن باجبير',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        action: 'تعديل بيانات المقال',
        target: articleData.title || articleToEdit.title,
        timestamp: 'الآن',
        type: 'update',
      };
      setActivities((prev) => [newActivity, ...prev]);

      showToast(`تم تحديث المقال "${articleData.title}" بنجاح!`, 'success');
    } else {
      // Create new
      const newArticle = articleData as Article;
      setArticles((prev) => [newArticle, ...prev]);

      // Record Activity
      const newActivity: ActivityLog = {
        id: `act-${Date.now()}`,
        user: 'عبدالرحمن باجبير',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        action: 'إضافة ونشر مقال جديد',
        target: newArticle.title,
        timestamp: 'الآن',
        type: 'publish',
      };
      setActivities((prev) => [newActivity, ...prev]);

      showToast(`تمت إضافة المقال "${newArticle.title}" بنجاح!`, 'success');
    }

    setIsArticleModalOpen(false);
    setArticleToEdit(null);
  };

  // Handler: Quick Draft from Dashboard
  const handleQuickDraftSubmit = (title: string, category: string) => {
    const newDraft: Article = {
      id: `art-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
      summary: 'مسودة فكرة مقال تم حفظها سريعاً من لوحة التحكم.',
      content: 'مسودة قيد التحرير...',
      category,
      author: {
        name: 'عبدالرحمن باجبير',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        role: 'مدير عام',
      },
      status: 'draft',
      views: 0,
      likes: 0,
      readTime: '3 دقائق',
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      tags: ['مسودة', category],
    };

    setArticles((prev) => [newDraft, ...prev]);

    const newActivity: ActivityLog = {
      id: `act-${Date.now()}`,
      user: 'عبدالرحمن باجبير',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      action: 'حفظ مسودة سريعة',
      target: title,
      timestamp: 'الآن',
      type: 'create',
    };
    setActivities((prev) => [newActivity, ...prev]);

    showToast(`تم حفظ المسودة "${title}" في جدول المقالات.`, 'info');
  };

  // Handler: Toggle Publish / Draft Status
  const handleToggleArticleStatus = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          const nextStatus: ArticleStatus =
            art.status === 'published' ? 'draft' : art.status === 'draft' ? 'archived' : 'published';
          showToast(`تم تغيير حالة المقال إلى "${nextStatus === 'published' ? 'منشور' : nextStatus === 'draft' ? 'مسودة' : 'مؤرشف'}"`, 'info');
          return { ...art, status: nextStatus };
        }
        return art;
      })
    );
  };

  // Handler: Confirm Delete
  const handleConfirmDelete = () => {
    if (deleteConfirm.type === 'article' && deleteConfirm.id) {
      const target = articles.find((a) => a.id === deleteConfirm.id);
      setArticles((prev) => prev.filter((a) => a.id !== deleteConfirm.id));

      if (target) {
        setActivities((prev) => [
          {
            id: `act-${Date.now()}`,
            user: 'عبدالرحمن باجبير',
            userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
            action: 'حذف مقال',
            target: target.title,
            timestamp: 'الآن',
            type: 'delete',
          },
          ...prev,
        ]);
        showToast(`تم حذف المقال "${target.title}" نهائياً.`, 'error');
      }
    } else if (deleteConfirm.type === 'bulk_articles' && deleteConfirm.ids) {
      setArticles((prev) => prev.filter((a) => !deleteConfirm.ids!.includes(a.id)));
      showToast(`تم حذف ${deleteConfirm.ids.length} مقال بنجاح.`, 'error');
    } else if (deleteConfirm.type === 'user' && deleteConfirm.id) {
      const target = users.find((u) => u.id === deleteConfirm.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteConfirm.id));
      if (target) {
        showToast(`تم حذف المستخدم "${target.name}".`, 'error');
      }
    }
  };

  // Handler: Add or Update User
  const handleSaveUser = (userData: Partial<User>) => {
    if (userToEdit) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userToEdit.id ? ({ ...u, ...userData } as User) : u))
      );
      showToast(`تم تحديث بيانات المستخدم "${userData.name}" بنجاح!`, 'success');
    } else {
      const newUser = userData as User;
      setUsers((prev) => [newUser, ...prev]);
      showToast(`تمت إضافة المستخدم "${newUser.name}" بنجاح!`, 'success');
    }
    setIsUserModalOpen(false);
    setUserToEdit(null);
  };

  // Handler: Reset to default Demo Data
  const handleResetToDemoData = () => {
    setArticles(INITIAL_ARTICLES);
    setUsers(INITIAL_USERS);
    setActivities(INITIAL_ACTIVITIES);
    saveStoredArticles(INITIAL_ARTICLES);
    saveStoredUsers(INITIAL_USERS);
    saveStoredActivities(INITIAL_ACTIVITIES);
    showToast('تمت استعادة البيانات التوضيحية بنجاح!', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-x-hidden font-sans">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-200">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'info' && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          <span className="text-xs sm:text-sm font-semibold text-slate-200">{toastMessage.text}</span>
        </div>
      )}

      {/* Main Responsive RTL Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        articlesCount={articles.length}
        usersCount={users.length}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:mr-20' : 'lg:mr-68'
        }`}
      >
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenNewArticleModal={() => {
            setArticleToEdit(null);
            setIsArticleModalOpen(true);
          }}
          activities={activities}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onResetToDemoData={handleResetToDemoData}
        />

        {/* View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {currentTab === 'dashboard' && (
            <DashboardOverview
              stats={dynamicStats}
              articles={articles}
              activities={activities}
              onSelectTab={setCurrentTab}
              onAddArticle={() => {
                setArticleToEdit(null);
                setIsArticleModalOpen(true);
              }}
              onEditArticle={(art) => {
                setArticleToEdit(art);
                setIsArticleModalOpen(true);
              }}
              onDeleteArticle={(id) => {
                const target = articles.find((a) => a.id === id);
                setDeleteConfirm({
                  isOpen: true,
                  type: 'article',
                  id,
                  title: target?.title,
                });
              }}
              onPreviewArticle={(art) => {
                setPreviewArticle(art);
                setIsPreviewModalOpen(true);
              }}
              onQuickDraftSubmit={handleQuickDraftSubmit}
            />
          )}

          {currentTab === 'articles' && (
            <ArticlesManagement
              articles={articles}
              onAddArticle={() => {
                setArticleToEdit(null);
                setIsArticleModalOpen(true);
              }}
              onEditArticle={(art) => {
                setArticleToEdit(art);
                setIsArticleModalOpen(true);
              }}
              onDeleteArticle={(id) => {
                const target = articles.find((a) => a.id === id);
                setDeleteConfirm({
                  isOpen: true,
                  type: 'article',
                  id,
                  title: target?.title,
                });
              }}
              onPreviewArticle={(art) => {
                setPreviewArticle(art);
                setIsPreviewModalOpen(true);
              }}
              onToggleStatus={handleToggleArticleStatus}
              onBulkDelete={(ids) => {
                setDeleteConfirm({
                  isOpen: true,
                  type: 'bulk_articles',
                  ids,
                  title: `${ids.length} مقالات محددة`,
                });
              }}
            />
          )}

          {currentTab === 'users' && (
            <UsersManagement
              users={users}
              onAddUser={() => {
                setUserToEdit(null);
                setIsUserModalOpen(true);
              }}
              onEditUser={(u) => {
                setUserToEdit(u);
                setIsUserModalOpen(true);
              }}
              onDeleteUser={(id) => {
                const target = users.find((u) => u.id === id);
                setDeleteConfirm({
                  isOpen: true,
                  type: 'user',
                  id,
                  title: target?.name,
                });
              }}
            />
          )}

          {currentTab === 'analytics' && <AnalyticsView articles={articles} />}
        </main>
      </div>

      {/* Add / Edit Article Modal */}
      <ArticleModal
        isOpen={isArticleModalOpen}
        onClose={() => {
          setIsArticleModalOpen(false);
          setArticleToEdit(null);
        }}
        onSave={handleSaveArticle}
        articleToEdit={articleToEdit}
      />

      {/* Add / Edit User Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setUserToEdit(null);
        }}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, type: 'article' })}
        onConfirm={handleConfirmDelete}
        itemTitle={deleteConfirm.title}
      />

      {/* Quick Article Preview Modal */}
      <ArticlePreviewModal
        article={previewArticle}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewArticle(null);
        }}
        onEdit={(art) => {
          setArticleToEdit(art);
          setIsArticleModalOpen(true);
        }}
      />
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Archive, 
  ArrowUpDown, 
  ChevronRight, 
  ChevronLeft,
  Download,
  CheckSquare,
  Square,
  MoreVertical,
  Layers,
  AlertCircle
} from 'lucide-react';
import { Article, ArticleStatus } from '../types';
import { INITIAL_CATEGORIES } from '../data/mockData';

interface ArticlesManagementProps {
  articles: Article[];
  onAddArticle: () => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
  onPreviewArticle: (article: Article) => void;
  onToggleStatus: (articleId: string) => void;
  onBulkDelete?: (ids: string[]) => void;
}

type SortField = 'date' | 'views' | 'title';
type SortOrder = 'asc' | 'desc';

export const ArticlesManagement: React.FC<ArticlesManagementProps> = ({
  articles,
  onAddArticle,
  onEditArticle,
  onDeleteArticle,
  onPreviewArticle,
  onToggleStatus,
  onBulkDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => {
        // Search query filter
        const matchesSearch =
          !searchQuery.trim() ||
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category filter
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

        // Status filter
        const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortField === 'date') {
          const dateA = new Date(a.publishedAt || 0).getTime();
          const dateB = new Date(b.publishedAt || 0).getTime();
          return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        }
        if (sortField === 'views') {
          return sortOrder === 'desc' ? b.views - a.views : a.views - b.views;
        }
        if (sortField === 'title') {
          return sortOrder === 'desc'
            ? b.title.localeCompare(a.title, 'ar')
            : a.title.localeCompare(b.title, 'ar');
        }
        return 0;
      });
  }, [articles, searchQuery, selectedCategory, selectedStatus, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedArticles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedArticles.map((a) => a.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (onBulkDelete) {
      onBulkDelete(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleExportCSV = () => {
    const headers = ['المعرف', 'العنوان', 'التصنيف', 'الكاتب', 'الحالة', 'المشاهدات', 'تاريخ النشر'];
    const rows = filteredArticles.map((a) => [
      a.id,
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.category}"`,
      `"${a.author.name}"`,
      a.status,
      a.views,
      a.publishedAt,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `articles_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getStatusBadge = (status: ArticleStatus) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            منشور
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            مسودة
          </span>
        );
      case 'archived':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-700/50 text-slate-400 border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            مؤرشف
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Action and Filter Control Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-950/20 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Section Heading & Counter */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/15 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-100">
                  قائمة المقالات التحريرية
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {filteredArticles.length} مقال
                </span>
              </div>
              <p className="text-xs text-slate-400">
                إدارة كاملة لإضافة ونشر وتعديل وأرشفة المقالات
              </p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {selectedIds.length > 0 && (
              <button
                id="btn-bulk-delete-articles"
                onClick={handleBulkDelete}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                حذف المحدد ({selectedIds.length})
              </button>
            )}

            <button
              id="btn-export-articles-csv"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors"
              title="تصدير المقالات كملف CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تصدير CSV</span>
            </button>

            <button
              id="btn-add-article-main"
              onClick={onAddArticle}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 active:scale-98 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مقال جديد</span>
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
          {/* Live Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="articles-table-search"
              type="text"
              placeholder="ابحث بالاسم، الكاتب، التصنيف..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-3 pr-9 py-2 text-xs bg-slate-800/60 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              id="articles-filter-category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs bg-slate-800/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none"
            >
              <option value="all" className="bg-slate-900">
                جميع التصنيفات ({articles.length})
              </option>
              {INITIAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat} ({articles.filter((a) => a.category === cat).length})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              id="articles-filter-status"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs bg-slate-800/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none"
            >
              <option value="all" className="bg-slate-900">
                جميع الحالات
              </option>
              <option value="published" className="bg-slate-900 text-emerald-400">
                منشور ({articles.filter((a) => a.status === 'published').length})
              </option>
              <option value="draft" className="bg-slate-900 text-amber-400">
                مسودة ({articles.filter((a) => a.status === 'draft').length})
              </option>
              <option value="archived" className="bg-slate-900 text-slate-400">
                مؤرشف ({articles.filter((a) => a.status === 'archived').length})
              </option>
            </select>
          </div>

          {/* Items per page selector */}
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-slate-400">
            <span>عدد العناصر:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1.5 bg-slate-800/60 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none"
            >
              <option value={5}>5 مقالات</option>
              <option value={6}>6 مقالات</option>
              <option value={10}>10 مقالات</option>
              <option value={20}>20 مقال</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Articles Table Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[700px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">
                  <button
                    onClick={handleSelectAll}
                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {selectedIds.length > 0 && selectedIds.length === paginatedArticles.length ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>

                <th
                  onClick={() => toggleSort('title')}
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>المقال والتصنيف</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>

                <th className="py-3.5 px-4">الكاتب</th>

                <th className="py-3.5 px-4 text-center">الحالة</th>

                <th
                  onClick={() => toggleSort('views')}
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-1.5 justify-center">
                    <span>المشاهدات</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>

                <th
                  onClick={() => toggleSort('date')}
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>تاريخ النشر</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>

                <th className="py-3.5 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {paginatedArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="w-8 h-8 text-slate-600" />
                      <p className="font-semibold text-slate-300">لا توجد مقالات مطابقة لمعايير البحث</p>
                      <p className="text-xs text-slate-500">
                        جرب تغيير كلمات البحث أو إعادة تعيين الفلاتر
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedArticles.map((article) => {
                  const isSelected = selectedIds.includes(article.id);

                  return (
                    <tr
                      key={article.id}
                      id={`article-row-${article.id}`}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isSelected ? 'bg-indigo-950/20' : ''
                      }`}
                    >
                      {/* Checkbox Column */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleSelect(article.id)}
                          className="text-slate-500 hover:text-indigo-400 transition-colors"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Article Title & Cover Thumbnail */}
                      <td className="py-4 px-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-12 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                onClick={() => onPreviewArticle(article)}
                                className="font-bold text-slate-100 hover:text-indigo-300 transition-colors truncate cursor-pointer"
                                title={article.title}
                              >
                                {article.title}
                              </span>
                              {article.featured && (
                                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" title="مقال مميز" />
                              )}
                            </div>
                            <span className="text-[11px] text-indigo-400 font-medium mt-0.5">
                              {article.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Author Column */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <p className="font-medium text-slate-200">{article.author.name}</p>
                            <p className="text-[10px] text-slate-400">{article.author.role}</p>
                          </div>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => onToggleStatus(article.id)}
                          title="انقر لتغيير حالة النشر سريعا"
                          className="hover:scale-105 active:scale-95 transition-transform"
                        >
                          {getStatusBadge(article.status)}
                        </button>
                      </td>

                      {/* Views Column */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg">
                          <Eye className="w-3 h-3 text-slate-400" />
                          {article.views.toLocaleString()}
                        </span>
                      </td>

                      {/* Date Column */}
                      <td className="py-4 px-4 whitespace-nowrap text-slate-400 font-medium">
                        <div className="flex flex-col">
                          <span>{article.publishedAt}</span>
                          <span className="text-[10px] text-slate-500">{article.readTime}</span>
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Preview Button */}
                          <button
                            id={`btn-preview-article-${article.id}`}
                            onClick={() => onPreviewArticle(article)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                            title="معاينة المقال"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Button */}
                          <button
                            id={`btn-edit-article-${article.id}`}
                            onClick={() => onEditArticle(article)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                            title="تعديل المقال"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            id={`btn-delete-article-${article.id}`}
                            onClick={() => onDeleteArticle(article.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                            title="حذف المقال"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400">
          <div>
            عرض من <span className="font-bold text-slate-200">{filteredArticles.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> إلى{' '}
            <span className="font-bold text-slate-200">
              {Math.min(currentPage * itemsPerPage, filteredArticles.length)}
            </span>{' '}
            من إجمالي <span className="font-bold text-slate-200">{filteredArticles.length}</span> مقال
          </div>

          {/* Page Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
              title="الصفحة السابقة"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === pageNum
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
              title="الصفحة التالية"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

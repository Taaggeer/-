import React from 'react';
import { 
  X, 
  Eye, 
  Heart, 
  Calendar, 
  Clock, 
  Tag, 
  CheckCircle, 
  FileText, 
  Share2,
  Bookmark
} from 'lucide-react';
import { Article } from '../types';

interface ArticlePreviewModalProps {
  article: Article | null;
  onClose: () => void;
  onEdit?: (article: Article) => void;
}

export const ArticlePreviewModal: React.FC<ArticlePreviewModalProps> = ({
  article,
  onClose,
  onEdit,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        id="article-preview-dialog"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Cover Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Pill */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
              {article.category}
            </span>
            {article.status === 'published' && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                منشور
              </span>
            )}
            {article.status === 'draft' && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                مسودة
              </span>
            )}
            {article.status === 'archived' && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-700 text-slate-300">
                مؤرشف
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-right">
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 leading-snug">
            {article.title}
          </h2>

          {/* Author info & metrics */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-800">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-700"
              />
              <div>
                <p className="text-xs font-bold text-slate-200">{article.author.name}</p>
                <p className="text-[11px] text-slate-400">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1 text-indigo-400">
                <Eye className="w-3.5 h-3.5" />
                {article.views.toLocaleString()} مشاهدة
              </span>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <p className="text-xs font-semibold text-slate-300 leading-relaxed italic">
              "{article.summary}"
            </p>
          </div>

          {/* Main content text */}
          <div className="text-sm text-slate-300 leading-relaxed space-y-3 pt-2">
            <p>{article.content}</p>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-800">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            آخر تحديث: {article.updatedAt || article.publishedAt}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              إغلاق
            </button>
            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(article);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                تعديل هذا المقال
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Sparkles, 
  Image as ImageIcon, 
  Tag, 
  User, 
  Calendar, 
  Clock, 
  FileText,
  CheckCircle,
  FolderTree,
  Eye
} from 'lucide-react';
import { Article, ArticleStatus } from '../types';
import { INITIAL_CATEGORIES } from '../data/mockData';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (articleData: Partial<Article>) => void;
  articleToEdit?: Article | null;
  categories?: string[];
}

const SAMPLE_COVERS = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1581291518655-9523c932deda?w=600&auto=format&fit=crop&q=80',
];

export const ArticleModal: React.FC<ArticleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  articleToEdit,
  categories = INITIAL_CATEGORIES,
}) => {
  const isEditMode = Boolean(articleToEdit);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0] || 'الذكاء الاصطناعي');
  const [authorName, setAuthorName] = useState('م. أحمد الشمري');
  const [authorRole, setAuthorRole] = useState('كاتب ومحرر تقني');
  const [status, setStatus] = useState<ArticleStatus>('published');
  const [coverImage, setCoverImage] = useState(SAMPLE_COVERS[0]);
  const [tagsInput, setTagsInput] = useState('');
  const [readTime, setReadTime] = useState('5 دقائق');
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; summary?: string }>({});

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setSummary(articleToEdit.summary);
      setContent(articleToEdit.content || '');
      setCategory(articleToEdit.category);
      setAuthorName(articleToEdit.author?.name || 'م. أحمد الشمري');
      setAuthorRole(articleToEdit.author?.role || 'كاتب تقني');
      setStatus(articleToEdit.status);
      setCoverImage(articleToEdit.coverImage || SAMPLE_COVERS[0]);
      setTagsInput(articleToEdit.tags?.join('، ') || '');
      setReadTime(articleToEdit.readTime || '5 دقائق');
      setFeatured(Boolean(articleToEdit.featured));
    } else {
      // Reset form for fresh creation
      setTitle('');
      setSummary('');
      setContent('');
      setCategory(categories[0] || 'الذكاء الاصطناعي');
      setAuthorName('م. أحمد الشمري');
      setAuthorRole('كاتب تقني');
      setStatus('published');
      setCoverImage(SAMPLE_COVERS[0]);
      setTagsInput('تقنية، ذكاء اصطناعي');
      setReadTime('5 دقائق');
      setFeatured(false);
    }
    setErrors({});
  }, [articleToEdit, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; summary?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'يرجى كتابة عنوان المقال';
    }
    if (!summary.trim()) {
      newErrors.summary = 'يرجى كتابة ملخص أو مقتطف للمقال';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const parsedTags = tagsInput
      .split(/[،,]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const articleData: Partial<Article> = {
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim() || summary.trim(),
      category,
      author: {
        name: authorName,
        role: authorRole,
        avatar:
          articleToEdit?.author?.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
      status,
      coverImage,
      tags: parsedTags.length > 0 ? parsedTags : ['عام'],
      readTime: readTime || '4 دقائق',
      featured,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    if (!isEditMode) {
      articleData.id = `art-${Date.now()}`;
      articleData.slug = title.toLowerCase().replace(/\s+/g, '-').slice(0, 50);
      articleData.views = 0;
      articleData.likes = 0;
      articleData.publishedAt = new Date().toISOString().split('T')[0];
    }

    onSave(articleData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        id="article-modal-dialog"
        className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                {isEditMode ? 'تعديل المقال' : 'إضافة مقال جديد'}
              </h2>
              <p className="text-xs text-slate-400">
                {isEditMode ? 'قم بتحديث بيانات ومحتوى المقال' : 'أدخل تفاصيل ومحتوى المقال للنشر في المنصة'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-article-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-right">
          {/* Article Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              عنوان المقال <span className="text-rose-400">*</span>
            </label>
            <input
              id="article-input-title"
              type="text"
              placeholder="مثال: مستقبل الذكاء الاصطناعي التوليدي في 2026..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2.5 bg-slate-800/80 border ${
                errors.title ? 'border-rose-500 ring-1 ring-rose-500/50' : 'border-slate-700'
              } rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
            />
            {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title}</p>}
          </div>

          {/* Two Columns: Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5 text-indigo-400" />
                القسم / التصنيف
              </label>
              <select
                id="article-select-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-slate-100">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                حالة المقال
              </label>
              <select
                id="article-select-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="published" className="bg-slate-900 text-emerald-400">
                  منشور (جاهز للقراء)
                </option>
                <option value="draft" className="bg-slate-900 text-amber-400">
                  مسودة (غير منشور)
                </option>
                <option value="archived" className="bg-slate-900 text-slate-400">
                  مؤرشف
                </option>
              </select>
            </div>
          </div>

          {/* Author Name & Estimated Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-400" />
                اسم الكاتب / المحرر
              </label>
              <input
                id="article-input-author"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                وقت القراءة المقدر
              </label>
              <input
                id="article-input-readtime"
                type="text"
                placeholder="مثال: 5 دقائق"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Article Summary */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              مقتطف / نبذة مختصرة عن المقال <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="article-textarea-summary"
              rows={2}
              placeholder="اكتب ملخصاً موجزاً يظهر في البطاقات وقوائم البحث..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={`w-full px-4 py-2.5 bg-slate-800/80 border ${
                errors.summary ? 'border-rose-500' : 'border-slate-700'
              } rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 resize-none`}
            />
            {errors.summary && <p className="text-xs text-rose-400 mt-1">{errors.summary}</p>}
          </div>

          {/* Article Full Content */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              المحتوى الكامل للمقال
            </label>
            <textarea
              id="article-textarea-content"
              rows={5}
              placeholder="اكتب نص المقال الكامل هنا بالتفصيل..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Cover Image & Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
              صورة الغلاف (رابط الصورة)
            </label>
            <input
              id="article-input-cover"
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 mb-2"
            />
            {/* Quick Pick Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-slate-400 shrink-0">نماذج سريعة:</span>
              {SAMPLE_COVERS.map((url, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCoverImage(url)}
                  className={`relative w-12 h-8 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    coverImage === url ? 'border-indigo-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="Cover preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Tags & Featured Checkbox */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                الوسوم (مفصولة بفواصل)
              </label>
              <input
                id="article-input-tags"
                type="text"
                placeholder="ذكاء اصطناعي، ويب، برمجة"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-4 sm:pt-6">
              <label className="relative flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  id="article-checkbox-featured"
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded-md border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  تمييز المقال في الواجهة الرئيسية
                </span>
              </label>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-800">
            <button
              id="btn-cancel-article-modal"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              إلغاء
            </button>
            <button
              id="btn-save-article-modal"
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 active:scale-98 transition-all"
            >
              <Save className="w-4 h-4" />
              {isEditMode ? 'حفظ التعديلات' : 'نشر المقال الآن'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

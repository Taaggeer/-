import React, { useState, useEffect } from 'react';
import { X, Save, User as UserIcon, Mail, Shield, Activity, FileText } from 'lucide-react';
import { User, UserRole, UserStatus } from '../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Partial<User>) => void;
  userToEdit?: User | null;
}

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
];

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  userToEdit,
}) => {
  const isEditMode = Boolean(userToEdit);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('author');
  const [status, setStatus] = useState<UserStatus>('active');
  const [avatar, setAvatar] = useState(SAMPLE_AVATARS[0]);
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setRole(userToEdit.role);
      setStatus(userToEdit.status);
      setAvatar(userToEdit.avatar || SAMPLE_AVATARS[0]);
      setBio(userToEdit.bio || '');
    } else {
      setName('');
      setEmail('');
      setRole('author');
      setStatus('active');
      setAvatar(SAMPLE_AVATARS[Math.floor(Math.random() * SAMPLE_AVATARS.length)]);
      setBio('');
    }
    setErrors({});
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = 'يرجى إدخال اسم المستخدم';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData: Partial<User> = {
      name: name.trim(),
      email: email.trim(),
      role,
      status,
      avatar,
      bio: bio.trim(),
    };

    if (!isEditMode) {
      userData.id = `user-${Date.now()}`;
      userData.articlesCount = 0;
      userData.joinedAt = new Date().toISOString().split('T')[0];
      userData.lastActive = 'الآن';
    }

    onSave(userData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-right">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {isEditMode ? 'تعديل بيانات المستخدم' : 'إضافة مستخدم جديد'}
              </h3>
              <p className="text-xs text-slate-400">تحديد الصلاحيات والبيانات الأساسية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              اسم المستخدم <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="مثال: د. ماجد السبيعي"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
            />
            {errors.name && <p className="text-rose-400 mt-1 text-[11px]">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              البريد الإلكتروني <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              placeholder="example@platform.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
            />
            {errors.email && <p className="text-rose-400 mt-1 text-[11px]">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">الدور والصلاحية</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="admin">مدير عام (Admin)</option>
                <option value="editor">محرر رئيسي (Editor)</option>
                <option value="author">كاتب مقالات (Author)</option>
                <option value="subscriber">مشترك وقارئ (Subscriber)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">حالة الحساب</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as UserStatus)}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="active" className="text-emerald-400">
                  نشط ومفعل
                </option>
                <option value="pending" className="text-amber-400">
                  بانتظار التأكيد
                </option>
                <option value="suspended" className="text-rose-400">
                  محظور / معلق
                </option>
              </select>
            </div>
          </div>

          {/* Avatar picker */}
          <div>
            <label className="block font-bold text-slate-300 mb-1.5">الصورة الرمزية</label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {SAMPLE_AVATARS.map((url, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setAvatar(url)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 shrink-0 transition-all ${
                    avatar === url ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-105' : 'border-slate-700 opacity-60'
                  }`}
                >
                  <img src={url} alt="avatar" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">نبذة تعريفية</label>
            <textarea
              rows={2}
              placeholder="اكتب نبذة مختصرة عن الكاتب أو المسؤول..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 font-semibold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-md shadow-indigo-600/30"
            >
              <Save className="w-4 h-4" />
              {isEditMode ? 'حفظ التعديلات' : 'إضافة المستخدم'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

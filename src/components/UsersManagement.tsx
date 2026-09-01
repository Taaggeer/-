import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  ShieldAlert, 
  Shield, 
  Mail, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';
import { User, UserRole, UserStatus } from '../types';

interface UsersManagementProps {
  users: User[];
  onAddUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

export const UsersManagement: React.FC<UsersManagementProps> = ({
  users,
  onAddUser,
  onEditUser,
  onDeleteUser,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchQuery =
        !searchQuery.trim() ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.bio && u.bio.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      const matchStatus = statusFilter === 'all' || u.status === statusFilter;

      return matchQuery && matchRole && matchStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            مدير عام
          </span>
        );
      case 'editor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Shield className="w-3.5 h-3.5" />
            محرر محتوى
          </span>
        );
      case 'author':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <FileText className="w-3.5 h-3.5" />
            كاتب مقالات
          </span>
        );
      case 'subscriber':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-700/50 text-slate-300 border border-slate-700">
            قارئ / مشترك
          </span>
        );
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            نشط
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            معلق
          </span>
        );
      case 'suspended':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            محظور
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Header Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-950/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-600/15 text-sky-400 border border-sky-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-100">
                  إدارة المستخدمين وفريق العمل
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300">
                  {filteredUsers.length} مستخدم
                </span>
              </div>
              <p className="text-xs text-slate-400">
                التحكم بالصلاحيات، متابعة نشاط الكتاب، وتعيين الأدوار التحريرية
              </p>
            </div>
          </div>

          <button
            id="btn-add-user-main"
            onClick={onAddUser}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-sky-600/20 transition-all active:scale-98"
          >
            <UserPlus className="w-4 h-4" />
            <span>إضافة مستخدم جديد</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم أو البريد الإلكتروني..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 text-xs bg-slate-800/60 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-800/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">جميع الأدوار والصلاحيات</option>
              <option value="admin">مدير عام (Admin)</option>
              <option value="editor">محرر (Editor)</option>
              <option value="author">كاتب (Author)</option>
              <option value="subscriber">مشترك (Subscriber)</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-800/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط ومفعل</option>
              <option value="pending">بانتظار التأكيد</option>
              <option value="suspended">محظور / معلق</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
            <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">لا يوجد مستخدمون يطابقون البحث</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              id={`user-card-${user.id}`}
              className="bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-950/10 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
            >
              <div>
                {/* Header: Avatar, Name, Email, Status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-700"
                      />
                      <span
                        className={`absolute bottom-0 left-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                          user.status === 'active'
                            ? 'bg-emerald-500'
                            : user.status === 'pending'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-slate-100 truncate">{user.name}</h3>
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 shrink-0" />
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div>{getStatusBadge(user.status)}</div>
                </div>

                {/* Role Pill and Bio */}
                <div className="mb-3">
                  <div className="mb-2">{getRoleBadge(user.role)}</div>
                  {user.bio && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{user.bio}</p>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-800/50 border border-slate-800 text-xs mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500">المقالات المنشورة</span>
                    <span className="font-bold text-slate-200 mt-0.5">{user.articlesCount} مقال</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500">آخر نشاط</span>
                    <span className="font-semibold text-slate-300 mt-0.5">{user.lastActive}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  انضم: {user.joinedAt}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEditUser(user)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                    title="تعديل المستخدم"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="حذف المستخدم"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

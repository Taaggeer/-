import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemTitle?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'تأكيد عملية الحذف',
  message = 'هل أنت متأكد من رغبتك في حذف هذا العنصر؟ لن تتمكن من التراجع عن هذا الإجراء.',
  itemTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="delete-confirm-dialog"
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-right"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{message}</p>
          </div>
        </div>

        {itemTitle && (
          <div className="p-3 mb-5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200 font-medium">
            <span className="text-slate-400 block mb-0.5 text-[11px]">العنصر المحدد:</span>
            "{itemTitle}"
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            id="btn-cancel-delete"
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            تراجع
          </button>
          <button
            id="btn-confirm-delete"
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-600/20 active:scale-98 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            تأكيد الحذف النهائي
          </button>
        </div>
      </div>
    </div>
  );
};

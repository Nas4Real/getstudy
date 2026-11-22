import { useContext, useLayoutEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { ToastContext } from './ToastContext';

interface DialogProps {
  label: string;
  modal?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

/** Native modality makes the rest of the app inert and restores the opener's focus. */
export function Dialog({ label, onClose, children, modal = true }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const toastMessage = useContext(ToastContext);

  useLayoutEffect(() => {
    if (!modal) return;
    const dialog = ref.current;
    const opener = document.activeElement;
    dialog?.showModal();
    dialog?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    return () => {
      dialog?.close();
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, [modal]);

  if (!modal) return children;

  return createPortal(
    <dialog
      ref={ref}
      aria-label={label}
      className="app-dialog"
      onCancel={(event) => {
        event.preventDefault();
        onClose?.();
      }}
      onKeyDown={(event) => {
        // The top dialog owns Escape; app-level listeners must not dismiss other layers.
        if (event.key === 'Escape') event.stopPropagation();
        if (event.key !== 'Tab') return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]',
        )).filter(el => el.tabIndex >= 0 && !el.matches(':disabled') && el.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      {children}
      <Toast message={toastMessage} />
    </dialog>,
    document.body,
  );
}

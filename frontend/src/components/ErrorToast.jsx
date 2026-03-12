import { useEffect, useState } from 'react';

/**
 * ErrorToast — drop-in replacement for alert() across the project.
 *
 * Usage:
 *   const [toast, setToast] = useState(null);
 *   setToast('Something went wrong!');               // error (default)
 *   setToast({ message: 'Done!', type: 'success' }); // success
 *   setToast({ message: 'Heads up', type: 'warning' });
 *   <ErrorToast message={toast} onClose={() => setToast(null)} />
 */
export default function ErrorToast({ message, onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const isObj = message && typeof message === 'object';
  const text = isObj ? message.message : message;
  const type = isObj ? (message.type ?? 'error') : 'error';

  const isSuccess = type === 'success';
  const isWarning = type === 'warning';

  useEffect(() => {
    if (!text) return;
    setExiting(false);
    setVisible(true);

    const hideTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, 400);
    }, duration);

    return () => clearTimeout(hideTimer);
  }, [text, duration]);

  if (!visible || !text) return null;

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 400);
  };

  // Tailwind variant maps
  const wrapperBg   = isSuccess ? 'bg-green-950'       : isWarning ? 'bg-yellow-950'      : 'bg-slate-900';
  const border      = isSuccess ? 'border-green-500/30' : isWarning ? 'border-yellow-400/30' : 'border-red-500/30';
  const glowBg      = isSuccess ? 'bg-green-500'        : isWarning ? 'bg-yellow-400'        : 'bg-red-500';
  const iconBg      = isSuccess ? 'bg-green-500/10'     : isWarning ? 'bg-yellow-400/10'     : 'bg-red-500/10';
  const iconBorder  = isSuccess ? 'border-green-500/30' : isWarning ? 'border-yellow-400/30' : 'border-red-500/30';
  const iconText    = isSuccess ? 'text-green-400'      : isWarning ? 'text-yellow-400'      : 'text-red-400';
  const labelText   = isSuccess ? 'text-green-400'      : isWarning ? 'text-yellow-400'      : 'text-red-400';
  const progressBg  = isSuccess ? 'bg-green-500/20'     : isWarning ? 'bg-yellow-400/20'     : 'bg-red-500/20';
  const progressBar = isSuccess ? 'bg-green-400'        : isWarning ? 'bg-yellow-400'        : 'bg-red-400';
  const label       = isSuccess ? 'Success'             : isWarning ? 'Warning'              : 'Error';
  const icon        = isSuccess ? '✓'                   : isWarning ? '⚠'                   : '✕';

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]
        min-w-[280px] max-w-[420px] w-[calc(100vw-3rem)]
        transition-all duration-300
        ${exiting
          ? 'opacity-0 translate-y-4 scale-95'
          : 'opacity-100 translate-y-0 scale-100'}
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className={`relative rounded-2xl shadow-2xl overflow-hidden border ${wrapperBg} ${border}`}>

        {/* Glow blob */}
        <div className={`absolute -top-6 -left-6 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none ${glowBg}`} />

        {/* Body */}
        <div className="relative flex items-start gap-3 px-4 py-3.5 pr-10">
          {/* Icon */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-base font-bold mt-0.5 border ${iconBg} ${iconBorder} ${iconText}`}>
            {icon}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${labelText}`}>
              {label}
            </p>
            <p className="text-white/90 text-sm font-medium leading-snug break-words">
              {text}
            </p>
          </div>
        </div>

        {/* Progress bar track */}
        <div className={`h-0.5 w-full ${progressBg}`}>
          <div
            className={`h-full ${progressBar}`}
            style={{ animation: `toastShrink ${duration}ms linear forwards` }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-6 h-6 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-150 text-xs"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>

      {/* Single keyframe for the progress bar shrink — unavoidable without a Tailwind plugin */}
      <style>{`@keyframes toastShrink { from { width: 100%; } to { width: 0%; } }`}</style>
    </div>
  );
}
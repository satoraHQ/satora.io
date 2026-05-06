"use client";

import CodeWindow, { CODE_LINES, TOKEN_COLORS } from "@/components/sections/CodeWindow";
import { HiOutlineArrowsPointingOut, HiOutlineCodeBracket, HiOutlineSparkles } from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";

const PREVIEW_LINE_COUNT = 11;
const DISMISS_THRESHOLD = 100;
const CLOSE_DURATION = 280;

export default function MobileCodePreview() {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStartY = useRef(0);

  // Mount animation: render at 100% offset, then slide to 0 on next frame
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setHasMounted(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // ESC + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setHasMounted(false);
      setIsClosing(false);
      setDragY(0);
    }, CLOSE_DURATION);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - dragStartY.current;
    setDragY(delta > 0 ? delta : 0);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > DISMISS_THRESHOLD) {
      handleClose();
    } else {
      setDragY(0);
    }
  };

  const previewLines = CODE_LINES.slice(0, PREVIEW_LINE_COUNT);

  // Sheet transform: closed = full-down, dragging = follow finger, else = 0
  const sheetTransform = !hasMounted || isClosing
    ? "translateY(100%)"
    : `translateY(${dragY}px)`;
  const backdropOpacity = !hasMounted || isClosing
    ? 0
    : Math.max(0, 1 - dragY / 500);

  return (
    <>
      {/* Teaser — mobile only */}
      <div className="lg:hidden relative w-full bg-white dark:bg-black overflow-hidden">
        {/* Ambient lime glow behind the card */}
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-[320px] h-[260px] bg-gradient-to-br from-lime/10 to-transparent dark:from-lime-light/8 dark:to-transparent blur-[80px] rounded-[40%_60%_55%_45%/45%_55%_45%_55%] rotate-[18deg] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -left-10 w-[300px] h-[240px] bg-gradient-to-tr from-lime/8 to-transparent dark:from-lime-light/6 dark:to-transparent blur-[80px] rounded-[55%_45%_50%_50%/55%_45%_55%_45%] -rotate-[12deg] pointer-events-none"
        />

        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 pt-2 pb-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Expand code example"
            className="group relative block w-full text-left rounded-2xl border border-gray-200/60 dark:border-white/[0.10] bg-white/60 dark:bg-[#0d0d0d]/70 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] overflow-hidden active:scale-[0.99] hover:border-gray-300/60 dark:hover:border-white/[0.16] transition-all duration-300"
          >
            {/* Tab bar — visually matches the real CodeWindow */}
            <div className="flex items-center justify-between px-3 h-11 border-b border-gray-100/80 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-0.5 bg-gray-100/80 dark:bg-white/[0.04] rounded-lg p-0.5">
                <span className="px-3 py-1.5 text-[11px] font-medium rounded-[7px] inline-flex items-center gap-1.5 text-gray-900 dark:text-white bg-white dark:bg-white/[0.10] shadow-sm">
                  <HiOutlineCodeBracket className="w-3 h-3" />
                  Integration Example
                </span>
                <span className="px-3 py-1.5 text-[11px] font-medium rounded-[7px] inline-flex items-center gap-1.5 text-gray-400 dark:text-white/30">
                  <HiOutlineSparkles className="w-3 h-3" />
                  Build with AI
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-gray-300 dark:text-white/20">
                <span className="w-1 h-1 rounded-full bg-lime-light/70" />
                21 lines
              </span>
            </div>

            {/* Real code preview with syntax highlighting + line numbers */}
            <div className="relative h-[210px] overflow-hidden pointer-events-none">
              <div className="py-3 font-mono text-[11.5px] leading-[1.7]">
                {previewLines.map((tokens, i) => (
                  <div key={i} className="flex px-4 min-h-[1.7em]">
                    <span className="w-5 flex-shrink-0 text-right mr-3 select-none text-gray-300 dark:text-white/15 text-[10.5px]">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">
                      {tokens.map((token, j) => (
                        <span key={j} className={TOKEN_COLORS[token.type]}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-[#0d0d0d] dark:via-[#0d0d0d]/90" />

              {/* Floating expand pill — secondary CTA style matches Hero "Open App" */}
              <div className="absolute inset-x-0 bottom-4 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-white/[0.06] backdrop-blur-lg border border-gray-200/60 dark:border-white/[0.08] text-gray-600 dark:text-gray-300 text-sm font-medium group-hover:bg-white/80 dark:group-hover:bg-white/[0.1] group-active:scale-95 transition-all duration-150">
                  <HiOutlineArrowsPointingOut className="w-4 h-4" />
                  Tap to expand
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom-sheet modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] lg:hidden flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Code example"
        >
          {/* Backdrop — tap to close, opacity follows drag */}
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md"
            style={{
              opacity: backdropOpacity,
              transition: isDragging ? "none" : `opacity ${CLOSE_DURATION}ms ease-out`,
            }}
          />
          {/* Sheet */}
          <div
            className="relative mt-auto h-[92dvh] max-h-[92dvh] w-full bg-white/75 dark:bg-[#0d0d0d]/85 backdrop-blur-2xl backdrop-saturate-150 border-t border-white/40 dark:border-white/[0.10] rounded-t-3xl shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
            style={{
              transform: sheetTransform,
              transition: isDragging
                ? "none"
                : `transform ${CLOSE_DURATION}ms cubic-bezier(0.32, 0.72, 0, 1)`,
              willChange: "transform",
            }}
          >
            {/* Lime glow inside modal */}
            <div
              aria-hidden="true"
              className="absolute -top-20 right-0 w-[350px] h-[280px] bg-gradient-to-br from-lime/12 to-transparent dark:from-lime-light/8 dark:to-transparent blur-[90px] rounded-[40%_60%_55%_45%/45%_55%_45%_55%] pointer-events-none"
            />
            {/* Drag zone — swipe down to dismiss */}
            <div
              className="relative flex flex-col items-center pt-3 pb-3 flex-shrink-0 select-none cursor-grab active:cursor-grabbing"
              style={{ touchAction: "none" }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <span className="w-10 h-[5px] rounded-full bg-gray-400 dark:bg-white/30" />
            </div>
            {/* Content */}
            <div className="relative flex-1 min-h-0 px-3 pb-[max(env(safe-area-inset-bottom),12px)]">
              <CodeWindow wizard />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

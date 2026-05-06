import { type RefObject, useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  root?: Element | null;
}

/**
 * Custom hook for observing element intersection with viewport
 * Properly handles cleanup to prevent memory leaks
 *
 * @param options - IntersectionObserver options
 * @returns [ref, isVisible] - Element ref and visibility state
 */
export function useIntersectionObserver<T extends HTMLElement>(
  options: UseIntersectionObserverOptions = {},
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    root = null,
  } = options;

  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Skip if running on server
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        // Disconnect after first trigger if triggerOnce is true
        if (isIntersecting && triggerOnce && observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      });
    };

    // Create new observer
    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin,
      root,
    });

    // Start observing
    observerRef.current.observe(element);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin, triggerOnce, root]);

  return [elementRef, isVisible];
}

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './CardCarousel.css';

/**
 * Infinite peek carousel for mobile.
 *
 * Built on native CSS scroll-snap, so touch swiping (and its momentum) is
 * handled by the browser rather than a JS drag implementation. The deck is
 * rendered three times; once scrolling settles we silently teleport back into
 * the middle copy, which gives an endless loop in both directions with no
 * visible jump.
 *
 * Rendered only below the `hiddenAbove` breakpoint - see CardCarousel.css.
 *
 * @param {{key: string, src: string, alt: string}[]} slides
 * @param {number} autoMs    ms each card is shown before advancing
 * @param {number} resumeMs  idle ms after a manual swipe before auto-advance resumes
 */

const GAP = 12; // must match `gap` on .cc-track in the CSS
const SETTLE_MS = 140; // debounce before we consider a scroll finished

export default function CardCarousel({ slides, autoMs = 4000, resumeMs = 6000, className = '' }) {
  const N = slides.length;
  const START = N;
  const LOOP = [...slides, ...slides, ...slides];

  const trackRef = useRef(null);
  const [index, setIndex] = useState(START);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);
  const settleTimer = useRef(null);
  const indexRef = useRef(START);

  const setIdx = useCallback((i) => {
    indexRef.current = i;
    setIndex(i);
  }, []);

  // Distance from one slide's left edge to the next.
  const step = useCallback(() => {
    const first = trackRef.current?.children[0];
    return first ? first.getBoundingClientRect().width + GAP : 0;
  }, []);

  // The track's side padding matches the slide inset, so centering slide i
  // works out to exactly i * step - no offset measuring needed.
  const scrollToIndex = useCallback(
    (i, behavior = 'smooth') => {
      const track = trackRef.current;
      const s = step();
      if (!track || !s) return;
      track.scrollTo({ left: i * s, behavior });
    },
    [step],
  );

  // Jump back into the middle copy if we've drifted out of it. 'auto' makes the
  // reposition instant and therefore invisible.
  const normalize = useCallback(() => {
    const i = indexRef.current;
    if (i >= 2 * N) {
      setIdx(i - N);
      scrollToIndex(i - N, 'auto');
    } else if (i < N) {
      setIdx(i + N);
      scrollToIndex(i + N, 'auto');
    }
  }, [N, scrollToIndex, setIdx]);

  // Land on the middle copy before first paint so there's no visible jump.
  useLayoutEffect(() => {
    scrollToIndex(START, 'auto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pauseThenResume = useCallback(() => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), resumeMs);
  }, [resumeMs]);

  // Auto-advance. Always moves forward; normalize() handles the wrap.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || paused) {
      return undefined;
    }
    const id = window.setInterval(() => {
      const next = indexRef.current + 1;
      setIdx(next);
      scrollToIndex(next, 'smooth');
    }, autoMs);
    return () => window.clearInterval(id);
  }, [paused, autoMs, scrollToIndex, setIdx]);

  // Track position while swiping, then normalize once scrolling settles.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    const s = step();
    if (!track || !s) return;
    indexRef.current = Math.round(track.scrollLeft / s);
    setIndex(indexRef.current);
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(normalize, SETTLE_MS);
  }, [normalize, step]);

  // Slide width is in vw, so a resize/rotate changes step - re-anchor.
  useEffect(() => {
    const onResize = () => scrollToIndex(indexRef.current, 'auto');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [scrollToIndex]);

  useEffect(
    () => () => {
      window.clearTimeout(resumeTimer.current);
      window.clearTimeout(settleTimer.current);
    },
    [],
  );

  const activeDot = ((index % N) + N) % N;

  return (
    <div className={`cc ${className}`.trim()}>
      <div
        className="cc-track"
        ref={trackRef}
        onScroll={onScroll}
        onTouchStart={pauseThenResume}
        onPointerDown={pauseThenResume}
      >
        {LOOP.map(({ key, src, alt }, i) => {
          // Only the middle copy is announced to screen readers, so the
          // duplicates aren't read out three times.
          const isMiddle = i >= N && i < 2 * N;
          return (
            <div key={`${key}-${i}`} className="cc-slide" aria-hidden={!isMiddle}>
              <img
                src={src}
                alt={isMiddle ? alt : ''}
                className="cc-slide-img"
                loading={isMiddle ? 'eager' : 'lazy'}
                decoding="async"
                draggable="false"
              />
            </div>
          );
        })}
      </div>

      <div className="cc-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            className={`cc-dot ${i === activeDot ? 'is-active' : ''}`}
            aria-label={`Show card ${i + 1}`}
            aria-current={i === activeDot}
            onClick={() => {
              pauseThenResume();
              // Move to this card within the copy we're currently in.
              const target = Math.floor(indexRef.current / N) * N + i;
              setIdx(target);
              scrollToIndex(target, 'smooth');
            }}
          />
        ))}
      </div>
    </div>
  );
}

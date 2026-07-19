import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import cardUniverse from '../../assets/card-universe.png';
import cardTogether from '../../assets/card-together.png';
import cardSend from '../../assets/card-send.png';
import cardMemories from '../../assets/card-memories.png';
import cardUniverseLaptop from '../../assets/card-universe-laptop.png';
import cardTogetherLaptop from '../../assets/card-together-laptop.png';
import cardSendLaptop from '../../assets/card-send-laptop.png';
import cardMemoriesLaptop from '../../assets/card-memories-laptop.png';
// Mobile carousel art (3:4 portrait). The old wide-banner mobile cards
// (card-*.png, ~2.89 ratio) are still imported above for the desktop grid
// and are kept for easy revert.
import cardStayConnected from '../../assets/section 2/card-stay-connected.jpg';
import cardDiscover from '../../assets/section 2/card-discover.jpg';
import cardKeepStory from '../../assets/section 2/card-keep-story.jpg';
import cardBuildUniverse from '../../assets/section 2/card-build-universe-s2.jpg';
import sectionBg from '../../assets/section 2 back.png';
import sectionBgLaptop from '../../assets/section 2 back laptop.png';
import './EverythingYouCanDo.css';

const CARDS = [
  { key: 'universe', src: cardUniverse, laptopSrc: cardUniverseLaptop, alt: 'Universe: Streaks, Milestones, Stardust' },
  { key: 'together', src: cardTogether, laptopSrc: cardTogetherLaptop, alt: 'Together: Voice notes, Daily questions, Rituals' },
  { key: 'send', src: cardSend, laptopSrc: cardSendLaptop, alt: 'Send: Diary, Photos, Secret Book' },
  { key: 'memories', src: cardMemories, laptopSrc: cardMemoriesLaptop, alt: 'Memories: Couple profile, Special dates, Shared story' },
];

// Mobile-only carousel slides (portrait art, different from the desktop grid).
const SLIDES = [
  { key: 'stay-connected', src: cardStayConnected, alt: 'Stay Connected: voice notes, daily rituals, photo of the day' },
  { key: 'discover', src: cardDiscover, alt: 'Discover Each Other: daily couple questions, Secret Book, This or That, Would You Rather, couple games' },
  { key: 'keep-story', src: cardKeepStory, alt: 'Keep Your Story: Shared Diary, Photo Book, Notes Jar, Memory Map, Special Dates' },
  { key: 'build-universe', src: cardBuildUniverse, alt: 'Build Your Universe: streaks, milestones, stardust, days together' },
];

const N = SLIDES.length;
const GAP = 12; // must match the `gap` on .eycd-track in the CSS
const AUTO_MS = 4000; // time each card is shown before advancing
const RESUME_MS = 6000; // idle time after a manual swipe before auto-advance resumes
const SETTLE_MS = 140; // debounce before we consider a scroll finished

// Three copies of the deck. We live in the middle copy and silently teleport
// back into it whenever scrolling drifts into the outer copies, which makes the
// carousel loop forever in both directions with no visible jump.
const LOOP = [...SLIDES, ...SLIDES, ...SLIDES];
const START = N; // first slide of the middle copy

export default function EverythingYouCanDo() {
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
    const track = trackRef.current;
    const first = track?.children[0];
    if (!first) return 0;
    return first.getBoundingClientRect().width + GAP;
  }, []);

  // Because .eycd-track is padded by 9vw and slides are 82vw, centering slide i
  // works out to exactly i * step - no need to measure offsets.
  const scrollToIndex = useCallback(
    (i, behavior = 'smooth') => {
      const track = trackRef.current;
      const s = step();
      if (!track || !s) return;
      track.scrollTo({ left: i * s, behavior });
    },
    [step],
  );

  // Jump back into the middle copy if we've drifted out of it. Uses 'auto' so
  // the reposition is instant and therefore invisible.
  const normalize = useCallback(() => {
    const i = indexRef.current;
    if (i >= 2 * N) {
      const next = i - N;
      setIdx(next);
      scrollToIndex(next, 'auto');
    } else if (i < N) {
      const next = i + N;
      setIdx(next);
      scrollToIndex(next, 'auto');
    }
  }, [scrollToIndex, setIdx]);

  // Land on the middle copy before first paint so there's no visible jump.
  useLayoutEffect(() => {
    scrollToIndex(START, 'auto');
  }, [scrollToIndex]);

  // Pause auto-advance while the user interacts, resume once they've stopped.
  const pauseThenResume = useCallback(() => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_MS);
  }, []);

  // Auto-advance. Always moves forward; normalize() handles the wrap.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || paused) return undefined;

    const id = window.setInterval(() => {
      const next = indexRef.current + 1;
      setIdx(next);
      scrollToIndex(next, 'smooth');
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [paused, scrollToIndex, setIdx]);

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
    <section id="everything-you-can-do" className="eycd">
      <picture>
        <source media="(min-width: 960px)" srcSet={sectionBgLaptop} />
        <img src={sectionBg} alt="" className="eycd-bg" aria-hidden="true" />
      </picture>

      <div className="eycd-content container">
        <div className="eycd-header">
          <h2 className="eycd-title">
            Inside your <span className="eycd-title-accent">universe</span>
          </h2>
          <p className="eycd-subtext">
            All the little ways to connect, have fun, and keep your relationship close — in one place.
          </p>
        </div>

        {/*
          MOBILE: infinite peek carousel on native CSS scroll-snap, so touch
          swiping (and its momentum) is handled by the browser. The deck is
          rendered three times and we teleport back to the middle copy once
          scrolling settles, which gives an endless loop in both directions.
          Hidden at >=960px in favour of the static grid below.
        */}
        <div className="eycd-carousel">
          <div
            className="eycd-track"
            ref={trackRef}
            onScroll={onScroll}
            onTouchStart={pauseThenResume}
            onPointerDown={pauseThenResume}
          >
            {LOOP.map(({ key, src, alt }, i) => {
              // Only the middle copy is announced to screen readers, so the
              // duplicates don't read out three times.
              const isMiddle = i >= N && i < 2 * N;
              return (
                <div key={`${key}-${i}`} className="eycd-slide" aria-hidden={!isMiddle}>
                  <img
                    src={src}
                    alt={isMiddle ? alt : ''}
                    className="eycd-slide-img"
                    loading={isMiddle ? 'eager' : 'lazy'}
                    draggable="false"
                  />
                </div>
              );
            })}
          </div>

          <div className="eycd-dots">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                className={`eycd-dot ${i === activeDot ? 'is-active' : ''}`}
                aria-label={`Show card ${i + 1}`}
                aria-current={i === activeDot}
                onClick={() => {
                  pauseThenResume();
                  // Move to this card within the copy we're currently in.
                  const base = Math.floor(indexRef.current / N) * N;
                  const target = base + i;
                  setIdx(target);
                  scrollToIndex(target, 'smooth');
                }}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP: static 4-column grid, unchanged. */}
        <div className="eycd-grid">
          {CARDS.map(({ key, src, laptopSrc, alt }) => (
            <div key={key} className="eycd-card">
              <picture>
                <source media="(min-width: 960px)" srcSet={laptopSrc} />
                <img src={src} alt={alt} className="eycd-card-img" />
              </picture>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

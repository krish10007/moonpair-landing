import { useCallback, useEffect, useRef, useState } from 'react';
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
// fallback and are kept for easy revert.
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

const AUTO_MS = 4000; // time each card is shown before advancing
const RESUME_MS = 6000; // idle time after a manual swipe before auto-advance resumes

export default function EverythingYouCanDo() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);
  const isProgrammatic = useRef(false);

  // Scroll the track to a given slide. Used by both auto-advance and the dots.
  const goTo = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i];
    if (!slide) return;
    isProgrammatic.current = true;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setIndex(i);
    window.setTimeout(() => {
      isProgrammatic.current = false;
    }, 600);
  }, []);

  // Pause auto-advance while the user is interacting, resume after they stop.
  const pauseThenResume = useCallback(() => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_MS);
  }, []);

  // Auto-advance timer. Skipped entirely when the user prefers reduced motion.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || paused) return undefined;

    const id = window.setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % SLIDES.length;
        const track = trackRef.current;
        const slide = track?.children[next];
        if (track && slide) {
          isProgrammatic.current = true;
          track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
          window.setTimeout(() => {
            isProgrammatic.current = false;
          }, 600);
        }
        return next;
      });
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [paused]);

  // Keep the dots in sync when the user swipes manually.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || isProgrammatic.current) return;
    const slideWidth = track.children[0]?.getBoundingClientRect().width || 1;
    const i = Math.round(track.scrollLeft / slideWidth);
    setIndex(Math.max(0, Math.min(SLIDES.length - 1, i)));
  }, []);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

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
          MOBILE: peek carousel built on native CSS scroll-snap, so touch
          swiping is handled by the browser (real momentum, no library).
          Auto-advances right-to-left; a manual swipe pauses it and it resumes
          RESUME_MS after the user stops. Hidden at >=960px in favour of the
          static grid below.
        */}
        <div className="eycd-carousel">
          <div
            className="eycd-track"
            ref={trackRef}
            onScroll={onScroll}
            onTouchStart={pauseThenResume}
            onPointerDown={pauseThenResume}
          >
            {SLIDES.map(({ key, src, alt }) => (
              <div key={key} className="eycd-slide">
                <img src={src} alt={alt} className="eycd-slide-img" loading="lazy" />
              </div>
            ))}
          </div>

          <div className="eycd-dots">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                className={`eycd-dot ${i === index ? 'is-active' : ''}`}
                aria-label={`Show card ${i + 1}`}
                aria-current={i === index}
                onClick={() => {
                  pauseThenResume();
                  goTo(i);
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

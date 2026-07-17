import { useEffect, useRef, useState } from 'react';
import sectionBg from '../../assets/section 3/section 3 back.png';
import sectionBgLaptop from '../../assets/section 3 back new.png';
// NOTE: using the new source cards (grow/keep/build regenerated at feel-closer's
// size, so all four are naturally near-equal height — no stretching/padding needed).
// Revert options for card art, in order of preference:
//   1) Old 9-slice stretched (seamless, equal height, previous card art):
//      '../../assets/section 3/card-feel-closer-stretched.png'
//      '../../assets/section 3/card-grow-together-stretched.png'
//      '../../assets/section 3/card-build-universe-stretched.png'
//      '../../assets/section 3/card-keep-everything-stretched.png'
//   2) Transparent-padded equal height (small gap under shorter cards):
//      '../../assets/section 3/card-feel-closer-padded.png'
//      '../../assets/section 3/card-grow-together-padded.png'
//      '../../assets/section 3/card-build-universe-padded.png'
//      '../../assets/section 3/card-keep-everything-padded.png'
//   3) Original natural (unequal) heights, old card art:
//      '../../assets/section 3/card-feel-closer.png'
//      '../../assets/section 3/card-grow-together.png'
//      '../../assets/section 3/card-build-universe.png'
//      '../../assets/section 3/card-keep-everything.png'
import cardFeelCloser from '../../assets/section 3/card-feel-closer.png';
import cardGrowTogether from '../../assets/section 3/card-grow-together-v2.png';
import cardBuildUniverse from '../../assets/section 3/card-build-universe-v2.png';
import cardKeepEverything from '../../assets/section 3/card-keep-everything-v2.png';
import './FeatureCards.css';

const CARDS = [
  { key: 'feel-closer', src: cardFeelCloser, alt: 'Feel closer: Voice notes, Daily rituals, Daily questions, Send gifts, Photo of the day' },
  { key: 'grow-together', src: cardGrowTogether, alt: 'Grow together: Daily Question, This or That, Would You Rather, Finish the Sentence, Hot Takes' },
  { key: 'keep-everything', src: cardKeepEverything, alt: 'Keep everything: Diary, Photos, Notes Jar, Secret Book, Memory Constellation' },
  { key: 'build-universe', src: cardBuildUniverse, alt: 'Build your universe: Streaks, Milestones, Stardust, Days Together, Planets' },
];

const ROTATE_MS = 4500;
const TOTAL = CARDS.length;

// Returns the signed distance of card i from the active card, wrapped to the
// shortest direction around the loop (e.g. for 4 cards: -1, 0, 1, 2 range).
function signedOffset(i, active) {
  let offset = i - active;
  if (offset > TOTAL / 2) offset -= TOTAL;
  if (offset < -TOTAL / 2) offset += TOTAL;
  return offset;
}

export default function FeatureCards() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(() => {
      setActive((v) => (v + 1) % CARDS.length);
    }, ROTATE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  return (
    <section id="made-for-every-moment" className="fc">
      <picture>
        <source media="(min-width: 960px)" srcSet={sectionBgLaptop} />
        <img src={sectionBg} alt="" className="fc-bg" aria-hidden="true" />
      </picture>

      <div className="container fc-content">
        <div className="fc-header">
          <h2 className="fc-title">
            Made for <span className="fc-title-accent">Every Moment</span>
          </h2>
          <p className="fc-subtext">To help you express your love.</p>
        </div>

        {/*
          MOBILE: rotating 3D stack carousel — the active card is centered and
          in full focus, the others are pushed to the sides, scaled down, and
          slightly rotated in 3D so they stay visible as a "deck" around it.
          Hidden at desktop widths (see .fc-stage-wrap CSS) in favor of the
          static 4-column row below. See the bottom of this file for the
          previous fade/slide version, kept for easy revert.
        */}
        <div className="fc-stage-wrap">
          <div
            className="fc-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
          >
            {CARDS.map(({ key, src, alt }, i) => {
              const offset = signedOffset(i, active);
              const abs = Math.abs(offset);
              const isActive = offset === 0;
              return (
                <div
                  key={key}
                  className="fc-card-slot"
                  style={{ '--offset': offset, '--abs': abs, zIndex: TOTAL - abs }}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="fc-card-img"
                    aria-hidden={!isActive}
                    style={{ animationDelay: `${i * -1.1}s` }}
                  />
                </div>
              );
            })}
          </div>

          <div className="fc-dots">
            {CARDS.map((card, i) => (
              <button
                key={card.key}
                className={`fc-dot ${i === active ? 'is-active' : ''}`}
                aria-label={`Show ${card.key.replace('-', ' ')}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {/*
          DESKTOP: static 4-column row, all cards visible at once, no rotation.
          Each card gets its own real wrapper div as the grid item (not
          display:contents) to avoid CSS Grid sizing bugs.
        */}
        <div className="fc-grid">
          {CARDS.map(({ key, src, alt }) => (
            <div key={key} className="fc-card">
              <img src={src} alt={alt} className="fc-grid-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   REVERT: previous fade/slide version of the .fc-stage block (single card
   visible at a time, cross-fading in place). To restore it:
     1) Replace the .fc-stage JSX block above with the code below.
     2) In FeatureCards.css, comment out the "CAROUSEL VERSION" rules and
        uncomment the "FADE/SLIDE VERSION (revert)" rules at the bottom.

  <div
    className="fc-stage"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onTouchStart={() => setPaused(true)}
  >
    {CARDS.map(({ key, src, alt }, i) => (
      <img
        key={key}
        src={src}
        alt={alt}
        className={`fc-card-img ${i === active ? 'is-active' : ''}`}
        aria-hidden={i !== active}
      />
    ))}
  </div>
============================================================================ */

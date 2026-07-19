import sectionBg from '../../assets/section 3/section 3 back.jpg';
import sectionBgLaptop from '../../assets/section 3 back new.jpg';
// The "When you..." moment cards, which read as a day arc:
// wake up -> miss each other -> feel closer -> make a memory.
// Two sets of the same four cards: 3:4 portrait for the mobile carousel, and
// 2:3 (1026x1533) for the desktop grid. Unlike the section 2 set, the source
// file numbering matched between mobile and laptop. Previous feature-based
// desktop art (card-feel-closer / -grow-together / -build-universe /
// -keep-everything) is in src/assets/_archive/.
import cardWakeUp from '../../assets/section 3/card-wake-up.jpg';
import cardMissEachOther from '../../assets/section 3/card-miss-each-other.jpg';
import cardFeelCloserS3 from '../../assets/section 3/card-feel-closer-s3.jpg';
import cardMakeMemory from '../../assets/section 3/card-make-memory.jpg';
import cardWakeUpLaptop from '../../assets/section 3/card-wake-up-laptop.jpg';
import cardMissEachOtherLaptop from '../../assets/section 3/card-miss-each-other-laptop.jpg';
import cardFeelCloserLaptop from '../../assets/section 3/card-feel-closer-laptop.jpg';
import cardMakeMemoryLaptop from '../../assets/section 3/card-make-memory-laptop.jpg';
import CardCarousel from '../CardCarousel/CardCarousel';
import './FeatureCards.css';

const ALT = {
  'wake-up': 'When you wake up: good morning gestures, mood sharing, voice notes',
  'miss-each-other': 'When you miss each other: love gestures, gifts, connected stars',
  'feel-closer': 'When you want to feel closer: daily questions, Secret Book, couple games',
  'make-memory': 'When you make a memory: shared diary, Photo Book, Notes Jar, Memory Map',
};

// Mobile carousel (3:4) and desktop grid (2:3) share the same order and alt text.
const SLIDES = [
  { key: 'wake-up', src: cardWakeUp, alt: ALT['wake-up'] },
  { key: 'miss-each-other', src: cardMissEachOther, alt: ALT['miss-each-other'] },
  { key: 'feel-closer', src: cardFeelCloserS3, alt: ALT['feel-closer'] },
  { key: 'make-memory', src: cardMakeMemory, alt: ALT['make-memory'] },
];

const DESKTOP_CARDS = [
  { key: 'wake-up', src: cardWakeUpLaptop, alt: ALT['wake-up'] },
  { key: 'miss-each-other', src: cardMissEachOtherLaptop, alt: ALT['miss-each-other'] },
  { key: 'feel-closer', src: cardFeelCloserLaptop, alt: ALT['feel-closer'] },
  { key: 'make-memory', src: cardMakeMemoryLaptop, alt: ALT['make-memory'] },
];

export default function FeatureCards() {
  return (
    <section id="made-for-every-moment" className="fc">
      <picture>
        <source media="(min-width: 960px)" srcSet={sectionBgLaptop} />
        <img src={sectionBg} alt="" className="fc-bg" aria-hidden="true" loading="lazy" decoding="async" />
      </picture>

      <div className="container fc-content">
        <div className="fc-header">
          <h2 className="fc-title">
            Made for <span className="fc-title-accent">Every Moment</span>
          </h2>
          <p className="fc-subtext">To help you express your love.</p>
        </div>

        {/*
          MOBILE: infinite peek carousel (shared component, hidden at >=960px).
          Replaces the previous 3D rotating stack - see git history to restore.
        */}
        <CardCarousel slides={SLIDES} />

        {/* DESKTOP: static 4-column row, all cards visible at once. */}
        <div className="fc-grid">
          {DESKTOP_CARDS.map(({ key, src, alt }) => (
            <div key={key} className="fc-card">
              <img src={src} alt={alt} className="fc-grid-img" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

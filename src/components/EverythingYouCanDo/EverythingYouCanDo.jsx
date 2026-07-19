// Mobile carousel art (3:4 portrait).
import cardStayConnected from '../../assets/section 2/card-stay-connected.jpg';
import cardDiscover from '../../assets/section 2/card-discover.jpg';
import cardKeepStory from '../../assets/section 2/card-keep-story.jpg';
import cardBuildUniverse from '../../assets/section 2/card-build-universe-s2.jpg';
// Desktop grid art (tall portrait, ~0.48 ratio).
// NOTE: the source files were numbered "section 2 card N laptop.png", but N did
// NOT match the mobile numbering - laptop files 3 and 4 were Build Your Universe
// and Keep Your Story respectively, i.e. swapped relative to mobile. These
// imports are named by CONTENT so that mismatch can't resurface. Originals are
// in src/assets/_archive/ along with the previous card-*-laptop.png set.
import cardStayConnectedLaptop from '../../assets/section 2/card-stay-connected-laptop.jpg';
import cardDiscoverLaptop from '../../assets/section 2/card-discover-laptop.jpg';
import cardKeepStoryLaptop from '../../assets/section 2/card-keep-story-laptop.jpg';
import cardBuildUniverseLaptop from '../../assets/section 2/card-build-universe-laptop.jpg';
import sectionBg from '../../assets/section 2 back.jpg';
import sectionBgLaptop from '../../assets/section 2 back laptop.jpg';
import CardCarousel from '../CardCarousel/CardCarousel';
import './EverythingYouCanDo.css';

// Desktop-only grid cards. Same order as the mobile carousel below.
const CARDS = [
  { key: 'stay-connected', src: cardStayConnectedLaptop, alt: 'Stay Connected: love notes, gifts, voice messages, mood sharing, good morning' },
  { key: 'discover', src: cardDiscoverLaptop, alt: 'Discover Each Other: daily couple questions, Secret Book, This or That, Would You Rather, couple games' },
  { key: 'keep-story', src: cardKeepStoryLaptop, alt: 'Keep Your Story: Shared Diary, Photo Book, Notes Jar, Memory Map, Special Dates' },
  { key: 'build-universe', src: cardBuildUniverseLaptop, alt: 'Build Your Universe: Streaks & Milestones, Stardust Rewards, Days Together, Planets & Memories' },
];

// Mobile-only carousel slides (portrait art, different from the desktop grid).
const SLIDES = [
  { key: 'stay-connected', src: cardStayConnected, alt: 'Stay Connected: voice notes, daily rituals, photo of the day' },
  { key: 'discover', src: cardDiscover, alt: 'Discover Each Other: daily couple questions, Secret Book, This or That, Would You Rather, couple games' },
  { key: 'keep-story', src: cardKeepStory, alt: 'Keep Your Story: Shared Diary, Photo Book, Notes Jar, Memory Map, Special Dates' },
  { key: 'build-universe', src: cardBuildUniverse, alt: 'Build Your Universe: streaks, milestones, stardust, days together' },
];

export default function EverythingYouCanDo() {
  return (
    <section id="everything-you-can-do" className="eycd">
      <picture>
        <source media="(min-width: 960px)" srcSet={sectionBgLaptop} />
        <img src={sectionBg} alt="" className="eycd-bg" aria-hidden="true" loading="lazy" decoding="async" />
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

        {/* MOBILE: infinite peek carousel (shared component, hidden at >=960px). */}
        <CardCarousel slides={SLIDES} />

        {/*
          DESKTOP: static 4-column grid. Only rendered at >=960px (the grid is
          display:none below that), so a single source is enough - no <picture>
          needed, which also avoids fetching art the mobile view never shows.
        */}
        <div className="eycd-grid">
          {CARDS.map(({ key, src, alt }) => (
            <div key={key} className="eycd-card">
              <img src={src} alt={alt} className="eycd-card-img" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

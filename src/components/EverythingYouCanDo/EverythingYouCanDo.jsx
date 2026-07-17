import cardUniverse from '../../assets/card-universe.png';
import cardTogether from '../../assets/card-together.png';
import cardSend from '../../assets/card-send.png';
import cardMemories from '../../assets/card-memories.png';
import cardUniverseLaptop from '../../assets/card-universe-laptop.png';
import cardTogetherLaptop from '../../assets/card-together-laptop.png';
import cardSendLaptop from '../../assets/card-send-laptop.png';
import cardMemoriesLaptop from '../../assets/card-memories-laptop.png';
import sectionBg from '../../assets/section 2 back.png';
import sectionBgLaptop from '../../assets/section 2 back laptop.png';
import './EverythingYouCanDo.css';

const CARDS = [
  { key: 'universe', src: cardUniverse, laptopSrc: cardUniverseLaptop, alt: 'Universe: Streaks, Milestones, Stardust' },
  { key: 'together', src: cardTogether, laptopSrc: cardTogetherLaptop, alt: 'Together: Voice notes, Daily questions, Rituals' },
  { key: 'send', src: cardSend, laptopSrc: cardSendLaptop, alt: 'Send: Diary, Photos, Secret Book' },
  { key: 'memories', src: cardMemories, laptopSrc: cardMemoriesLaptop, alt: 'Memories: Couple profile, Special dates, Shared story' },
];

export default function EverythingYouCanDo() {
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
            Everything you need to connect, remember, and grow together.
          </p>
        </div>

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

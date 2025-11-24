import { servicePacks } from '../data/content';

export default function Services() {
  return (
    <section className="service" id="packs">
      <div className="service__content wrap">
        {servicePacks.map((pack, index) => {
          const isPrimary = index === 1;
          const cardClass = [
            'service__card',
            index === 0 && 'service__card_left',
            isPrimary && 'service__card_main text_while',
            index === servicePacks.length - 1 && 'service__card_right'
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <article key={pack.name} className={cardClass}>
              <h3 className={`title title_lt ${isPrimary ? '' : 'text_black'}`}>
              {pack.name}
              </h3>
              <h2 className={`title title_md ${isPrimary ? '' : 'text_black'}`}>
                {pack.duration}
              </h2>
              <ul className="service__list-items">
                {pack.items.map((item) => (
                  <li key={item} className="service__item">
                    {item}
                  </li>
                ))}
              </ul>
              <h3
                className={`title title_lt service__price ${
                  isPrimary ? 'text_while' : 'text_red'
                }`}
              >
                {pack.price}
              </h3>
              <a
                className={`button ${isPrimary ? 'button_while' : 'button_red'}`}
                href="#packs"
              >
                Purchase Pack
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}


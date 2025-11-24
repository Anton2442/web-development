import { careCards } from '../data/content';

export default function Care() {
  return (
    <section className="care" id="services">
      <div className="care__content wrap">
        <div className="title__care">
          <p className="desc desc_md text_red">Care For Your Pet</p>
          <h2 className="title title_md text_black">What We Do</h2>
        </div>
        <div className="care__cards">
          {careCards.map((card, index) => (
            <article key={index} className="care__card">
              <img src={card.icon} alt="" />
              <h4 className="title title_lt text_black">{card.title}</h4>
              <p className="desc desc_md text_gray">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


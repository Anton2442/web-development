import { heroContent } from '../data/content';

export default function Hero() {
  const { title, description, primaryCta, secondaryCta, image } = heroContent;

  return (
    <section className="hero" id="start">
      <div className="hero__content wrap">
        <div className="hero__info">
          <h1 className="title title_lg text_black title__hero">{title}</h1>
          <p className="desc">{description}</p>
          <div className="buttons">
            <a href="#services" className="button button_red">
              {primaryCta}
            </a>
            <a href="#contact" className="button button_green">
              {secondaryCta}
            </a>
          </div>
        </div>
        <div className="hero__img">
          <img src={image} alt="Happy dog" />
        </div>
      </div>
    </section>
  );
}


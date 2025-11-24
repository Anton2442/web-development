import { successStory } from '../data/content';

export default function Success() {
  const { title, description, bullets, image } = successStory;
  const titleLines = title.split('\n');

  return (
    <section className="success" id="about">
      <div className="success__content wrap">
        <div className="success__info">
          <div className="success__title">
            <p className="desc desc_sm text_red">Our Success Story</p>
            <h2 className="title title_md text_black">
              {titleLines.map((line, idx) => (
                <span key={`${line}-${idx}`}>
                  {line}
                  {idx < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
          <p className="desc desc_md text_black">{description}</p>
          <ul className="success__list-item">
            {bullets.map((item) => (
              <li key={item} className="success__item">
                {item}
              </li>
            ))}
          </ul>
          <a href="#about" className="button button_red">
            Know More About Us
          </a>
        </div>
        <img src={image} alt="Story dog" />
      </div>
    </section>
  );
}


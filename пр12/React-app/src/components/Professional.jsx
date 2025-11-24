import { professionalBlurb } from '../data/content';

export default function Professional() {
  const { title, description, image } = professionalBlurb;

  return (
    <section className="professional" id="contact">
      <div className="professional__content wrap">
        <div className="professional__info">
          <h3 className="title title_md text_black">{title}</h3>
          <p className="desc desc_lg text_gray">{description}</p>
          <a className="button button_red" href="tel:38412929339">
            Contact Us Now
          </a>
        </div>
        <img src={image} alt="Professional care" />
      </div>
    </section>
  );
}


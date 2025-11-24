import logoFooter from '../assets/logoFooter.svg';

const footerLinks = ['About Us', 'Groomers', 'Contact Us', 'Privacy Policy', 'Tearms'];

const schedule = [
  'Monday-Tuesday 09:00-18:00',
  'Wednesday 09:00-18:00',
  'Thrusday-Friday 09:00-18:00',
  'Saturday 10:00-17:00',
  'Sunday 10:30-16:00'
];

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer">
        <div className="footer__content wrap">
          <div className="footer__info">
            <img src={logoFooter} alt="logo" className="logo" />
            <p className="desc desc_lg text_gray">
              Quisque id leo non dolor tempor elementum quis ac urna. Nam pharetra, ligula eget finibus
              dignissim, turpis ipsum sollicitudin
            </p>
            <form className="form" onSubmit={(event) => event.preventDefault()}>
              <input className="form__input-text" type="email" placeholder="Email" />
              <input className="button button_red" type="submit" value="Subscribe" />
            </form>
          </div>
          <div className="footer__address">
            <h4 className="title title_lt text_black">Address</h4>
            <p className="desc desc_lg text_gray">+23 384 485 29</p>
            <p className="desc desc_lg text_gray">vet@shamim.com</p>
            <p className="desc desc_lg text_gray">
              123 king street, Melbrown <br />
              Victoria 3000, Australia
            </p>
          </div>
          <div className="footer__links">
            <h3 className="title title_lt text_black">Links</h3>
            {footerLinks.map((link) => (
              <p key={link} className="desc desc_lg text_gray">
                {link}
              </p>
            ))}
          </div>
          <div className="footer__work">
            <h3 className="title title_lt text_black">Opening Hours</h3>
            {schedule.map((item) => (
              <p key={item} className="desc desc_lg text_gray">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


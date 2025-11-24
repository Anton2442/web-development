import { useEffect, useState } from 'react';
import logo from '../assets/Logo.svg';
import { mobileLinks, navLinks } from '../data/content';

const PHONE = '384-129-293-39';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <div className="header">
        <div className="header__content wrap">
          <img src={logo} alt="logo" />
          <nav>
            <ul className="nav__list">
              {navLinks.map((item) => (
                <li key={item} className="nav__item-list">
                  {item}
                </li>
              ))}
            </ul>
            <button
              className={`menu-btn${isMenuOpen ? ' menu-btn_active' : ''}`}
              type="button"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span></span>
            </button>
            <ul
              className={`nav__list_mob${
                isMenuOpen ? ' nav__list_mob_active' : ''
              }`}
            >
              <a href="/" className="header__logo" onClick={closeMenu}>
                <img src={logo} alt="logo" />
              </a>
              {mobileLinks.map((link) => (
                <li key={link.href} className="nav-list__item_mob">
                  <a
                    className="item__link_mob"
                    href={link.href}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="nav__phone button button_red" href={`tel:${PHONE}`}>
            {PHONE}
          </a>
        </div>
      </div>
    </header>
  );
}


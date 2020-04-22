import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

/*
    Website header
    @author A.M. Aahad
*/

function Header({ homePageLink, searchLink, links }) {
  const linksMarkup = links.map((link, index) => {
    const linkMarkup = (
      <Link to={link.link} style={{ textDecoration: 'none' }}>
        <div className="menu__link">
          {link.label}
        </div>
      </Link>
    );

    return (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index} className="menu__list-item">
        {linkMarkup}
      </li>
    );
  });

  return (
    <div className="siteHeader">
      <nav className="menu">
        <h1 className="menu__logo">
          <Link to={homePageLink} style={{ textDecoration: 'none' }}>
            <div className="menu__logo__link">
              করোনা অনুসন্ধান
            </div>
          </Link>
        </h1>
        <div className="menu__right">
          <ul className="menu__list">
            {linksMarkup}
          </ul>
          <Link to={searchLink} style={{ textDecoration: 'none' }}>
            <SearchIcon />
          </Link>
        </div>
      </nav>
      <div className="menu__down">
        <ul className="menu__list">
          {linksMarkup}
        </ul>
      </div>
    </div>
  );
}

export default Header;

import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

/*
    Website header
    @author A.M. Aahad
*/

function Header(props) {
  const { links } = props;
  const linksMarkup = links.map((link, index) => {
    const linkMarkup = (
      <a className="menu__link" href={link.link}>{link.label}</a>
    );

    return (
      <li key={index} className="menu__list-item">
        {linkMarkup}
      </li>
    );
  });

  return (
    <div className="siteHeader">
      <nav className="menu">
        <h1 className="menu__logo">
          <a className="menu__logo__link" href="/">
            করোনা অনুসন্ধান
          </a>
        </h1>
        <div className="menu__right">
          <ul className="menu__list">
            {linksMarkup}
          </ul>
            <SearchIcon />
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

Header.propTypes = {
  links: PropTypes.array,
};

export default Header;

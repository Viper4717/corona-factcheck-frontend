import React, { Component } from 'react';
import "./headerStyle.css";

class header extends Component {
  constructor() {
      super();
  }

  render() {
      let linksMarkup = this.props.links.map((link, index) => {
          let linkMarkup = link.active ? (
              <a className="menu__link menu__link--active" href={link.link}>{link.label}</a>
          ) : (
              <a className="menu__link" href={link.link}>{link.label}</a>
          );

          return (
              <li key={index} className="menu__list-item">
                  {linkMarkup}
              </li>
          );
      });

      return (
          <nav className="menu">
              <h1 className="menu__logo">করোনা অনুসন্ধান</h1>
              <div className="menu__right">
                  <ul className="menu__list">
                      {linksMarkup}
                  </ul>
              </div>
          </nav>
      );
  }
}


export default header;
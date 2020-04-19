import React, { Component } from 'react';
import "./headerStyle.css";

{/*
    Website header
    @author A.M. Aahad
 */}

class Header extends Component {
    constructor() {
        super();
    }

    render() {
        let linksMarkup = this.props.links.map((link, index) => {
            let linkMarkup = (
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
                    <h1 className="menu__logo">করোনা অনুসন্ধান</h1>
                    <div className="menu__right">
                        <ul className="menu__list">
                            {linksMarkup}
                        </ul>
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
}


export default Header;
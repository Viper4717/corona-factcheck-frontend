import React, { Component } from 'react';
import "./headerStyle2.css";

class header extends Component {
constructor() {
    super();
}

    render() {
        let linksMarkup = this.props.links.map((link, index) => {
            let linkMarkup =  (
                <a className="nav_link" href={link.link}>{link.label}</a>
            );

            return (
                <li key={index} className="nav-item">
                    {linkMarkup}
                </li>
            );
        });

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-text"><h2>করোনা অনুসন্ধান</h2></span>
                <button className="navbar-toggler" data-toggle="collapse"
                    data-target="#collapse_target" aria-controls="collapse_target" 
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapse_target">
                    <ul className="navbar-nav">
                        {linksMarkup}
                    </ul>
                </div>
            </nav>
        );
    }
}


export default header;
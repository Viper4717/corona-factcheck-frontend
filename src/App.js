import React, { Component } from 'react';
import Header from "./components/headerComponent/header"

class App extends Component {
  render() {
    let links = [
      { label: 'নীড়পাতা', link: '#home' },
      { label: 'সত্য/মিথ্যা', link: '#about' },
      { label: 'করোনা তথ্য', link: '#portfolio' },
      { label: 'এক্সটেনশন', link: '#contact-us' },
      { label: 'আমাদের সম্পর্কে', link: '#contact-us' },
      { label: 'যোগাযোগ', link: '#contact-us' },
    ];

    return (
      <div className="container center">
        <Header links={links}/>
      </div>
    );
  }
}

export default App;

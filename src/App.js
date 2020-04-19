import React from 'react';
import Header from "./components/header/Header"
import AboutUs from "./components/aboutUs/AboutUs"

let links = [
  { label: 'নীড়পাতা', link: '#home' },
  { label: 'সত্য/মিথ্যা', link: '#about' },
  { label: 'করোনা তথ্য', link: '#portfolio' },
  { label: 'এক্সটেনশন', link: '#contact-us' },
  { label: 'আমাদের সম্পর্কে', link: '#contact-us' },
  { label: 'যোগাযোগ', link: '#contact-us' },
];

function App() {
  return (
    <div className="App">
      <Header links={links}/>
      <AboutUs/>
    </div>
  );
}

export default App;
import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Blog from './components/blog/Blog';
import Extension from "./components/extension/Extension"
import AboutUs from './components/aboutUs/AboutUs';

const headerLinks = [
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
      <Header links={headerLinks} />
      <Blog />
    </div>
  );
}

export default App;

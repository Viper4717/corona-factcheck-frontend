import React from 'react';
import Header from "./components/header/Header"

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
      <header className="App-header">
        <Header links={links}/>
      </header>
    </div>
  );
}

export default App;
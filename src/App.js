import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Blog from './components/blog/Blog';
import Extension from './components/extension/Extension';
import AboutUs from './components/aboutUs/AboutUs';

const headerLinks = [
  { label: 'নীড়পাতা', link: '/' },
  { label: 'সত্য/মিথ্যা', link: '' },
  { label: 'করোনা তথ্য', link: '' },
  { label: 'এক্সটেনশন', link: '/extension' },
  { label: 'আমাদের সম্পর্কে', link: '/aboutUs' },
];

function App() {
  return (
    <div className="App">
      <Header links={headerLinks} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Blog} />
          <Route exact path="/aboutUs" component={AboutUs} />
          <Route exact path="/extension" component={Extension} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

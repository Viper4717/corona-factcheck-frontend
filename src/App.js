import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Extension from './components/extension/Extension';
import AboutUs from './components/aboutUs/AboutUs';
import Article from './components/article/Article';
import TrueFalse from './components/truefalse/TrueFalse';
import Blog from './components/blog/Blog';

const headerLinks = [
  { label: 'নীড়পাতা', link: '/' },
  { label: 'সত্য/মিথ্যা', link: './trueFalse' },
  { label: 'করোনা তথ্য', link: '/blogs' },
  { label: 'এক্সটেনশন', link: '/extension' },
  { label: 'আমাদের সম্পর্কে', link: '/aboutUs' },
];

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header links={headerLinks} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/trueFalse" component={TrueFalse} />
          <Route exact path="/blogs" component={Blog} />
          <Route exact path="/extension" component={Extension} />
          <Route exact path="/aboutUs" component={AboutUs} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
